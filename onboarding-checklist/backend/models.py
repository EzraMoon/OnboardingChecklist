from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from random import randint
from sqlalchemy.ext.orderinglist import ordering_list

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

def get_listid():
    return randint(100000, 999999)

# List database. Idealy each list would be its own instance of TaskList
# and the idea is that the ID could be used to share view with non-members of the site
class TaskList(db.Model):
    __tablename__ = "taskList"
    id = db.Column(db.Integer, unique=True, primary_key = True, default=get_listid) # so that we can implement shared view with id
    title = db.Column(db.String(40), unique=False) # name of list
    author = db.Column(db.String(32), db.ForeignKey('user.id')) # author, connected to a User object
    notes = db.relationship("Note", order_by="Note.number", collection_class=ordering_list('number'))

# Items within a task list
class Note(db.Model):
    __tablename__ = "note"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    number = db.Column(db.Integer)
    list_id = db.Column(db.Integer, db.ForeignKey('taskList.id'))
    text = db.Column(db.String(250))