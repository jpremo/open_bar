from .db import db
from .favorites import favorites
from sqlalchemy.dialects.postgresql import JSONB


class Bar(db.Model):
    __tablename__ = 'bars'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False, default='')
    phoneNumber = db.Column(db.String(25), nullable=False)
    longitude = db.Column(db.Numeric, nullable=False)
    latitude = db.Column(db.Numeric, nullable=False)
    street = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    barSeats = db.Column(db.Integer, nullable=False)
    dayAndTime = db.Column(JSONB, nullable=False)
    bannerImg = db.Column(db.String(1000), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="bars")
    reviews = db.relationship("Review", back_populates="bar")
    reservations = db.relationship("Reservation", back_populates="bar")
    favoriteUsers = db.relationship(
        "User", secondary=favorites, back_populates="favoriteBars")
    images = db.relationship("Image", back_populates="bar")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "phoneNumber": self.phoneNumber,
            "longitude": float(self.longitude),
            "latitude": float(self.latitude),
            "street": self.street,
            "state": self.state,
            "zipcode": self.zipcode,
            "barSeats": self.barSeats,
            "dayAndTime": self.dayAndTime,
            "bannerImg": self.bannerImg,
            "ownerId": self.ownerId
        }
