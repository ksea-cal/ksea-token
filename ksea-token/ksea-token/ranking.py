from flask import *
import ast
import time
import datetime

from app import app
from db import db, User, Checkin


@app.route("/")
def index():
    """ View the top winners of that semester """
    curr_sem_users = User.query.filter(User.curr_sem == True).all()
    curr_sem_users.sort(key=lambda x: x.num_points, reverse=True)
    return {"curr_sem_users": [c.name for c in curr_sem_users], "curr_sem_points": [c.num_points for c in curr_sem_users]}


@app.route("/viewmember", methods=["GET"])
def viewmember():
    """ View the number of points a member has """
    address = request.args.get("address")
    curr_member = User.query.filter(User.address == hex(ast.literal_eval(address))).first()
    return {"name": curr_member.name, "points": curr_member.num_points}


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
    if request.method == "POST":
        password = request.values['password']
        time_limit = int(request.values['timeLimit'])
        event_name = request.values['eventName']
        curr_checkin = Event(event_name=event_name,  password=password, time_limit=time_limit)
        db.session.add(curr_checkin)
        db.session.commit()


@app.route("/checkin", methods=["GET", "POST"])
def checkin():
    curr_status = "waiting"
    if request.method == "POST":
        curr_checkin = Event.query.order_by(Checkin.cid.desc()).first()
        if curr_checkin.time_limit + curr_checkin.current_time > datetime.datetime.utcnow:
            input_password = request.values['password']
            if input_password == curr_checkin.password:
                address = int(request.values['address'])
                awardee = User.query.filter(User.address == hex(address)).first()
                curr_checkin = Checkin(event=curr_checkin.eid, user=awardee.uid)
                db.session.add(curr_checkin)
                db.session.commit()
                curr_status = "success"
            else:
                curr_status = "wrong_password"
        else:
            curr_status = "overtime"
    else:
        return {"curr_status": curr_status}


@app.route("/auction", methods=["POST", "GET"])
def auction():
    if request.method == "POST":
        event_name = request.form['eventName']
        name = request.form['members']
        points = int(request.form['points'])
        awardee = User.query.filter(User.name == name).first()
        awardee.num_points += points
        db.session.commit()
        return index()
    else:
        return render_template("award.html")


if __name__ == "__main__":
    app.run(debug=True)
