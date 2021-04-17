import React, {useState} from 'react';
import './Profile.css';
import {
  Button,
  Input,
  Stack
} from "@chakra-ui/react"

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const user = {
    "id": 2,
    "img": "https://source.unsplash.com/collection/1051/3",
    "name": "박하민",
    "point": 32,
    "rank": 31
  }

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
          <img src={user.img} alt="headshot"/>
          <div className="info">
            {edit ?
              <Stack spacing={5}>
                <Input 
                  type="text"
                  name="name"
                  value={user.name}
                  placeholder="New Name"
                  onChange={handleChange}
                />
                <Input 
                  type="text"
                  name="name"
                  value="xxxxx.gmail.com"
                  placeholder="Email Address"
                  onChange={handleChange}
                />
                <Button onClick={() => setEdit(false)} colorScheme="teal" variant="outline">
                  Finish Edit
                </Button>
              </Stack>
              :
              <Stack spacing={5}>
                <h5>{user.name}</h5>
                <h5>xxxxx.gmail.com</h5>
                <Button onClick={() => setEdit(true)} colorScheme="teal" variant="outline">
                  Edit Profile
                </Button>
              </Stack>
            }
          </div>
        </div>
      }
    </div>
  ); 
}