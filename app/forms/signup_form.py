from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Regexp, Length
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Entered username is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Username is required."), username_exists, Regexp(
        '^\w+$', message="Username may only contain letters, numbers, and underscores."), Length(max=40, message="Username may not exceed 40 characters.")])
    email = StringField('email', validators=[DataRequired(message="Email is required."), user_exists, Email(
        message="Please enter a valid email."), Length(max=255, message="Email may not exceed 255 characters")])
    password = StringField('password', validators=[DataRequired(message="Password is required.",), Length(
        min=8, max=50, message="Password must be 8 to 50 characters long.")])
    firstName = StringField('firstName', validators=[DataRequired(message="First Name is required."), Length(
        max=50, message="First name may not exceed 50 characters.")])
    lastName = StringField('lastName', validators=[DataRequired(message="Last Name is required."), Length(
        max=50, message="Last name may not exceed 50 characters.")])
    profileImg = StringField('profileImg', validators=[Length(
        max=1000, message="Profile image URL may not exceed 1000 characters")])

    # username = StringField('username', validators=[DataRequired(message="Username is required."), username_exists, Regexp(
    #     '^\w+$', message="Username may only contain letters, numbers, and underscores."), Length(max=40, message="Username may not exceed 40 characters.")])
    # email = StringField('email', validators=[DataRequired(message="Email is required."), user_exists, Email(
    #     message="Please enter a valid email."), Length(max=255, message="Email may not exceed 255 characters")])
    # password = StringField('password', validators=[DataRequired(message="Password is required.",), Length(
    #     min=8, max=50, message="Password must be 8 to 50 characters long.")])
    # firstName = StringField('firstName', validators=[DataRequired(message="First Name is required."), Length(
    #     max=50, message="First name may not exceed 50 characters.")])
    # lastName = StringField('lastName', validators=[DataRequired(message="Last Name is required."), Length(
    #     max=50, message="Last name may not exceed 50 characters.")])
    # biography = StringField('biography', validators=[Length(
    #     max=1000, message="Please limit biography to 1000 characters.")])
