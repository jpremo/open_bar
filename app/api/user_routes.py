from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import db, User, Bar

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/no-auth/<int:id>')
def userNoAuth(id):
    user = User.query.get(id)
    return user.to_dict_essentials()


@user_routes.route('/<int:id>/favorites')
def userfavorites(id):
    user = User.query.get(int(id))
    bars = user.to_dict()["favoriteBars"]
    return {"favorites": bars}


@user_routes.route('/<int:userId>/favorites/<int:barId>/delete', methods=["DELETE"])
def delete_favorite(userId, barId):
    userId = int(userId)
    barId = int(barId)
    user = User.query.get(userId)
    bar = Bar.query.get(barId)
    user.favoriteBars.remove(bar)
    if not bar:
        return {'msg': 'Bar not found'}, 404
    db.session.commit()
    return {"targetId": barId}


@user_routes.route('/<int:userId>/favorites/<int:barId>/add', methods=["POST"])
def add_favorite(userId, barId):
    userId = int(userId)
    barId = int(barId)
    user = User.query.get(userId)
    bar = Bar.query.get(barId)

    user.favoriteBars.append(bar)
    db.session.commit()
    return {"favorite": "string"}

