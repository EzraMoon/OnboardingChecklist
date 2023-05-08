from dotenv import load_dotenv
import os
from models import db
load_dotenv()

class ApplicationConfig:
    SESSION_TYPE = 'sqlalchemy'
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    SESSION_SQLALCHEMY = db
    SESSION_SQLALCHEMY_TABLE = 'sessions'
    SESSION_PERMANENT=True
    SESSION_USE_SIGNER=True
    #SESSION_REDIS=redis.from_url("redis://127.0.0.1:6379")