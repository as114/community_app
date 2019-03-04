import os
from base64 import b64encode


def generate_key():
    key = os.urandom(100)
    return b64encode(key).decode('utf-8')
