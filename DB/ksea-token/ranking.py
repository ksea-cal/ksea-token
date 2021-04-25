from flask import *
import datetime
import ast

from app import app
from db import db, User, Checkin, Event, Auction


@app.route("/")
def index():
    """ View the top winners of that semester """
    curr_sem_users = User.query.filter(User.curr_sem == True).all()
    curr_sem_users.sort(key=lambda x: x.num_points, reverse=True)
    return {"curr_sem_users": [c.name for c in curr_sem_users], "curr_sem_points": [c.num_points for c in curr_sem_users]}


@app.route("/members", methods=["GET"])
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


@app.route("/member", methods=["GET", "POST", "PUT", "DELETE"])
def member():
  if request.method == "GET":
    """ View the number of points a member has """
    address = request.args.get("address")
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
    uid = request.json['uid']
    name = request.json['name']
    img = request.json['img']
    num_points = request.json['num_points']
    email = request.json['email']
    address = request.json['address'].lower()
    assert type(address) == str

    new_member = User(
          uid=uid,
          name=name,
          email=email,
          num_points=num_points,
          img=img,
          address=address,
          curr_sem=True,
          rank=0)

    db.session.add(new_member)
    db.session.commit()
    return jsonify({"success": True})

  elif request.method == "PUT":
    # Edit member info
    address = request.args.get("address").lower()
    curr_member = User.query.filter(User.address == address).first()

    name = request.json['name']
    email = request.json['email']
    curr_member.name = name
    curr_member.email = email

    db.session.commit()
    return jsonify({"success": True})

  elif request.method == "DELETE":
    return jsonify({"success": True})


@app.route("/award", methods=["POST"])
def award():
    """ Award points to members """ 
    if request.method == "POST":
        members = request.values['members']
        members = ast.literal_eval("[" + members + "]")
        points = int(request.values['points'])
        for address in members:
            awardee = User.query.filter(User.address == hex(address)).first()
            if not awardee:
                raise Exception("[ERROR] No Awardee {}".format(address))
            awardee.num_points += points
        db.session.commit()


@app.route("/awardevent", methods=["POST"])
def award_event():
    """ Award points to members """ 
    if request.method == "POST":
        event = request.values['event']
        event_to_award = Event.query.filter(Event.event_name == event)
        members = Checkin.query.filter(Checkin.event == event_to_award.eid).all() 
        awardees = [m.user for m in members]
        awardee_names = [User.query.filter(User.uid == an).first().name for an in awardees]
        for u in awardees: 
            awardee = User.query.filter(User.uid == u).first() 
            if not awardee: 
                raise Exception("[ERROR] No Awardee {}".format(address))
            awardee.num_points += points
        db.session.commit()
        return {"awardees": awardee_names}


@app.route("/createcheckin", methods=["POST"])
def create_checkin():
  """ Create a Checkin Event with Password """ 
  password = request.json['password']
  time_limit = int(request.json['timeLimit'])
  event_name = request.json['eventName']
  curr_checkin = Event(event_name=event_name, password=password, time_limit=time_limit)
  db.session.add(curr_checkin)
  db.session.commit()
  return jsonify({"success": True})


@app.route("/checkin", methods=["GET", "POST", "DELETE"])
def checkin():
  curr_status = "waiting"
  if request.method == "POST":
    eventId = request.values['eventId']
    curr_checkin = Event.query.filter(Event.eid == eventId).first()
    due_date = curr_checkin.current_time + datetime.timedelta(minutes=5)
    if curr_checkin.current_time < datetime.datetime.utcnow():
      input_password = request.values['password']
      if input_password == curr_checkin.password:
        address = request.values['address']
        awardee = User.query.filter(User.address == address).first()
        curr_checkin = Checkin(event=curr_checkin.eid, user=awardee.address)
        db.session.add(curr_checkin)
        db.session.commit()
        curr_status = "success"
        return jsonify({"curr_status": curr_status})
      else:
        curr_status = "wrong_password"
        return jsonify({
          "curr_status": curr_status,
          "password": input_password,
          "correctpw": curr_checkin.password
          })
    else:
      curr_status = "overtime"
      return jsonify({"curr_status": curr_status})

  elif request.method == "GET":
    address = request.args.get("address")

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

    return jsonify( {
      'completed':  [{
            'eid': e.eid,
            'timeLimit': e.time_limit,
            'eventName': e.event_name,
            'dueDate': e.current_time
        } for e in completed_events],

      'missed':  [{
          'eid': e.eid,
          'timeLimit': e.time_limit,
          'eventName': e.event_name,
          'dueDate': e.current_time
      } for e in missed_events],

      'upcoming':  [{
          'eid': e.eid,
          'timeLimit': e.time_limit,
          'eventName': e.event_name,
          'dueDate': e.current_time
      } for e in upcoming_events]
      
    })
        
  else:
    all_checkins = Checkin.query.all()
    for checkin in all_checkins:
      db.session.delete(checkin)
      db.session.commit()
      return jsonify({"curr_status": "all deleted"})


@app.route("/event", methods=["POST", "GET"])
def event(): 
  if request.method == "POST":
    event_name = request.form['eventName']
    name = request.form['members']
    points = int(request.form['points'])
    awardee = User.query.filter(User.name == name).first()
    awardee.num_points += points
    db.session.commit()
    return index()
  else:
    awardee = User.query.filter(User.name == name).first() 
    awardee.num_points += points
    db.session.commit()
    return index()


# Auction
@app.route("/auction", methods=["POST", "GET", "DELETE"])
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
    all_auctions = Auction.query.all()
    return jsonify(
      [{
          "aid": a.aid,
          "name": a.name,
          "img": a.img,
          "contractAddr": a.contractAddr,
          "duration": a.duration,
      } for a in all_auctions]
    )

  else:
    pass


if __name__ == "__main__":
    app.run(debug=True)
