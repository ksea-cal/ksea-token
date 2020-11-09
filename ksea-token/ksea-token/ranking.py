import datetime
from flask import *
from web3 import Web3

from app import app
from db import db, User

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


@app.route("/award", methods=["GET", "POST"])
def award():
    """ Award points to members """ 
    if request.method == "POST":
        name = request.form['name']
        points = int(request.form['points'])
        awardee = User.query.filter(User.name == name).first() 
        awardee.num_points += points
        db.session.commit()
        return index()
    else: 
        return render_template("award.html")


@app.route("/auction", methods=["POST", "GET"])
def auction(): 
    if request.method == "POST":
        name = request.form['name']
        points = int(request.form['points'])
        awardee = User.query.filter(User.name == name).first() 
        awardee.num_points += points
        db.session.commit()
        return index()
    else: 
        return render_template("award.html")


if __name__ == "__main__":
    app.run(debug=True)
