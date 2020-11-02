import flask
from flask_sqlalchemy import SQLAlchemy

from app import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/ksea-token.db'
db = SQLAlchemy(app)

class User(db.Model):
    # Common User Controls
    uid = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(128), index=True)
    email = db.Column(db.String(128), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    # Application specific 
    num_points = db.Column(db.Integer)
    curr_sem = db.Column(db.Boolean)

    def __repr__(self):
        return '<User {}>'.format(self.name)
