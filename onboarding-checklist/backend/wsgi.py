from app import app
import os
from config import ApplicationConfig
from dotenv import load_dotenv

app.config.from_object(ApplicationConfig)
app.secret_key = os.environ.get('SECRET_KEY')
app.config["SESSION_TYPE"] = 'sqlalchemy'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SESSION_PERMANENT'] = True

if __name__ == "__main__":
    app.run()