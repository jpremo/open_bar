from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from sqlalchemy import or_


def user_exists(form, field):
    email = field.data  # username can also be used
    user = User.query.filter(
        or_(User.email == email, User.username == email)).first()
    if not user:
        raise ValidationError("Invalid email/username.")


def password_matches(form, field):
    password = field.data
    email = form.data['email']
    user = User.query.filter(
        or_(User.email == email, User.username == email)).first()
    if user and not user.check_password(password):
        raise ValidationError("Invalid password.")


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(
        message="Email/Username is required."), user_exists])
    password = StringField('password', validators=[
                           DataRequired(message="Password is required."), password_matches])
