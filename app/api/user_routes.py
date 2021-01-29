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


@user_routes.route('/<int:id>/favorites')
def userfavorites(id):
    user = User.query.get(int(id))
    bars = user.to_dict()["favoriteBars"]
    # print(f'YOOOOOOOO!!!!!!  {userFavorites}')
    print(bars)
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

    # barId = request.body.barId
    # user = User.query.get(int(id))
    # bar = Bar.query.get(int())
    # print(request.json())
    # user.favoriteBars.remove()
    # userId = data["userId"]
    # barId = data["barId"]
    # db.session.delete()


# @work_routes.route('/<work_id>/saved', methods=['DELETE'])
# @login_required
# def unsave_work(work_id):
#     work_id = int(work_id)
#     user_id = current_user.id
#     work = Work.query.get(work_id)
#     if not work:
#         return {'msg': 'Work not found'}, 404
#     user = User.query.get(user_id)
#     work.users_saved.remove(user)
#     db.session.commit()
#     return {"id": work_id}, 200
