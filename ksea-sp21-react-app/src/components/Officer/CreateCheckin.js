import React, { useState} from 'react'
import {
  Button, 
  Input,
  Stack,
  InputRightAddon,
  InputGroup
} from "@chakra-ui/react"
import './Officer.css'
import axios from 'axios';
import {useToast} from "@chakra-ui/react"

export default function Createcheckin() {
  //design
  const toast = useToast()
  const toastIdRef = React.useRef()

  // New checkin event info
  const [name, setName] = useState('');
  const [timelimit, setTimelimit] = useState('');
  const [password, setPassword] = useState('');

  
  // Manage checkins
  function handleSubmit(event) {
    event.preventDefault();
    axios.post(`http://localhost:5000//createcheckin`, 
      {
        "password": password,
        "timeLimit": timelimit,
        "eventName": name
      }
    )
    toastIdRef.current = toast({ description: `${name} created` })
    setName('');
    setTimelimit('')
    setPassword('');
  }

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target
    if (name === "name") {
      setName(value);
    } else if (name === "timelimit") {
      setTimelimit(value)
    } else {
      setPassword(value);
    }
  }
      
  return (
    <Stack spacing={5} className="create-new">
      <h1>Event Name:</h1>
      <Input
        value={name}
        onChange={handleChange} 
        name="name" 
        placeholder="name"
      />
      <h1>Event Password:</h1>
      <Input
        value={password}
        onChange={handleChange} 
        name="password" 
        placeholder="password"
      />
      <h1>Event Time Limit:</h1>
      <InputGroup>
        <Input
          type="number"
          value={timelimit}
          onChange={handleChange} 
          name="timelimit" 
          placeholder="time limit"
        />
        <InputRightAddon children="min" />
      </InputGroup>
      <Button 
        onClick={handleSubmit} 
        colorScheme="green">
        Create Event
      </Button>
    </Stack>
  )
}