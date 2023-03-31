from flask import Flask, request, jsonify, session
from json import *
from flask import Flask, render_template
from flask_cors import CORS, cross_origin
from flask_login import *
from models import db, User, TaskList, Note
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_migrate import Migrate


# calling index.js
app = Flask(__name__, static_folder= "index.js", static_url_path="/")
app.config['SECRET_KEY'] = 'secretkey'
CORS(app, supports_credentials=True)
app.config.from_object(ApplicationConfig)
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

# Database code
db.init_app(app)
bcrypt = Bcrypt(app)
Session(app)
migrate = Migrate(app, db, render_as_batch=True) # Needed for every time we change the database https://flask-migrate.readthedocs.io/en/latest/
@app.before_first_request
def create_tables():
    db.create_all()

#incorporating css folder for text font
@app.route('/')
@cross_origin(supports_credentials=True)
def index():
    return app.send_static_file('index.css')

# Function to create a new task list attributed to the user
@app.route('/create', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_list():
    data = request.get_json()
    title = data[0] # all we need is the title of the future list

    # getting info attributed to user so we can identify the author
    user_id = session.get("user_id") 
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"Error" : "User does not exist"})

    # add the task list to the user, so they own it
    user.tasklists.append(TaskList(title=title, user=user))
    db.session.commit() # IMPORTANT -> Assigns it to be saved between sessions

    return  jsonify({"Success" : True})

@app.route('/copy', methods=['POST'])
@cross_origin(supports_credentials=True)
def duplicate_list():
    org_id = request.get_json() # the code of the list we are copying

    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"Error" : "User does not exist"})

    cList = TaskList.query.filter_by(id=org_id).first()

    if not cList:
        return jsonify({"Error" : "List being copied does not exist"})
    
    user.tasklists.append(TaskList(title=(cList.title + " copy"), user=user, notes=cList.notes))
    db.session.commit()
    return  jsonify({"Success" : True})


@app.route('/delete', methods=['POST'])
@cross_origin(supports_credentials=True)
def delete_list():
    listid = request.get_json()

    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"Error" : "User does not exist"})
    
    cList = TaskList.query.filter_by(id=listid).first()

    if not cList:
        return jsonify({"Error" : "List does not exist"})
    
    user.tasklists.remove(cList)
    db.session.commit()
    return jsonify({"Success" : True})


# Function to return all the names of the existing tasklists
@app.route('/listdata', methods=['GET'])
@cross_origin(supports_credentials=True)
def list_info():
    # get the current user based on the session
    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return
    # create a list of the names of the user's created lists
    list_of_lists = user.tasklists
    nameList = []
    namedict = {list_of_lists[i].id : list_of_lists[i].title for i in range(0, len(list_of_lists))}


    for x in list_of_lists:
        nameList.append((x.title))

    
    # return a list of the names
    return jsonify({"data" : nameList, "dict" : namedict})

@app.route('/addnote', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_to_list():
    # somehow choose which list we are selecting
    # I'm asuming by creating a list-specific page
    # list.append(Note(...))
    # db.session.commit() 
    data = request.get_json()
    listID = data[0]
    text = data[1]
    description = data[2]
    subtask = data[3]

    cList = TaskList.query.filter_by(id=listID).first()

    if not cList:
        return jsonify({"Error" : "List not found"}, 404)
    
    cList.notes.append(Note(title=text, tasklist=cList, text=description, complete=False)) # Subtasks will be another process
    db.session.commit() # Attributes it to the user
    return jsonify({"data" : data})

@app.route('/deletenote', methods=['POST'])
@cross_origin(supports_credentials=True)
def remove_from_list():
    listID, noteID = request.get_json()
    cList = TaskList.query.filter_by(id=listID).first()
    cNote = Note.query.filter_by(id=noteID).first()

    if not cList:
        return jsonify({"Error" : "List not found"}, 404)
    
    if not cNote:
        return jsonify({"Error" : "Note not found"}, 404)
    
    cList.notes.remove(cNote)
    db.session.commit() 
    return jsonify({"Success" : True})


# Grabs the info from a specific list
# identififed by the corresponding list code 
@app.route('/getlist', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_list():
    id = request.get_json()
    iden_list = TaskList.query.filter_by(id=id).first()

    if not iden_list:
        return jsonify({"Error" : "List does not exist"}, 404)
    
    noteList = []
    for x in iden_list.notes:
        noteList.append({"id" : x.id, "title" : x.title, "text" : x.text, "complete" : x.complete})
    
    return jsonify({"Title" : iden_list.title,
                    "Author" : iden_list.user.first,
                    "Data" : noteList})

    

# Register func to add new users to the database
@app.route('/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register_user():
    data = request.get_json()
    email = data[0]
    password = data[1]
    first = data[2]
    last = data[3]

    # Checks if user exists in the database at all
    user_exists = User.query.filter_by(username=email).first() is not None

    if user_exists:
        return  jsonify({"error" : "Exists"})
    
    if "@southernco" not in email:
        return jsonify({"error" : "Email"})

    # Encoding password to be secure
    hashed_password = bcrypt.generate_password_hash(password)
    # Create new User
    new_user = User(username=email, password=hashed_password, first=first, last=last)
    # Add new user to the session
    db.session.add(new_user)
    db.session.commit()
    # Return user info
    return jsonify({
        "id" : new_user.id,
        "email" : new_user.username,
        "name" : new_user.first
    })

# Login func to validate credentials using the database
@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login_user():
    # Get username and password entry
    data = request.get_json()
    email, password = data
    # Search for user in the database
    user = User.query.filter_by(username=email).first()

    if user is None: # if user is not created already
        return  jsonify({"error" : "Unauthorized"}, 401)
    
    # Check if password is correct -> Encrypted
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error" : "Unauthorized"}, 401)
    
    session["user_id"] = user.id # Creates a cookie to remember user

    # Returns user ID and username
    return jsonify({
        "id" : user.id,
        "email" : user.username
    })

# Profile Data func
@app.route("/@me")
@cross_origin(supports_credentials=True)
def get_current_user():
    # Gets the current user id based on session
    user_id = session.get("user_id")
    
    # Block unauthorized users
    if not user_id:
        return jsonify({"error" : "Unauthorized"}, 401)
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id" : user.id,
        "email" : user.username,
        "name" : user.first
    }) 

@app.route('/taskData')
@cross_origin(supports_credentials=True)
def get_user_task_data():
    return True

@app.route('/logout')
@cross_origin(supports_credentials=True)
def logout():
    logout_user()
    if session.get('user_id'):
        del session['user_id']
    return jsonify({"logout" : True})

#driver code
if __name__ == '__main__':
    app.run(debug=True, port=3003)

