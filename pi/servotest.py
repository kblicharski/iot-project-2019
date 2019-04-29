import RPi.GPIO as GPIO
import time

SERVO_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(SERVO_PIN, GPIO.OUT)
pwm = GPIO.PWM(SERVO_PIN, 50) # GPIO 17 for PWM with 50Hz
pwm.start(4) # Initialization


def open_door():
	pwm.ChangeDutyCycle(12)
	GPIO.output(SERVO_PIN, True)
	time.sleep(.6)
	GPIO.output(SERVO_PIN, False)
	pwm.ChangeDutyCycle(0)

def close_door():
	pwm.ChangeDutyCycle(4)
	GPIO.output(SERVO_PIN, True)
	time.sleep(.6)
	GPIO.output(SERVO_PIN, False)
	pwm.ChangeDutyCycle(0)
try:
    while True:
        open_door()
        print('opened door')
        time.sleep(2)
        close_door()
        print('closed door')
        time.sleep(2)
except KeyboardInterrupt:
    pwm.stop()
    GPIO.cleanup()
