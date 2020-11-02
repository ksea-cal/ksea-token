import datetime

from flask import *
from app import app
from db import User


@app.route("/")
def index():
    """ View the top winners of that semester """ 
    curr_sem_users = User.query.filter(User.curr_sem == True).all() 
    curr_sem_users.sort(key=x.num_points)
    return render_template("index.html", curr_users=curr_sem_users)

if __name__ == "__main__":
    app.run(debug=True)
