import requests
import time


base_url = 'https://iot-project-2019-239007.appspot.com'


def auth_header():
    data = { 'auth': { 'email': 'test@example.com', 'password': 'test' } }
    r = requests.post(base_url+'/user_token', json=data)
    if r:
        headers = {'Authorization': 'Bearer ' + r.json()['jwt']}
        return headers
    return None


h = auth_header()


def get_state():
    global h
    r = requests.get(base_url+'/app/state', headers=h)
    if not r:
        retry_auth = auth_header()
        if retry_auth:
            h = retry_auth
        r = requests.get(base_url+'/app/state', headers=h)
    
    if r:
        return r.json()
    return None


def post_temperature(data):
    global h
    r = requests.post(base_url+'/temperatures', json=data, headers=h)
    if not r:
        retry_auth = auth_header()
        if retry_auth:
            h = retry_auth
        r = requests.post(base_url+'/temperatures', json=data, headers=h)
    return r


def post_humidity(data):
    global h
    r = requests.post(base_url+'/humidities', json=data, headers=h)
    if not r:
        retry_auth = auth_header()
        if retry_auth:
            h = retry_auth
        r = requests.post(base_url+'/humidities', json=data, headers=h)
    return r



def feed_cricket():
    global h
    r = requests.get(base_url+'/door/feed', headers=h)
    if not r:
        retry_auth = auth_header()
        if retry_auth:
            h = retry_auth
        r = requests.get(base_url+'/door/feed', headers=h)
    return r


def stop_feeding():
    global h
    r = requests.get(base_url+'/door/close', headers=h)
    if not r:
        retry_auth = auth_header()
        if retry_auth:
            h = retry_auth
        r = requests.get(base_url+'/door/close', headers=h)
    return r
