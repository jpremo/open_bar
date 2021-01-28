from flask import Blueprint, jsonify
from app.models import Bar, Review, Image, favorites, User, db
from flask import request
import itertools
search_routes = Blueprint('search', __name__)


def parse_results(res):
    d = res.to_dict()

    # d['images'] = [img.to_dict() for img in res.images]
    d['reviews'] = [rev.to_dict() for rev in res.reviews]
    d['review_total'] = len(d['reviews'])
    d['ratings'] = {
        "overall": sum(d['overall'] for d in d['reviews']) / d['review_total'],
        "food": sum(d['food'] for d in d['reviews']) / d['review_total'],
        "service": sum(d['service'] for d in d['reviews']) / d['review_total'],
        "ambience": sum(d['ambience'] for d in d['reviews']) / d['review_total'],
        "value": sum(d['value'] for d in d['reviews']) / d['review_total'],
    }
    del d['reviews']
    return d


@search_routes.route('/')
def search():
    coord = request.args.get('coord')
    business = request.args.get('business')
    searchId = request.args.get('id')
    if business == '' and coord == 'NoLocation':
        return {"searchResults": []}
    if searchId and searchId != 'undefined':
        searchId = int(searchId)
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
    search_results = Bar.query.join(Review).join(Image).filter(
        Bar.name.ilike(search_str),
        Bar.longitude.between(lng-lngRange, lng+lngRange),
        Bar.latitude.between(lat-latRange, lat+latRange),
    ).all()

    search_results = list(map(parse_results, search_results))
    if(coord == 'NoLocation'):
        if(len(search_results) > 0):
            lng= search_results[0]['longitude']
            lat= search_results[0]['latitude']


    print('\n', 'Search Results \n', search_results,
          '\n length \n', len(search_results), '\n')

    # return {'test': 1.264}
    return jsonify({"searchResults": search_results})



@search_routes.route('/popular')
def popular():
    search_results = Bar.query.join(Review).join(Image).group_by(Bar.id).order_by(db.func.count(Review.id).desc()).limit(5).all()
    winery = Bar.query.join(Review).join(Image).filter(Bar.name.ilike("%wine%")).all()
    winery = winery[0:5]
    brewery = Bar.query.join(Review).join(Image).filter(Bar.name.ilike("%brew%")).all()
    brewery = brewery[0:5]
    search_results = list(map(parse_results,search_results))
    winery_results = list(map(parse_results, winery))
    brewery_results = list(map(parse_results, brewery))
    return jsonify({"mostPopular": search_results, "winery": winery_results, "brewery": brewery_results})
