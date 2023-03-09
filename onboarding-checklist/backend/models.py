from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

# User database with username and password, with ID being the main identifier
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    first = db.Column(db.String(40), unique=False)
    last = db.Column(db.String(40), unique=False)

def get_taskid():
    return uuid4().hex

# List database. Idealy each list would be its own instance of TaskList
# and the idea is that the ID could be used to share view with non-members of the site
class TaskList(db.Model):
    __tablename__ = "taskList"
    id = db.Column(db.String(8), unique=True, primary_key = True) # so that we can implement shared view with id
    title = db.Column(db.String(40), unique=False) # name of list
    data = db.Column(db.String(10000), unique=False) # the tasks themselves
    author = db.Column(db.String(32), db.ForeignKey('user.id')) # author, connected to a User object