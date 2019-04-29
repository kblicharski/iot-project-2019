 # example from DS18B20 sensor tutorial and w1thermsensor Githib docs

import time
import requests
import serial 
import struct
from w1thermsensor import W1ThermSensor
from api import get_state, post_temperature
# from bme280 import read_humidity

upper_sensor = '02131d621eaa'
ser = serial.Serial('/dev/ttyACM0', 9600)

# Reasonable default values
high_temp = 90
low_temp = 70

while True:
    # Read global state to fetch high_temp and low_temp
    state = get_state()
    if state:
        high_temp = state['high_temp']
        low_temp = state['low_temp']
    
    # Read temperatures and send them to the server
    cur_temp = 0.0
    for sensor in W1ThermSensor.get_available_sensors():
        temp = sensor.get_temperature(W1ThermSensor.DEGREES_F)
        data = { 'temperature': {
                'description': sensor.id, 
                'value': temp
               } }
        r = post_temperature(data)
        print(r.text)
        if sensor.id == upper_sensor:
            cur_temp = temp
        

    # TODO: Send heat lamp value to Arduino
    heat_lamp_percentage = round((high_temp - cur_temp) / (high_temp - low_temp), 2)
    if heat_lamp_percentage < 0:
        heat_lamp_percentage = 0
    if heat_lamp_percentage > 1:
        heat_lamp_percentage = 1

    heat_lamp_percentage *= 100
    print(heat_lamp_percentage)
    # print(high_temp, low_temp)
    # ser.write(struct.pack('>B', heat_lamp_percentage*100))
    encoded = b'%d' %heat_lamp_percentage
    ser.write(encoded)


    # Read humidity and send it to the server
    # humidity = read_humidity()
    # TODO: Send humidity value to Arduino
    time.sleep(1)
