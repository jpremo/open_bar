from werkzeug.security import generate_password_hash
from app.models import db, User, Bar, Image, Review
import json




# Adds a demo user, you can add other users here if you want
def seed_all():
    with open('./react-app/seed_generation/seed-data.json') as f:
        data = json.load(f)

    demo = User(username='Demo', email='demo@aa.io',
                password='password', firstName='Demo', lastName='User')

    owner = User(username='businessOwner', email='test@loc.com',
                password='fdoasnfsadfmkfa', firstName='Business', lastName='Owner')

    db.session.add(demo)
    db.session.add(owner)

    for user in data['userSeeder']:
        d = User(**user)
        db.session.add(d)

    for bar in data['businessSeeder']:
        d = Bar(**bar)
        db.session.add(d)

    for review in data['postSeeder']:
        d = Review(**review)
        db.session.add(d)

    for image in data['imageSeeder']:
        d = Image(**image)
        db.session.add(d)
    db.session.commit()
# def seed_users():

#     demo = User(username='Demo', email='demo@aa.io',
#                 password='password', firstName='Demo', lastName='User')

#     owner = User(username='businessOwner', email='test@loc.com',
#                 password='fdoasnfsadfmkfa', firstName='Business', lastName='Owner')

#     db.session.add(demo)
#     db.session.add(owner)

#     db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_all():
    db.session.execute('TRUNCATE users;')
    db.session.execute('TRUNCATE bars;')
    db.session.execute('TRUNCATE favorites;')
    db.session.execute('TRUNCATE images;')
    db.session.execute('TRUNCATE reviews;')
    db.session.execute('TRUNCATE reservation;')
    db.session.commit()
