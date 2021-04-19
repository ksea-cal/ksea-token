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
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(20), nullable=False)
  img = db.Column(db.String(200))
  point = db.Column(db.String(10))
  rank = db.Column(db.String(10))
  address = db.Column(db.String(100))
  #events = db.relationship('Event', backref='user')

  def __init__(self, name, img, point, rank, address):
    self.name = name
    self.img = img
    self.point = point
    self.rank = rank
    self.address = address
    #self.events = events


# class Event(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   name = db.Column(db.String(50), nullable=False)
#   secretKey = db.Column(db.String(50))
#   dueDate = db.Column(db.String(50))
#   completed = db.Column(db.String(10))
#   details = db.Column(db.String(200))
#   user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

#   def __init__(self, name, secretKey, dueDate, completed, details, user_id):
#     self.name = name
#     self.secretKey = secretKey
#     self.dueDate = dueDate
#     self.completed = completed
#     self.details = details
#     self.user_id = user_id

# Create a User
@app.route('/api/user', methods=['POST'])
def add_user():
  name = request.json['name']
  img = request.json['img']
  point = request.json['point']
  rank = request.json['rank']
  address = request.json['address']

  new_user = User(name, img, point, rank, address)

  db.session.add(new_user)
  db.session.commit()

  return jsonify(
    {
        "id": new_user.id,
        "name": new_user.name,
        "img": new_user.img,
        "point": new_user.point,
        "rank": new_user.rank,
        "address": new_user.address
    }
  )

# Create all Users
@app.route('/api/users', methods=['POST'])
def add_users():
  users = request.json
  for user in users:
    name = user['name']
    img = user['img']
    point = user['point']
    rank = user['rank']
    assert type(address) == str
    address = user['address'].lower()

    new_user = User(name, img, point, rank, address)

    db.session.add(new_user)
    db.session.commit()

  return jsonify({"success": True})

#Get All Users
@app.route('/api/users', methods=['GET'])
def get_users():
  all_users = User.query.all()
  return jsonify(
      [{
          "id": user.id,
          "name": user.name,
          "img": user.img,
          "point": user.point,
          "rank": user.rank,
          "address": user.address
      } for user in all_users]
  )

#Get one user
@app.route('/api/user/<address>', methods=['GET'])
def get_user(address):
  user = User.query.filter(User.address == address).first()
  return jsonify(
      {
          "id": user.id,
          "name": user.name,
          "img": user.img,
          "point": user.point,
          "rank": user.rank
      }
  )

# Update User
@app.route('/api/user/<id>', methods=['PUT'])
def update_user(id):
  user = User.query.get(id)

  name = request.json['name']
  img = request.json['img']
  point = request.json['point']
  rank = request.json['rank']
  address = request.json['address']

  user.name = name
  user.img = img
  user.point = point
  user.rank = rank
  user.address = address

  db.session.commit()

  return jsonify({"success": True})

#Delete user
@app.route('/api/user/<id>', methods=['DELETE'])
def delete_user(id):
  user = User.query.get(id)
  db.session.delete(user)
  db.session.commit()
  return jsonify({"success": True})

#Delete all users
@app.route('/api/users', methods=['DELETE'])
def delete_users():
  all_users = User.query.all()
  for user in all_users:
    db.session.delete(user)
    db.session.commit()
  return jsonify({"success": True})

if __name__ == "__main__":
  app.run(debug=True)
