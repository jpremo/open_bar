from flask import Blueprint, jsonify
from app.models import Bar, Review, Image, favorites, User, Reservation, db
from flask import request
import itertools
import math
import json
from datetime import datetime
from datetime import timedelta
search_routes = Blueprint('search', __name__)


# body: JSON.stringify({
#                         barId: idComp,
#                         date,
#                         time,
#                         userId,
#                         partySize: 2,
#                     }
@search_routes.route('/reservation', methods=['POST'])
def reservation():
    data = request.get_json()

    if data is None:
        data = json.loads(request.data.decode('utf-8'))

    if (data["userId"]):
        date_str = data['date'] + ' ' + data['time']
        format_str = '%m/%d/%Y %I:%M %p'  # The format
        print(date_str)
        datetime_obj = datetime.strptime(date_str, format_str)
        reservation = Reservation(partySize=int(data["partySize"]), userId=int(
            data["userId"]), barId=int(data["barId"]),
            time=datetime_obj, date=datetime_obj)
        db.session.add(reservation)
        db.session.commit()
        return {"message": 'received'}
    return {'message': 'bad data'}


@search_routes.route('/')
def search():
    coord = request.args.get('coord')
    business = request.args.get('business')
    searchId = request.args.get('id')
    day = request.args.get('day')
    time = request.args.get('time')
    date = request.args.get('date')

    def parse_results(res):
        d = res.to_dict()

        # d['images'] = [img.to_dict() for img in res.images]
        time_range = d['dayAndTime'][day]
        time_range = time_range.split('-')
        open_time = time_range[0]
        close_time = time_range[1]
        reservation_strings = []
        final_time = time
        final_day = day
        date_str = date  # The date - 29 Dec 2017
        format_str = '%m/%d/%Y'  # The format
        datetime_obj = datetime.strptime(date_str, format_str)
        if time >= open_time or time <= close_time:
            pass
        else:
            days = ['monday', 'tuesday', 'wednesday',
                    'thursday', 'friday', 'saturday', 'sunday']
            day_index = days.index(day)
            day_index = day_index + 1
            datetime_obj = datetime_obj + timedelta(days=1)
            if day_index > 6:
                day_index = 0
            final_day = days[day_index]
            final_time = d['dayAndTime'][final_day]
            final_time = final_time.split('-')
            final_time = final_time[0]
        time_range = d['dayAndTime'][final_day]
        time_range = time_range.split('-')
        open_time = time_range[0]
        close_time = float(time_range[1])
        for i in range(0, 5):
            base_time = float(final_time) + .5*i
            datetime_copy = datetime_obj
            if ((close_time > 6 and base_time <= close_time) or
                    (close_time < 6 and base_time <= close_time+24)):
                suffix = ' PM'
                if base_time >= 12:
                    base_time = base_time - 12
                    if base_time >= 12:
                        datetime_copy = datetime_copy + timedelta(days=1)
                        base_time = base_time - 12
                        suffix = ' AM'
                else:
                    suffix = ' AM'

                str_time = ''
                if base_time == 0 or base_time == .5:
                    base_time = base_time + 12
                if base_time != math.floor(base_time):
                    str_time = str(math.floor(base_time))+':30'
                else:
                    str_time = str(math.floor(base_time))+':00'

                reservation_strings.append(
                    [f'{datetime_copy.month}/{datetime_copy.day}/{datetime_copy.year}', str_time + suffix])
        # print('\n', reservation_strings,'\n')
        d['time_slots'] = reservation_strings
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

    if business == '' and coord == 'NoLocation':
        return {"searchResults": []}
    if searchId and searchId != 'undefined' and searchId != 'null':
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
            lng = search_results[0]['longitude']
            lat = search_results[0]['latitude']

    # print('\n', 'Search Results \n', search_results,
    #       '\n length \n', len(search_results), '\n')

    # return {'test': 1.264}
    return jsonify({"searchResults": search_results, "searchCenter": {"longitude": lng, "latitude": lat}})


@search_routes.route('/popular')
def popular():
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
        del d['reviews']
        return d

    search_results = Bar.query.join(Review).join(Image).group_by(
        Bar.id).order_by(db.func.count(Review.id).desc()).limit(5).all()
    winery = Bar.query.join(Review).join(
        Image).filter(Bar.name.ilike("%wine%")).all()
    winery = winery[0:5]
    brewery = Bar.query.join(Review).join(
        Image).filter(Bar.name.ilike("%brew%")).all()
    brewery = brewery[0:5]
    search_results = list(map(parse_results, search_results))
    winery_results = list(map(parse_results, winery))
    brewery_results = list(map(parse_results, brewery))
    return jsonify({"mostPopular": search_results, "winery": winery_results, "brewery": brewery_results})
