from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db = SQLAlchemy(app)

class User(db.Model):
  uid = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(20), nullable=False)
  img = db.Column(db.String(200))
  point = db.Column(db.String(10))
  rank = db.Column(db.String(10))
  address = db.Column(db.String(100))

  def __init__(self, name, img, point, rank, address):
    self.name = name
    self.img = img
    self.point = point
    self.rank = rank
    self.address = address


class Event(db.Model):
  eid = db.Column(db.Integer, primary_key=True)
  event_name = db.Column(db.Text)
  current_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  password = db.Column(db.Text)
  time_limit = db.Column(db.Integer)

  def __repr__(self):
      return '<Event {}>'.format(self.event_name)


class Checkin(db.Model):
  cid = db.Column(db.Integer, primary_key=True)
  event = db.Column(db.Integer)  # Link to Event Table
  user = db.Column(db.Integer)  # Link to User Table
  current_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  def __repr__(self):
      return '<Checkin {} for {}>'.format(self.cid, self.user)


class Auction(db.Model):
  aid = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(20), nullable=False)
  img = db.Column(db.String(200))
  contractAddr = db.Column(db.String(50))
  duration = db.Column(db.Integer)

  def __init__(self, name, img, point, rank, address):
    self.name = name
    self.img = img
    self.point = point
    self.rank = rank
    self.address = address

if __name__ == "__main__":
  app.run(debug=True)
