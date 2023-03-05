from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import UserMixin, login_required, current_user
from .models import Note
from . import db
import json

views = Blueprint('views', __name__)

#Routes for website that user can navigate to 

@views.route('/', methods=['GET', 'POST'])
@login_required #make sure you cant access this route unitl the user is logged in
def home():
    if request.method == 'POST': 
        note = request.form.get('note') #Gets the note from the HTML 

        if len(note) < 1:
            flash('Checklist note is too short!', category='error') #Checks if request note is too short
        else:
            new_note = Note(data=note, user_id=current_user.id)  #providing the schema for the note 
            db.session.add(new_note) #adding the note to the database 
            db.session.commit() #commit new note to session
            flash('Checklist note added!', category='success')

    #Renders html inside home.html
    return render_template("home.html", user=current_user)


@views.route('/delete-note', methods=['POST'])
def delete_note():  
    note = json.loads(request.data) # this function expects a JSON from the INDEX.js file 
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})

#Delete user
#@views.route('delete/<int:id')
#def deleteid(id):
#    user_to_delete = UserMixin.query.get_or_404(id)
