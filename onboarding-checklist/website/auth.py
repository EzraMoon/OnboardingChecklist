from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   ##means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user

# Represents a blueprint, a collection of routes and other app-related functions that can be registered on a real application later.
# Creates an instance of the "auth" route
auth = Blueprint('auth', __name__)

# login functionality
@auth.route('/login', methods=['GET', 'POST']) #Decorate a view function to register it with the given URL rule and options.
def login():
    # Get email and password values
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        # Filter data query and assign in to current user
        user = User.query.filter_by(email=email).first()
        if user:
            # Check a password against a given salted and hashed password value. 
            if check_password_hash(user.password, password):
                # Return true = match
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True) #login user until session is over
                return redirect(url_for('views.home')) #redirect to home page
            else:
                # Return false = non-match
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')

    return render_template("login.html", user=current_user) #render login page


#Logout Functionality
@auth.route('/logout')
@login_required #Cant logout unless logged in
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

#Signup Functionality
@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST': #get all information from form and store in vars
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(email=email).first() #Filter database to current user
        if user:
            flash('Email already exists.', category='error')
        elif "@southernco" not in email:
            flash('Email must be a Southern Company Email', category='error')
        elif len(email) < 10:
            flash('Email must be greater than 9 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            #create account
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(
                password1, method='sha256')) #Encrypt pass using SHA256
            db.session.add(new_user) #that creates instances of .Session scoped to the current Flask application context.
            db.session.commit() #add user to database and update the session
            login_user(new_user, remember=True) #login user until session is over
            flash('Account created!', category='success')
            return redirect(url_for('views.home')) #Redirect user to home page

    return render_template("sign_up.html", user=current_user) #render sign-up page
