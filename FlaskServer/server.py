#!/usr/bin/env python3
from flask import Flask, render_template, request
from picamera import PiCamera
import time
import os
import stat
import smtplib
import imghdr
from email.message import EmailMessage

Sender_Email = "eceteam2ksus23@gmail.com"
Reciever_Email = "eceteam2ksus23@gmail.com"
Password = "ruqdroekjtrrxxyh"
newMessage = EmailMessage()
newMessage['Subject'] = "Smart Mirror Image Taken"
newMessage['From'] = Sender_Email
newMessage['To'] = Reciever_Email
newMessage.set_content('Here is a picture')

PEOPLE_FOLDER = os.path.join('static', 'people_photo')
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = PEOPLE_FOLDER

@app.route('/', methods=['GET', 'POST'])
def index():
        full_filename = os.path.join(app.config['UPLOAD_FOLDER'], 'img.jpg')
        if request.method == 'POST':
                if request.form.get('camera') == 'CAMERA':
                        takePic()
        elif request.method == 'GET':
                return render_template('index.html')

        return render_template('index.html', user_image = full_filename)


def takePic():
        print ('takePic')
        camera = PiCamera()
        camera.resolution = (1920, 1080)
        time.sleep(2)
        picFileName = '/flask/static/people_photo/img_' + str(time.time()) + '.>
        camera.capture(picFileName)
        camera.close()
        with open(picFileName, 'rb') as f:
                image_data = f.read()
                image_type = imghdr.what(f.name)
                image_name = f.name
        newMessage.add_attachment(image_data, maintype='image', subtype=image_t>
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(Sender_Email, Password)
                smtp.send_message(newMessage)
        os.remove(picFileName)
        print ('pic sent in email')


if __name__ == '__main__':
  app.run(debug=True)


