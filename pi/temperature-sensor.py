import time
import requests
import serial 
from w1thermsensor import W1ThermSensor
from api import get_state, post_temperature, post_humidity
import RPi.GPIO as GPIO
from bme280 import read_humidity

HEAT_PIN = 20
HUMIDIFIER_PIN = 16
GPIO.setmode(GPIO.BCM)
GPIO.setup(HEAT_PIN, GPIO.OUT)
GPIO.setup(HUMIDIFIER_PIN, GPIO.OUT)


# Reasonable default values
high_temp = 90
low_temp = 70
high_humidity = 70
low_humidity = 60
state = None
upper_sensor = '01143372ef57'
humidifier = None
heat = None


def heat_on():
    global heat
    print('HEAT = ON')
    GPIO.output(HEAT_PIN, GPIO.LOW)
    heat = True


def heat_off():
    global heat
    print('HEAT = OFF')
    GPIO.output(HEAT_PIN, GPIO.HIGH)
    heat = False


def humidifier_on():
    global humidifier
    print('HUMIDIFIER = ON')
    GPIO.output(HUMIDIFIER_PIN, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(HUMIDIFIER_PIN, GPIO.LOW)
    humidifier = True


def humidifier_off():
    global humidifier
    print('HUMIDIFIER = OFF')
    GPIO.output(HUMIDIFIER_PIN, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(HUMIDIFIER_PIN, GPIO.LOW)
    time.sleep(1)
    GPIO.output(HUMIDIFIER_PIN, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(HUMIDIFIER_PIN, GPIO.LOW)
    humidifier = False
    

humidifier_on()
heat_on()


while True:
    # Read global state to fetch high_temp and low_temp
    s = get_state()
    # If the API call succeeded, update local state
    if s:
        state = s
    else:
        print('Server connection interrupted, failed to fetch state...')
    # If we know the state, update global variables
    if state:
        high_temp = state['high_temp']
        low_temp = state['low_temp']
        high_humidity = state['high_humidity']
        low_humidity = state['low_humidity']
    
    # Read temperatures and send them to the server
    cur_temp = -1
    for sensor in W1ThermSensor.get_available_sensors():
        temp = sensor.get_temperature(W1ThermSensor.DEGREES_F)
        print(temp, sensor.id)
        data = { 'temperature': {
                'description': sensor.id, 
                'value': temp
               } }
        r = post_temperature(data)
        if sensor.id == upper_sensor:
            cur_temp = temp
        
    if cur_temp <= low_temp:
        if not heat:
            heat_on()
    if cur_temp >= high_temp:
        if heat:
            heat_off()
    if low_temp < cur_temp < high_temp:
        if heat:
            heat_off()

    # Read humidity and send it to the server
    humidity = read_humidity()
    print('Humidity: {}'.format(humidity))
    print('Temperature: {}'.format(cur_temp))
    
    if not humidifier and (humidity <= low_humidity):
        humidifier_on()
    if humidifier and (humidity >= high_humidity):
        humidifier_off()
    if humidifier and (low_humidity < humidity < high_humidity):
        humidifier_off()

    time.sleep(0.5)
