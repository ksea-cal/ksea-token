import React, {useState} from 'react';
import './Profile.css';

export default function Profile({user}) {
  const [edit, setEdit] = useState(false);

  function handleChange(e) {
    const {name, value} = e.target
    //setMyUser({...myUser, [name]: value})
  }

  return (
    <div>
      {user === undefined ?
        <h2>Please connect your wallet</h2>
        :
        <div className="profile">
          <div className="photo">
            <img src={user.img} alt="headshot"/>
            {edit ? 
              <input 
                type="text"
                name="img"
                value={user.img}
                placeholder="New Img Url"
                onChange={handleChange}
              />
              : null
            }
          </div>
          <div className="info">
            {edit?
              <input 
                type="text"
                name="name"
                value={user.name}
                placeholder="New Name"
                onChange={handleChange}
              />
              :<h5>{user.name}</h5>
            }
            <p>{user.point} points</p>
            <p>Rank #{user.rank}</p>
            <p>Copy Address</p>
            <div className="btns">
              {edit?
                <button onClick={() => setEdit(false)}>
                    Finish Edit
                </button>
                : <button onClick={() => setEdit(true)}>
                    Edit Profile
                  </button>
              }
            </div>
          </div>
        </div>
      }
    </div>
  ); 
}