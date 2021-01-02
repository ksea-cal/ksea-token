import flask
import datetime
from flask_sqlalchemy import SQLAlchemy
from app import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/ksea-token9.db'
db = SQLAlchemy(app)

class User(db.Model):
    # Common User Controls
    uid = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(128), index=True)
    email = db.Column(db.Text)
    address = db.Column(db.Text, unique=True)

    # Application specific 
    num_points = db.Column(db.Integer)
    curr_sem = db.Column(db.Boolean)

    def __repr__(self):
        return '<User {}>'.format(self.name)


<<<<<<< HEAD
class Event(db.Model):
    eid = db.Column(db.Integer, primary_key=True)
=======
class Checkin(db.Model):
    cid = db.Column(db.Integer, primary_key=True)
>>>>>>> master
    event_name = db.Column(db.Text)
    current_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    password = db.Column(db.Text)
    time_limit = db.Column(db.Integer)

    def __repr__(self):
<<<<<<< HEAD
        return '<Event {}>'.format(self.event_name)


class Checkin(db.Model):
    cid = db.Column(db.Integer, primary_key=True)
    event = db.Column(db.Integer) # Link to Event Table
    user = db.Column(db.Integer) # Link to User Table
    current_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return '<Checkin {} for {}>'.format(self.cid, self.user)
=======
        return '<Checkin {}>'.format(self.event_name)
>>>>>>> master
