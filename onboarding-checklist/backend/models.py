from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from random import randint
from sqlalchemy.ext.orderinglist import ordering_list
from sqlalchemy import MetaData

convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(metadata=metadata)

def get_uuid():
    return uuid4().hex

# User database with username and password, with ID being the main identifier
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # unique user id used as a cookie
    username = db.Column(db.String(345), unique=True) # email
    password = db.Column(db.Text, nullable=False)
    first = db.Column(db.String(40), unique=False) # first name
    last = db.Column(db.String(40), unique=False)
    tasklists = db.relationship("TaskList", back_populates="user") # list of owned tasks

def get_listid(): # code generation so ppl can access it
    return randint(100000, 999999)

# List database. Idealy each list would be its own instance of TaskList
# and the idea is that the ID could be used to share view with non-members of the site
class TaskList(db.Model):
    __tablename__ = "taskList"
    id = db.Column(db.Integer, unique=True, primary_key = True, default=get_listid) # so that we can implement shared view with id
    title = db.Column(db.String(40), unique=False) # name of list
    user = db.relationship("User", back_populates="tasklists") # user that owns the list
    user_id = db.Column(db.String(32), db.ForeignKey('users.id')) # required for user ownership
    notes = db.relationship("Note", back_populates="tasklist") # list of notes within the list

def get_taskid(): # required to identify specific notes
    return randint(0, 999999)

# Items within a task list
class Note(db.Model):
    __tablename__ = "note"
    id = db.Column(db.Integer, primary_key=True, unique=True, default=get_taskid()) # id used to identify
    number = db.Column(db.Integer) # number position on the list
    tasklist = db.relationship("TaskList", back_populates="notes") # list that the note is a part of
    tasklist_id = db.Column(db.Integer, db.ForeignKey('taskList.id')) # required for the list ownership
    text = db.Column(db.String(250)) # actual content of the item
    title = db.Column(db.String(50)) # title of the task
    parentID = db.Column(db.Integer, db.ForeignKey('note.id'))
    parent = db.relationship('Note', remote_side=[id])
    complete = db.Column(db.Boolean, unique=False, default=False) # whether or not the task is complete