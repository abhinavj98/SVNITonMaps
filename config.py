#Todo Implement basic settings required by an app instance

import os
from tempfile import mkdtemp

DEBUG = True
APP_NAME = "App"

SECRET_KEY = os.environ.get('SECRET_KEY') or "sjdasd,909754a///**(jas"
MAIL_SERVER = 'smtp.googlemail.com'
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
SQLALCHEMY_DATABASE_URI = "sqlite:///fproj.db"
SESSION_FILE_DIR = mkdtemp()
SESSION_PERMANENT = False
SESSION_TYPE = "filesystem"
MAIL_SERVER = 'smtp.googlemail.com'
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
API_KEY =os.environ.get("API_KEY")