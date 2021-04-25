
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
