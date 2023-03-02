from flask import Flask, request, jsonify, session
from json import *
from flask import Flask, render_template
from flask_cors import CORS, cross_origin
from flask_login import *
from models import db, User
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from flask_session import Session


# calling index.js
app = Flask(__name__, static_folder= "index.js", static_url_path="/")
CORS(app, supports_credentials=True)
app.config.from_object(ApplicationConfig)

# Global Variables
database = {'sarah.obriennn': "1234", "socoTO": "5678", 'elise': '1234'}
globalUser = "Testing"

# Database code
db.init_app(app)
bcrypt = Bcrypt(app)
server_session = Session(app)
with app.app_context():
    db.create_all()

#incorporating css folder for text font
@app.route('/')
def index():
    return app.send_static_file('index.css')

def check_credentials(user, passw):
    print('inside', flush=True)
    global database # make sure we are using the database outlined
    global globalUser

    if user in database.keys():
        if passw == database[user]:
            globalUser = user
            return True
        else:
            return False
    else:
        return False



# validating connection between front end and backend
@app.route('/validate', methods=['GET', 'POST'])
def validate():
    global globalUser
    if request.method == 'POST': # signifies that a form was submitted
        data = request.get_json()
        username, password = data
        

        #using this until we get database with soco users
        #if pass and user are in database then returns success or wrong info
        if (check_credentials(username, password) == True):
            globalUser = username
            return {"success" : True}
        else:
            return {"success" : False}
    else:
        return jsonify({"username" : globalUser})
    
@app.route('/profile', methods=['GET'])
def profile():
    global globalUser
    return jsonify({"username" : globalUser})

@app.route('/register', methods=['POST'])
def register_user():
    username = request.json['username']
    password = request.json['password']

    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return  jsonify({"error" : "User already exists"}, 409)
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "id" : new_user.id,
        "username" : new_user.username
    })

@app.route('/login', methods=['POST'])
def login_user():
    username = request.json['username']
    password = request.json['password']

    user = User.query.filter_by(username=username).first()

    if user is None: # if user is not created already
        return  jsonify({"error" : "Unauthorized"}, 401)
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error" : "Unauthorized"}, 401)
    
    session["user_id"] = user.id # Creates a cookie

    return jsonify({
        "id" : user.id,
        "username" : user.username
    })

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error" : "Unauthorized"}, 401)
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id" : user.id,
        "username" : user.username
    }) 

#driver code
if __name__ == '__main__':
    globalUser = "Testing"
    app.run(debug=True, port=3003)

