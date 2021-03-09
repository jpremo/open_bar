from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .favorites import favorites
import json


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profileImg = db.Column(db.String(1000), nullable=False, default='')
    hashed_password = db.Column(db.String(255), nullable=False)
    bars = db.relationship("Bar", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    reservations = db.relationship("Reservation", back_populates="user")
    favoriteBars = db.relationship(
        "Bar", secondary=favorites, back_populates="favoriteUsers", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        nums = []
        for b in self.favoriteBars:
            nums.append(b.to_dict())
        res = []
        for r in self.reservations:
            res.append(r.to_dict())
        print('res\n\n', res)
        # res = json.loads(res)
        return {
            "id": self.id,
            "username": self.username,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "profileImg": self.profileImg,
            "email": self.email,
            "favoriteBars": nums,
            "reservations": res,
            "reviews": self.reviews
        }

    def to_dict_essentials(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "profileImg": self.profileImg,
        }
