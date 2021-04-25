import React, { useState} from 'react'
import {
  Button, 
  Input,
  Stack
} from "@chakra-ui/react"
import './Officer.css'
import axios from 'axios';
import {useToast} from "@chakra-ui/react"

export default function Createcheckin() {
  //design
  const toast = useToast()
  const toastIdRef = React.useRef()

  //Member info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const [numPoints, setNumPoints] = useState('');
  const [address, setAddress] = useState('');

  
  // Manage checkins
  function handleSubmit(event) {
    event.preventDefault();
    axios.post(`http://localhost:5000//member`, 
      {
        "name": name,
        "img": img,
        "num_points": numPoints,
        "email": email,
        "address": address
      }
    ).then(res => {
      console.log(res.data)
      if (res.data.success) {
        toastIdRef.current = toast({ description: `Member ${name} added` })
        setName('');
        setEmail('');
        setImg('');
        setNumPoints('');
        setAddress('');
      }
    })
    
  }

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target
     if (name === "name") {
      setName(value);
    } else if (name === "img") {
      setImg(value)
    } else if (name === "email") {
      //https://source.unsplash.com/random
      setEmail(value)
    } else if (name === "numPoints") {
      setNumPoints(value)
    } else if (name === "address") {
      setAddress(value)
    }
  }
      
  return (
    <Stack spacing={5} className="create-new">
      <h1>Add new member</h1>
      <Input
        name="name"
        value={name}
        onChange={handleChange} 
        placeholder="name"
      />
      <Input
        name="email"
        value={email}
        onChange={handleChange} 
        placeholder="email address"
      />
      <Input
        name="img"
        value={img}
        onChange={handleChange} 
        placeholder="img link"
      />
      <Input
        name="numPoints"
        value={numPoints}
        onChange={handleChange} 
        placeholder="current number of points"
      />
      <Input
        name="address"
        value={address}
        onChange={handleChange} 
        placeholder="metamask address"
      />
      <Button onClick={handleSubmit} colorScheme="blue">
        Add Member</Button>
    </Stack>
  )
}