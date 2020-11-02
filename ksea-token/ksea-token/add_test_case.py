from db import db, User

db.create_all()

users = [
    User(uid=1, name="Jisu Han", email="gkswltn97@berkeley.edu", num_points=10, curr_sem=True),
    User(uid=2, name="Brian Lee", email="cluesbjberkeley.edu", num_points=11, curr_sem=True),
    User(uid=3, name="Chris Kim", email="hhm@berkeley.edu", num_points=12, curr_sem=True),
    User(uid=4, name="Curie Park", email="curiepark@berkeley.edu", num_points=14, curr_sem=True),
    User(uid=5, name="Jamie Ha", email="jamieha99@berkeley.edu", num_points=15, curr_sem=True), 
    User(uid=6, name="Amy Kim", email="heesoo_kim@berkeley.edu", num_points=16, curr_sem=True)
]

for u in users:
    if User.query.filter(User.uid == u.uid).first() == None:
        db.session.add(u)
    else:
        print("[ERROR] User {} already exists".format(u.name))

db.session.commit()
