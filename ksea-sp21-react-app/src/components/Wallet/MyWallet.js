import React, {useState} from 'react';
import axios from 'axios';
import './MyWallet.css';

export default function MyWallet({user, setWalletConnect}) {
  const [userEdit, setUserEdit] = useState(user);
  const [edit, setEdit] = useState(false);
  
  function handleDisconnect() {
    setWalletConnect(false)
  }

  function handleChange(e) {
    const {name, value} = e.target
    setUserEdit({...userEdit, [name]: value})
  }

  function handleEditProfile() {
    setEdit(false)
    userEdit.name && userEdit.img ?
      axios.put(`http://localhost:5000/api/user/${user.id}`, 
        {
          "name": userEdit.name,
          "point": user.point,
          "rank": user.rank,
          "img": userEdit.img
        })
      : null
      .catch(err => console.error(`Error: ${err}`));
  }

  return (  
    <div className="my-wallet">
      <div className="photo">
        <img src={user.img} alt="headshot"/>
        {edit ? 
          <input 
            type="text"
            name="img"
            value={userEdit.img}
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
            value={userEdit.name}
            placeholder="New Name"
            onChange={handleChange}
          />
          :<h5>{user.name}</h5>
        }
        <p>{user.point} points</p>
        <p>Rank #{user.rank}</p>
        <p>Copy Address</p>
        <div className="btns">
          <button onClick={handleDisconnect}>Disconnect Wallet</button>
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
  ); 
}