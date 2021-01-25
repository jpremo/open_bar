from .db import db

favorites = db.Table(
    "favorites",
    db.Column("barId", db.Integer, db.ForeignKey("bars.id")),
    db.Column("userId", db.Integer, db.ForeignKey("users.id"))
)
