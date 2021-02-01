from flask import Blueprint, jsonify
from app.models import Bar, Review, User, Image, Reservation

bar_routes = Blueprint('bars', __name__)


@bar_routes.route('/<int:barId>')
def bar(barId):
    bar = Bar.query.filter(Bar.id == barId).one()
    reviews = Review.query.filter(Review.barId == barId).all()
    images = Image.query.filter(Image.barId == barId).all()

    bar_data = bar.to_dict()
    reviews_data = [review.to_dict() for review in reviews]
    images_data = [image.to_dict() for image in images]

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

    return jsonify("bardata", {
        "bar": bar_data,
        "reviews": reviews_data,
        "reviews_summary_data": reviews_summary_data,
        "images": images_data,
    })


@bar_routes.route('<int:barId>/reservations/user/<int:userId>', methods=['GET'])
def reservation(barId, userId):
    reservations = Reservation.query.filter(
        Reservation.barId == barId).filter(Reservation.userId == userId).all()

    return jsonify([reservation.to_dict() for reservation in reservations])

    # return request

    # data = request.get_json()

    # if data is None:
    #     data = json.loads(request.data.decode('utf-8'))

    # # if (data["userId"]):
    # #     date_str = data['date'] + ' ' + data['time']
    # #     format_str = '%m/%d/%Y %I:%M %p'  # The format
    # #     print(date_str)
    # #     datetime_obj = datetime.strptime(date_str, format_str)
    # #     reservation = Reservation(partySize=int(data["partySize"]), userId=int(
    # #         data["userId"]), barId=int(data["barId"]),
    # #         time=datetime_obj, date=datetime_obj)
    # #     db.session.add(reservation)
    # #     db.session.commit()
    #     return {"message": 'received'}
    # return {'message': 'bad data'}
