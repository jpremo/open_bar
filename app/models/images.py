from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    photoUrl = db.Column(db.String(1000), nullable=False, default='')
    barId = db.Column(db.Integer, db.ForeignKey("bars.id"), nullable=False)

    bar = db.relationship("Bar", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "photoUrl": self.photoUrl,
            "barId": self.barId
        }
