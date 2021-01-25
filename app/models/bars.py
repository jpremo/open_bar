from .db import db

class Bar(db.Model):
  __tablename__ = 'bars'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(50), nullable = False)
  description = db.Column(db.String(1000), nullable = False, default='')
  phoneNumber = db.Column(db.String(25), nullable = False)
  longitude = db.Column(db.Numeric, nullable = False)
  latitude = db.Column(db.Numeric, nullable = False)
  street = db.Column(db.String(255), nullable = False)
  state = db.Column(db.String(50), nullable = False)
  zipcode = db.Column(db.Integer, nullable = False)
  barSeats = db.Column(db.Integer, nullable = False)
  dayAndTime = db.Column(db.JSONB, nullable = False)
  bannerImg = db.Column(db.String(1000), nullable = False)
  ownerId = db.Column(db.Integer, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      "phoneNumber": self.phoneNumber,
      "longitude": self.longitude,
      "latitude": self.latitude,
      "street": self.street,
      "state": self.state,
      "zipcode": self.zipcode,
      "barSeats": self.barSeats,
      "dayAndTime": self.dayAndTime,
      "bannerImg": self.bannerImg,
      "ownerId": self.ownerId
    }
