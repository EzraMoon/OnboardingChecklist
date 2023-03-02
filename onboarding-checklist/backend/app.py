from flask import Flask, request, jsonify
import getpass
import flask
import json
from json import *
from flask import Flask, render_template
from flask_cors import CORS, cross_origin
from flask_login import *

# calling index.js
app = Flask(__name__, static_folder= "index.js", static_url_path="/")
CORS(app, supports_credentials=True)
database = {'sarah.obriennn': "1234", "socoTO": "5678", 'elise': '1234'}
globalUser = "Testing"

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

        #for i in database.keys():
            #if username == i:
                #globalUser = str(username)
                #if password != database.get(i):
                    #password = ("Wrong password!")
                #return {"success": True}
        #return {"success": False}
    else:
        return jsonify({"username" : globalUser})
    
@app.route('/profile', methods=['GET'])
def profile():
    global globalUser
    return jsonify({"username" : globalUser})

#driver code
if __name__ == '__main__':
    globalUser = "Testing"
    app.run(debug=True, port=3003)

