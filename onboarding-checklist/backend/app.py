from flask import Flask, request, jsonify, session
from json import *
from flask import Flask, render_template
from flask_cors import CORS, cross_origin
from flask_login import *
from models import db, User, TaskList
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
migrate = Migrate(app, db) # Needed for every time we change the database https://flask-migrate.readthedocs.io/en/latest/

#incorporating css folder for text font
@app.route('/')
@cross_origin(supports_credentials=True)
def index():
    return app.send_static_file('index.css')
    
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
        "email" : new_user.username
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

