from flask import Blueprint, jsonify
from app.models import Bar, Review
from flask import request

search_routes = Blueprint('search', __name__)

def parse_results(res):
    d = res.to_dict()
    d['reviews'] = [rev.to_dict() for rev in res.reviews]
    d['review_total'] = len(d['reviews'])
    d['ratings'] = {
        "overall": sum(d['overall'] for d in d['reviews']) / d['review_total'],
        "food": sum(d['food'] for d in d['reviews']) / d['review_total'],
        "service": sum(d['service'] for d in d['reviews']) / d['review_total'],
        "ambience": sum(d['ambience'] for d in d['reviews']) / d['review_total'],
        "value": sum(d['value'] for d in d['reviews']) / d['review_total'],
        }
    return d

@search_routes.route('/')
def search():
    coord = request.args.get('coord')
    business = request.args.get('business')

    lng = 0
    lat = 0
    lngRange = 10000
    latRange = 10000
    if(coord != 'NoLocation'):
        coord = coord.split(',')
        lng = float(coord[0])
        lat = float(coord[1])
        latRange = .33
        lngRange = .33
    search_str = f'%{business}%'
    search_results = Bar.query.join(Review).filter(
        Bar.name.like(search_str),
        Bar.longitude.between(lng-lngRange, lng+lngRange),
        Bar.latitude.between(lat-latRange, lat+latRange),
    ).all()
    search_results = list(map(parse_results,search_results))
    # [{el.to_dict(), 'reviews'= el.reviews} for el in search_results]
    print('\n', search_results, '\n')

    return {"searched": True}
