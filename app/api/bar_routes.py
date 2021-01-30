from flask import Blueprint, jsonify
from flask import request
from app.models import db, Bar, Review, User, Image
import json
# from .user_routes import parse_results

bar_routes = Blueprint('bars', __name__)


@bar_routes.route('/<int:barId>')
def bar(barId):
    bar = Bar.query.filter(Bar.id == barId).one()
    reviews = Review.query.filter(Review.barId == barId).all()
    images = Image.query.filter(Image.barId == barId).all()

    bar_data = bar.to_dict()
    reviews_data = [review.to_dict() for review in reviews]
    images_data = [image.to_dict() for image in images]
    # parsed_data = parse_results(reviews)

    return jsonify("bardata", {"bar": bar_data, "reviews": reviews_data, "images": images_data})

@bar_routes.route('/create', methods=['POST'])
def create():
    data = request.get_json(force=True)
    print(data)
    data["dayAndTime"] = json.dumps(data["dayAndTime"])
    newBar = Bar(**data)
    db.session.add(newBar)
    db.session.commit()
    barDictionary = newBar.to_dict()
    return {"id": barDictionary["id"]}
