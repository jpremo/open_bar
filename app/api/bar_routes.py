from flask import Blueprint, jsonify
from app.models import Bar, Review, User, Image

bar_routes = Blueprint('bars', __name__)


@bar_routes.route('/<int:barId>')
def bar(barId):
    bar = Bar.query.filter(Bar.id == barId).one()
    reviews = Review.query.filter(Review.barId == barId).all()
    images = Image.query.filter(Image.barId == barId).all()

    bar_data = bar.to_dict()
    reviews_data = [review.to_dict() for review in reviews]
    images_data = [image.to_dict() for image in images]

    return {"bar": bar_data, "reviews": reviews_data, "images": images_data}
