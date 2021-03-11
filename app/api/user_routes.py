from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db, User, Bar, Review
import boto3
import os
import uuid

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {"users": [user.to_dict() for user in users]}


@user_routes.route('/photos', methods=['POST'])
def photo_upload():
    # AWS Initialization
    BUCKET_NAME = os.environ.get('BUCKET_NAME')
    KEY_ID = os.environ.get('AWS_KEY_ID')
    SECRET_KEY_ID = os.environ.get('AWS_SECRET_KEY')
    # s3 = boto3.client('s3',
    #                   aws_access_key_id=KEY_ID,
    #                   aws_secret_access_key=SECRET_KEY_ID
    #                   )
    s3_resource = boto3.resource(
        's3',
        aws_access_key_id=KEY_ID,
        aws_secret_access_key=SECRET_KEY_ID)

    bucket = s3_resource.Bucket(BUCKET_NAME)
    data = request.files
    data = data.to_dict()
    photo = data['photo']
    uni = str(uuid.uuid4())
    unique_filename = 'app-data/' + uni + '.' + photo.filename.split('.')[1]
    bucket.Object(unique_filename).put(Body=photo.read())
    return {"link": f"https://{BUCKET_NAME}.s3.amazonaws.com/{unique_filename}"}




@user_routes.route('/profileImage', methods=["PUT"])
def profileImage():
    data = request.get_json(force=True)
    profileImage = data["profileImage"]
    id = data["id"]

    if profileImage == None or profileImage == "undefined": 
        profileImage = ''
    
    user = User.query.get(id)  
    user.profileImg = profileImage
    db.session.commit()
    return user.to_dict()




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
    bars = user.favoriteBars
    barInfo = [bar.to_dict() for bar in bars]
    for i in range(0, len(bars)): 
        reviews_data = [review.to_dict() for review in bars[i].reviews]
        
        reviews_summary_data = {}
        reviews_summary_data['overall'] = round(sum(
            [review['overall'] for review in reviews_data]) / len(reviews_data), 1)
        reviews_summary_data['food'] = round(sum(
            [review['food'] for review in reviews_data]) / len(reviews_data), 1)
        reviews_summary_data['service'] = round(sum(
            [review['service'] for review in reviews_data]) / len(reviews_data), 1)
        reviews_summary_data['ambience'] = round(sum(
            [review['ambience'] for review in reviews_data]) / len(reviews_data), 1)
        reviews_summary_data['value'] = round(sum(
            [review['value'] for review in reviews_data]) / len(reviews_data), 1)
        reviews_summary_data['review_total'] = len(reviews_data)

        barInfo[i]["review_total"] = reviews_summary_data["review_total"]
        barInfo[i]["ratings"] = reviews_summary_data

        # print("\n", reviews, "\n")
    return {"favorites": barInfo}


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
    barDict = bar.to_dict()

    user.favoriteBars.append(bar)
    db.session.commit()
    return {"favorite": "string", "bar": barDict}


@user_routes.route('/<int:userId>/reviews/bar/<int:barId>', methods=['GET'])
def getReview(userId, barId):
    review = Review.query.filter(Review.userId == int(
        userId)).filter(Review.barId == int(barId)).first()
    if review == None:
        return {"review": False}
    else:
        return {"review": review.to_dict()}


@user_routes.route('/<int:userId>/userReviews', methods=['GET'])
def getUserReviews(userId):
    user = User.query.get(int(userId))
    reviews = user.to_dict()["reviews"]
    return {"reviews": reviews}



@user_routes.route('/<int:userId>/reviews/bar/<int:barId>', methods=['POST'])
def postReview(userId, barId):
    if request:
        data = request.get_json()

        overall = int(data['overall']['value'])
        food = int(data['food']['value'])
        service = int(data['service']['value'])
        ambience = int(data['ambience']['value'])
        value = int(data['value']['value'])
        review = str(data['review'])
        barId = int(barId)
        userId = int(userId)

        if overall > 0 and food > 0 and service > 0 and ambience > 0 and value > 0 and len(review) > 0 and barId > 0 and userId > 0:
            review = Review(
                overall=overall,
                food=food,
                service=service,
                ambience=ambience,
                value=value,
                review=review,
                barId=barId,
                userId=userId
            )
            db.session.add(review)
            db.session.commit()
            return {"message": "received, committed"}
        else:
            return {"message": "received, rejected"}


@user_routes.route('/<int:userId>/reviews/<int:id>', methods=['DELETE'])
def deleteReview(userId, id):
    if request:
        review = Review.query.filter_by(id=id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return {"message": "deleted"}
        else:
            return {"message": "no such review?"}

    return {"message": "request is false?"}


@user_routes.route('/<int:userId>/reviews/<int:reviewId>', methods=["PATCH"])
def updateReview(userId, reviewId):
    if request:
        review = Review.query.filter_by(id=reviewId).first()
        if review:
            data = request.get_json()

            overall = int(data['overall']['value'])
            food = int(data['food']['value'])
            service = int(data['service']['value'])
            ambience = int(data['ambience']['value'])
            value = int(data['value']['value'])
            reviewStr = str(data['review'])

            review.overall = overall
            review.food = food
            review.service = service
            review.ambience = ambience
            review.value = value
            review.review = reviewStr

            db.session.commit()
            return {"message": "updated"}
        else:
            return {"message": "no such review?"}

    return {"message": "request is false?"}
