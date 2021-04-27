from flask import *
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://balfbvtwupxojw:d449ae74b817736cb8ee1fdf5b66472a6fc2f0b9e2032c7d62be131990d5dd81@ec2-3-234-85-177.compute-1.amazonaws.com:5432/d863eo8ugd26jd'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db = SQLAlchemy(app)


class User(db.Model):
  # Common User Controls
  uid = db.Column(db.Integer, primary_key=True, unique=True)
  name = db.Column(db.String(128), index=True)
  email = db.Column(db.Text)
  address = db.Column(db.Text, unique=True)
  img = db.Column(db.Text)
  rank = db.Column(db.Integer)

  # Application specific
  num_points = db.Column(db.Integer)
  curr_sem = db.Column(db.Boolean)

  def __repr__(self):
      return '<User {}>'.format(self.name)


class Event(db.Model):
  eid = db.Column(db.Integer, primary_key=True)
  event_name = db.Column(db.Text)
  current_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  password = db.Column(db.Text)
  time_limit = db.Column(db.Integer)
  point_amount = db.Column(db.Integer)
  event_details = db.Column(db.Text)

  def __repr__(self):
      return '<Event {}>'.format(self.event_name)


class Checkin(db.Model):
  cid = db.Column(db.Integer, primary_key=True)
  event = db.Column(db.Integer)  # Link to Event Table
  user = db.Column(db.Text)  # Link to User Table
  current_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  def __repr__(self):
      return '<Checkin {} for {}>'.format(self.cid, self.user)


class Auction(db.Model):
  aid = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  img = db.Column(db.Text)
  contractAddr = db.Column(db.Text)
  duration = db.Column(db.Integer)
  highestBid = db.Column(db.Integer)
  highestBidder = db.Column(db.Text)

  def __repr__(self):
      return '<Auction {} for {}>'.format(self.aid, self.name)


class AuctionBid(db.Model):
  mid = db.Column(db.Integer, primary_key=True)
  myBid = db.Column(db.Integer)
  auction = db.Column(db.Integer)  # Link to Auction Table
  user = db.Column(db.Text)  # Link to User Table

  def __repr__(self):
    return '<MyAuctionBid {} for {}>'.format(self.mid, self.myBid)



@app.route("/")
def index():
  return {"status": "successfully running"}
  

@app.route("/members", methods=["GET", "DELETE"])
def all_members():
  if request.method == "GET":
    all_members = User.query.all()
    return jsonify(
        [{
            "uid": member.uid,
            "name": member.name,
            "email": member.email,
            "address": member.address,
            "img": member.img,
            "num_points": member.num_points,
            "curr_sem": member.curr_sem,
            "rank": member.rank
        } for member in all_members]
    )

  else:
    all_members = User.query.all()
    for member in all_members:
      db.session.delete(member)
      db.session.commit()
    return jsonify({"success": True})


@app.route("/member", methods=["GET", "POST", "PUT", "DELETE"])
def member():
  if request.method == "GET":
    """ View the number of points a member has """
    address = request.args.get("address").lower()
    curr_member = User.query.filter(User.address == address).first()
    return {
        "name": curr_member.name,
        "email": curr_member.email,
        "address": curr_member.address,
        "img": curr_member.img,
        "num_points": curr_member.num_points,
        "curr_sem": curr_member.curr_sem,
        "rank": curr_member.rank
    }

  elif request.method == "POST":
    # Add new member
    name = request.json['name']
    img = request.json['img']
    num_points = request.json['num_points']
    email = request.json['email']
    address = request.json['address'].lower()
    assert type(address) == str

    new_member = User(
        name=name,
        email=email,
        num_points=num_points,
        img=img,
        address=address,
        curr_sem=True,
        rank=0
    )

    db.session.add(new_member)
    db.session.commit()
    return jsonify({"success": True})

  elif request.method == "PUT":
    # Edit member info
    address = request.values['address'].lower()
    curr_member = User.query.filter(User.address == address).first()

    name = request.values['name']
    email = request.values['email']
    curr_member.name = name
    curr_member.email = email

    db.session.commit()
    return jsonify({"status": "success"})

  elif request.method == "DELETE":
    # When deleting a member,
    # it should also delete checkins with that user metamask address
    address = request.args.get("address")
    curr_member = User.query.filter(User.address == address).first()
    member_checkins = Checkin.filter(Checkin.user == address)
    
    # Delete checkins
    for checkin in member_checkins:
      db.session.delete(checkin)
    db.session.delete(curr_member)
    db.session.commit()
    return jsonify({"status": '%s deleted' % curr_member.name})



@app.route("/checkedinMembers", methods=["GET"])
def checkedin_members():
  eventId = int(request.args.get("eventId"))
  all_checkedin_members = Checkin.query.filter(Checkin.event == eventId)
  member_addr_lists = [c.user for c in all_checkedin_members]
  name_lists = []
  for addr in member_addr_lists:
    member_name = User.query.filter(User.address == addr).first().name
    name_lists.append(member_name)

  return jsonify({
      'addresses': member_addr_lists,
      'names': name_lists
  })


@app.route("/checkin", methods=["GET", "POST"])
def checkin():
  if request.method == "POST":
    eventId = request.values['eventId']
    curr_event = Event.query.filter(Event.eid == eventId).first()
    input_password = request.values['password']
    if input_password == curr_event.password:
      address = request.values['address'].lower()
      awardee = User.query.filter(User.address == address).first()
      
      # return error code when the member is not found
      if awardee is None:
        return jsonify({"status": "Selected awardee is a nonetype"})
      
      # award points to member
      awardee.num_points += curr_event.point_amount
      # add new checkin to db
      new_checkin = Checkin(event=curr_event.eid, user=awardee.address)
      db.session.add(new_checkin)
      db.session.commit()
      return jsonify(
          {"status": '%s checked in for %s' %
           (awardee.name, curr_event.event_name)}
      )

    else:
      return jsonify({
          "curr_status": "wrong_password",
          "password": input_password,
          "correctpw": curr_event.password
      })

  else:
    address = request.args.get("address").lower()

    all_checkins = Checkin.query.filter(Checkin.user == address)
    completedIds = list(map(lambda c: c.event, all_checkins))
    all_events = Event.query.all()

    completed_events = []
    for comId in completedIds:
      completed_events.append(Event.query.get(comId))

    incompleted_events = []
    for event in all_events:
      if not event.eid in completedIds:
        incompleted_events.append(event)

    now = datetime.datetime.utcnow()
    missed_events = []
    upcoming_events = []
    for inevent in incompleted_events:
      limit = inevent.time_limit
      due = inevent.current_time + datetime.timedelta(minutes=limit)
      if now > due:
        missed_events.append(inevent)
      else:
        upcoming_events.append(inevent)

    return jsonify({
        'completed':  [{
            'eid': e.eid,
            'timeLimit': e.time_limit,
            'eventName': e.event_name,
            'dueDate': e.current_time,
            'pointAmount': e.point_amount,
            'eventDetails': e.event_details
        } for e in completed_events],

        'missed':  [{
            'eid': e.eid,
            'timeLimit': e.time_limit,
            'eventName': e.event_name,
            'dueDate': e.current_time,
            'pointAmount': e.point_amount,
            'eventDetails': e.event_details
        } for e in missed_events],

        'upcoming':  [{
            'eid': e.eid,
            'timeLimit': e.time_limit,
            'eventName': e.event_name,
            'dueDate': e.current_time,
            'pointAmount': e.point_amount,
            'eventDetails': e.event_details
        } for e in upcoming_events]

    })


@app.route("/checkins", methods=["GET", "DELETE"])
def view_checkins():
  if request.method =="GET":
    all_checkins = Checkin.query.all()
    return jsonify(
        [{
            "cid": c.cid,
            "event": c.event,
            "user": c.user,
            "createdTime": c.current_time,
        } for c in all_checkins]
    )

  else:
    all_checkins = Checkin.query.all()
    for checkin in all_checkins:
      db.session.delete(checkin)
      db.session.commit()
    return jsonify({"status": "All checkins deleted"})


@app.route("/event", methods=["POST", "DELETE"])
def event():
  if request.method == "POST":
    """ Create a Checkin Event with Password """
    password = request.values['password']
    time_limit = int(request.values['timeLimit'])
    event_name = request.values['eventName']
    point_amount = request.values['eventPoint']
    event_details = request.values['eventDetails']
    curr_checkin = Event(
        event_name=event_name,
        password=password,
        time_limit=time_limit,
        event_details=event_details,
        point_amount=point_amount
    )
    db.session.add(curr_checkin)
    db.session.commit()
    return jsonify({"status": "success"})

  else:
    # When deleting an event, 
    # it should also delete checkins with that event id
    eventId = int(request.args.get("eventId"))
    event_checkins = Checkin.query.filter(Checkin.event == eventId)
    
    # Delete all checkins with the event id
    for checkin in event_checkins:
      db.session.delete(checkin)

    # Delete event itself
    event = Event.query.get(eventId)
    db.session.delete(event)
    db.session.commit()
    return jsonify(
      {"status": '%s deleted and its checkins' % event.event_name}
    )



@app.route("/events", methods=["GET", "DELETE"])
def view_events():
  if request.method =="GET":
    all_events = Event.query.all()
    return jsonify(
        [{
            "eid": e.eid,
            "eventName": e.event_name,
            "createdTime": e.current_time,
            "password": e.password,
            "timeLimit": e.time_limit,
            "pointAmount": e.point_amount,
            "eventDetails": e.event_details
        } for e in all_events]
    )

  else:
    all_events = Event.query.all()
    for event in all_events:
      db.session.delete(event)
      db.session.commit()
    return jsonify({"status": "All events deleted"})


# Auction
@app.route("/auction", methods=["POST", "GET", "PUT", "DELETE"])
def auction():
  if request.method == "POST":
    name = request.values['name']
    img = request.values['img']
    contractAddr = request.values['contractAddr']
    duration = request.values['duration']

    new_auction = Auction(
        name=name,
        img=img,
        contractAddr=contractAddr,
        duration=duration
    )

    db.session.add(new_auction)
    db.session.commit()

    return jsonify({"status": "success"})

  elif request.method == "GET":
    aid = int(request.args.get("aid"))
    auction = Auction.query.get(aid)
    return jsonify({"aid": auction.aid,
                    "highestBid": auction.highestBid,
                    "highestBidder": auction.highestBidder
                  })

  elif request.method == "PUT":
    aid = int(request.values['aid'])
    highestBid = request.values['highestBid']
    highestBidder = request.values['highestBidder'].lower()

    auction = Auction.query.get(aid)
    auction.highestBid = highestBid
    curr_member = User.query.filter(User.address == highestBidder).first()
    auction.highestBidder = curr_member.name

    db.session.commit()

    return jsonify({"aid": auction.aid,
                    "highestBid": auction.highestBid,
                    "highestBidder": auction.highestBidder
                    })

  else:
    all_auctions = Auction.query.all()
    for auction in all_auctions:
      db.session.delete(auction)
      db.session.commit()
    return jsonify({"success": True})


@app.route("/auctions", methods=["GET", "DELETE"])
def view_auctions():
  if request.method == "GET":
    all_auctions = Auction.query.all()
    return jsonify(
        [{
            "aid": a.aid,
            "name": a.name,
            "img": a.img,
            "contractAddr": a.contractAddr,
            "duration": a.duration,
            "highestBid": a.highestBid,
            "highestBidder": a.highestBidder
        } for a in all_auctions]
    )

  else:
    all_auctions = Auction.query.all()
    for auction in all_auctions:
      db.session.delete(auction)
      db.session.commit()
    return jsonify({"status": "All auctions deleted"})


# once created new db
# 1.add me as a new member
# 2. updatedb.py then ranking.py(returning all variables)
# 3. testing with postman (check params or form-data)


if __name__ == '__main__':
    app.run()
