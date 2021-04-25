from db import db, User

db.create_all()

users = [
    User(
      uid=1, 
      name="Jisu Han", 
      email="gkswltn97@berkeley.edu", 
      num_points=10, 
      img="https://source.unsplash.com/random", 
      address="0", 
      curr_sem=True,
      rank=0),
    User(
      uid=2, 
      name="Brian Lee", 
      email="cluesbjberkeley.edu", 
      num_points=11,
      img="https://source.unsplash.com/random",
      address="0xce337c810b9ea86975a765b6b7f9ade6263ce936", 
      curr_sem=True,
      rank=0),
    User(
      uid=3, 
      name="Chris Kim", 
      email="hhm@berkeley.edu", 
      num_points=12,
      img="https://source.unsplash.com/random",
      address="1", 
      curr_sem=True,
      rank=0),
    User(
      uid=4, 
      name="Curie Park", 
      email="curiepark@berkeley.edu", 
      num_points=14,
      img="https://source.unsplash.com/random",
      address="2", 
      curr_sem=True,
      rank=0),
    User(
      uid=5, 
      name="Jamie Ha", 
      email="jamieha99@berkeley.edu", 
      num_points=15,
      img="https://source.unsplash.com/random",
      address="3", 
      curr_sem=True,
      rank=0),
    User(
      uid=6, 
      name="Amy Kim", 
      email="heesoo_kim@berkeley.edu", 
      num_points=16,
      img="https://source.unsplash.com/random",
      address="4", 
      curr_sem=True,
      rank=0)
]

for u in users:
    if User.query.filter(User.uid == u.uid).first() == None:
        db.session.add(u)
    else:
        print("[ERROR] User {} already exists".format(u.name))

db.session.commit()
