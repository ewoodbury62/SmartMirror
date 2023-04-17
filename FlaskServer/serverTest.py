#!/usr/bin/env python3
from flask import Flask, render_template, request
from picamera import PiCamera
import time
import os
import stat
import smtplib
import imghdr
from rpi_ws281x import *
from email.message import EmailMessage

on = 0

LED_COUNT = 100
LED_PIN = 18
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating a signal (try 10)
LED_BRIGHTNESS = 65      # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0  
strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    # Intialize the library (must be called once before other functions).
strip.begin()


PEOPLE_FOLDER = os.path.join('static', 'people_photo')
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = PEOPLE_FOLDER

@app.route('/')
def index():
	full_filename = os.path.join(app.config['UPLOAD_FOLDER'], 'img.jpg')
	return render_template('indexTest.html', user_image = full_filename)

@app.route('/take_pic_BG')
def take_pic_BG():
	Sender_Email = "eceteam2ksus23@gmail.com"
	Reciever_Email = "eceteam2ksus23@gmail.com"
	Password = "ruqdroekjtrrxxyh"
	newMessage = EmailMessage()
	newMessage['Subject'] = "Smart Mirror Image Taken"
	newMessage['From'] = Sender_Email
	newMessage['To'] = Reciever_Email
	newMessage.set_content('Picture Taken Included!')
	print ('takePic')
	camera = PiCamera()
	camera.resolution = (1920, 1080)
	time.sleep(2)
	picFileName = '/flask/static/people_photo/img_' + str(time.time()) + '.jpg'
	camera.capture(picFileName)
	camera.close()
	with open(picFileName, 'rb') as f:
		image_data = f.read()
		image_type = imghdr.what(f.name)
		image_name = f.name
	newMessage.add_attachment(image_data, maintype='image', subtype=image_type, filename=image_name)
	with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
		smtp.login(Sender_Email, Password)
		smtp.send_message(newMessage)
	os.remove(picFileName)
	print ('pic sent in email')
	return "nothing"

@app.route('/led_red_BG')
def led_red_BG():
	print ('led Red')
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, Color(255,0,0))
	strip.show()
	return "nothing"

@app.route('/led_blue_BG')
def led_blue_BG():
	print('led Blue')
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, Color(0,0,255))
	strip.show()
	return "nothing"

@app.route('/led_green_BG')
def led_green_BG():
	print('led green')
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, Color(0,255,0))
	strip.show()
	return "nothing"

@app.route('/led_orange_BG')
def led_orange_BG():
	print('led orange')
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, Color(255,100,0))
	strip.show()
	return "nothing"

@app.route('/led_yellow_BG')
def led_yellow_BG():
	print('led yellow')
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, Color(255,255,0))
	strip.show()
	return "nothing"

@app.route('/led_purple_BG')
def led_purple_BG():
	print('led purple')
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, Color(255,0,255))
	strip.show()
	return "nothing"

@app.route('/led_white_BG')
def led_white_BG():
	print('led white')
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, Color(255,255,255))
	strip.show()
	return "nothing"

@app.route('/led_none_BG')
def ledNone():
	print ('no LED')
	on = 1
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, Color(0,0,0))
	strip.show()
	return "nothing"

if __name__ == '__main__':
  app.run(debug=True)


