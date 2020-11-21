from flask import *
from web3 import Web3
import ast
import time

from app import app
from db import db, User, Checkin


CURR_CID = 0 


@app.route("/")
def index():
    """ View the top winners of that semester """ 
    curr_sem_users = User.query.filter(User.curr_sem == True).all() 
    curr_sem_users.sort(key=lambda x: x.num_points, reverse=True)
    return {"curr_sem_users": [c.name for c in curr_sem_users]} 


@app.route("/viewmember", methods=["GET"])
def viewmember(): 
    """ View the number of points a member has """ 
    address = request.args.get("address")
    curr_member = User.query.filter(User.address == address).first() 
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
            else: 
                print(awardee)
            awardee.num_points += points
        db.session.commit()


@app.route("/createcheckin", methods=["POST"])
def create_check_in():
    """ Award points to members """ 
    if request.method == "POST":
        password = request.values['password']
        time_limit = int(request.values['timeLimit'])
        event_name = request.values['eventName']
        curr_checkin = Checkin(event_name=event_name,  password=password, time_limit=time_limit)
        db.session.add(curr_checkin)
        db.session.commit()


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
