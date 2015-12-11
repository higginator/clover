import os
import urllib2
import urllib
import requests
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(17, GPIO.IN)

while True:
	if (GPIO.input(17) == True):
		print ('blue')
		urllib.urlopen("http://queuemeleon.herokuapp.com/blue")
		time.sleep(.5)