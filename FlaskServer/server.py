#!/usr/bin/env python3
from flask import Flask, render_template, request
from picamera import PiCamera
import time
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
	if request.method == 'POST':
		if request.form.get('camera') == 'CAMERA':
			takePic()
	elif request.method == 'GET':
		return render_template('index.html')

	return render_template('index.html')


def takePic():
	print ('I got clicked!')
	camera = PiCamera()
	camera.resolution = (1920, 1080)
	time.sleep(2)
	camera.capture("/var/www/html/img.jpg")
	camera.close()
	print ("Done")


if __name__ == '__main__':
  app.run(debug=True)
