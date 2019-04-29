import time
import requests
from api import get_state, feed_cricket
from datetime import datetime
import RPi.GPIO as GPIO

SERVO_PIN = 17 
SENSOR_PIN = 27
LIGHT_PIN = 21

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(LIGHT_PIN, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(SERVO_PIN, GPIO.OUT)
GPIO.setup(SENSOR_PIN, GPIO.IN)

pwm = GPIO.PWM(SERVO_PIN, 50) # GPIO 17 for PWM with 50Hz


def open_door():
    print('Opening door')
    pwm.ChangeDutyCycle(12)
    GPIO.output(SERVO_PIN, True)
    time.sleep(.5)
    GPIO.output(SERVO_PIN, False)
    pwm.ChangeDutyCycle(0)


def close_door():
    print('Closing door')
    pwm.ChangeDutyCycle(4)
    GPIO.output(SERVO_PIN, True)
    time.sleep(.5)
    GPIO.output(SERVO_PIN, False)
    pwm.ChangeDutyCycle(0)


def high(sensor):
    return GPIO.input(sensor) == GPIO.HIGH


def low(sensor):
    return GPIO.input(sensor) == GPIO.LOW


def should_be_fed():
    state = get_state()
    if state and state['open_door'] is not None:
        return True
    return False
        

TIMEOUT = 10 * 60
CRICKET_TIMEOUT = 20

# Reasonable defaults
num_to_feed = 5
light=None


def update_light(new_state):
    global light
    light=new_state
    if new_state:
        print('Turning light on')
        GPIO.output(LIGHT_PIN, GPIO.LOW)
        light=True
    else:
        print('Turning light off')
        GPIO.output(LIGHT_PIN, GPIO.HIGH)
        light=False


def light_change():
    state = get_state()
    '''
    now = datetime.now().time()
    on_time = datetime.fromtimestamp(state['light_on_time']).time()
    off_time = datetime.fromtimestamp(state['light_off_time']).time()
    result=light
    #on_time must be after midnight
    #off_time must be before midnight 
    if now>on_time and now<off_time:
        result=True
    elif now<on_time and now>off_time:
        result=False
    else:
        pass
    '''

    #override from user 
    if state['light']:
        result=True
    if not state['light']:
        result=False
    return result


def feed():
    global num_to_feed
    state = get_state()
    if state:
        num_to_feed = state['crickets_to_feed']

    count = 0
    print('Num to feed: {}'.format(num_to_feed))

    pwm.start(4) # Initialization

    # Feed all of the crickets
    while count < num_to_feed:
        open_time = time.time()
        last_motion_time = -1
        print('Current count: {}'.format(count)) 
        door_open = True
        open_door()

        # This loop controls each individual cricket exiting the tube
        while True:
            # A cricket exited the door, but may not have jumped in
            if door_open and low(SENSOR_PIN):
                print('Cricket exited the door')
                close_door()
                door_open = False
                last_motion_time = time.time()
            if not door_open:
                # If the sensor is high, the cricket is still in the tube
                if low(SENSOR_PIN):
                    print('Cricket still in tube')
                    last_motion_time = time.time()
                # Otherwise, if a sufficient amount of time has passed,
                # assume the cricket has jumped in and continue
                if high(SENSOR_PIN):
                    if time.time() - last_motion_time > CRICKET_TIMEOUT:
                        print('Cricket has jumped in: ', count)
                        count += 1
                        print(time.time(), last_motion_time)
                        # feed_cricket()
                        break
            elif time.time() - open_time > TIMEOUT: # sensor low, door not closed
                stop_feeding()
                break
    pwm.stop()


update_light(True)


def bad_light(val):
    return (val and not light) or (not val and light)


while True:    
    light_val = light_change()

    # Listen for whether the door has been opened
    while not should_be_fed() and not bad_light(light_val):
        print('Sleeping')
        light_val = light_change()
        time.sleep(3)
    if should_be_fed():
        print('Feeding')
        feed()
    if bad_light(light_val): 
        print('Changing light to {}'.format(light_val))
        update_light(light_val)
