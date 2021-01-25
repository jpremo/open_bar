from .db import db

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key = True)
  overall = db.Column(db.Integer, nullable = False)
  food = db.Column(db.Integer, nullable = False)
  service = db.Column(db.Integer, nullable = False)
  ambience = db.Column(db.Integer, nullable = False)
  value = db.Column(db.Integer, nullable = False)
  review = db.Column(db.String(2500), nullable = False, default = "")
  barId = db.Column(db.Integer, nullable = False, ForeignKey("bars.id"))
  userId = db.Column(db.Integer, nullable = False, ForeignKey("users.id"))
  bar = db.relationship("Bar", back_populates="reviews")
  user = db.relationship("User", back_populates="reviews")

  def to_dict(self):
    return {
      "id": self.id,
      "overall": self.overall,
      "food": self.food,
      "service": self.service,
      "ambience": self.ambience,
      "value": self.value,
      "review": self.review,
      "barId": self.barId,
      "userId": self.userId
    }
