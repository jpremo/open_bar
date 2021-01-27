from .db import db


class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    partySize = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    barId = db.Column(db.Integer, db.ForeignKey("bars.id"), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bar = db.relationship("Bar", back_populates="reservations")
    user = db.relationship("User", back_populates="reservations")

    def to_dict(self):
        return {
            "id": self.id,
            "partySize": self.partySize,
            "date": f'{self.date}',
            "time": f'{self.time}',
            "barId": self.barId,
            "userId": self.userId
        }
