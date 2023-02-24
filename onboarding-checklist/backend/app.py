from flask import Flask, request
import getpass
import flask
import json
from flask import Flask, render_template
from flask_cors import CORS

# calling index.js
app = Flask(__name__, static_folder= "index.js", static_url_path="/")
CORS(app, supports_credentials=True)

#incorporating css folder for text font
@app.route('/')
def index():
    return app.send_static_file('index.css')

# validating connection between front end and backend
@app.route('/validate', methods=['GET', 'POST'])
def validate():
    if request.method == 'POST': # signifies that a form was submitted
        data = request.get_json()
        username, password = data
        #using this until we get database with soco users
        database = {'sarah.obriennn': "1234", "socoTO": "5678"}

        #if pass and user are in database then returns success or wrong info
        for i in database.keys():
            if username == i:
                while password != database.get(i):
                    password = ("Wrong password!")
                return {"success": True}
        return {"success": False}

#driver code
if __name__ == '__main__':
    app.run(debug=True, port=3003)
