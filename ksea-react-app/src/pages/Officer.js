import React, {useState, useRef} from 'react';
import {Container, Row, Button, Col, Form} from 'react-bootstrap'

const axios = require('axios').default;


function Officer(props) {

  function handleBoardChange(event) {
    setBoardValue(event.target.value);
  }

  function handleMemberChange(event) {
    setMemberValue(event.target.value);
  }

  function handleListChange(event) {
    event.preventDefault();
    setListOfMembers([...listOfMembers, memberValue])
  }

  function handleEventChange(event) {
    eventValue = event.target.value
  }

  function handleRegister(event) {
    event.preventDefault();
    props.registerBoardMem(boardValue)
  }

  function handleDeregister(event) {
    event.preventDefault();
    props.deregisterBoardMem(boardValue)
  }

  function handleDistribute(event) {
    event.preventDefault();
    props.distributeTokens(listOfMembers, eventValue);

    let formData = new FormData();
    formData.append('members', listOfMembers); 
    formData.append('points', eventValue); 
    axios.post("http://127.0.0.1:5000/award", formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
  }

  function handlePassword(event) { 
    setPassword(event.target.value);
  }

  function handleTimeLimit(event) { 
    setTimeLimit(event.target.value);
  }

  function handleEventName(event) { 
    setEventName(event.target.value);
  }

  // Push Check-in information to the database 
  function handleCheckIn(event) { 
    let formData = new FormData();
    formData.append('password', password); 
    formData.append('timeLimit', timeLimit); 
    formData.append('eventName', eventName); 
    axios.post("http://127.0.0.1:5000/createcheckin", formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });

  }

  //Auction Handlers
  function handleEntryFee(event) {
    setEntryFee(event.target.value);
  }

  function handleItemChange(event) {
    setItemValue(event.target.value);
  }
  function handleTimeChange(event) {
    setTimeValue(event.target.value); 
  }

  function handleCreate(event) {
    event.preventDefault();
    console.log("dobby address: ", props.dobby._address);
    props.createAuction(itemValue, entryFee, timeValue, props.dobby._address);
  }

  const [boardValue, setBoardValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [timeValue, setTimeValue] = useState(0);
  const [itemValue, setItemValue] = useState('');
  const [entryFee, setEntryFee] = useState(0);
  const [listOfMembers, setListOfMembers] = useState([]);
  const [password, setPassword] = useState('');
  const [eventName, setEventName] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);

  let eventValue = useRef(0);

  return (
    <div className="officer">
      <br/><br/>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Register Board Member</Form.Label>
                <Form.Control type="text" onChange={handleBoardChange} placeholder="Board Member Address" />
              </Form.Group>
              <Button onClick={handleRegister} variant="primary" type="submit">
                Register
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Deregister Board Member</Form.Label>
                <Form.Control type="text" onChange={handleBoardChange} placeholder="Board Member Address" /> 
              </Form.Group>
              <Button onClick={handleDeregister}  variant="primary" type="submit">
                Deregister
              </Button>
            </Col>          
          </Row>
          <br/><br/>

          <Form.Group>
            <Form.Label>Loyal Dobbies!</Form.Label>
            <Form.Control onChange={handleMemberChange} type="list" placeholder="list of Dobbies" />
            <Button onClick={handleListChange}  variant="primary" type="submit">
              Add Member
            </Button>
          </Form.Group>

          <ul>
            {listOfMembers.map((member, key) => {
              return(
                <li key={key}>{member}</li>
              )
            })}
          </ul>

          <Form.Group>
          <Form.Label>Type of Event</Form.Label>
            <Form.Control onChange={handleEventChange} as="select" size="sm" custom>
              <option value="0">Choose Event</option>
              <option value="2">GM: 2 Dobbies</option>
              <option value="3">Focus Group: 3 Dobbies</option>
              <option value="1">KSEA Chat: 1 Dobby</option>
              <option value="4">Lead Focus Group: 4 Dobbies</option>
              <option value="1">Small Group: 1 Dobby</option>
              <option value="1">Social: 1 Dobby</option>
              <option value="1">Workshop: 1 Dobby</option>
              <option value="1">Review: 1 Dobby</option>
            </Form.Control>
          </Form.Group>
          <Button onClick={handleDistribute} variant="primary" type="submit">
            Send Dobbies!
          </Button>
          <br /> <br />
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>Auction Item</Form.Label>
                <Form.Control onChange={handleItemChange} type="string" placeholder="Item Name" />
              </Col>
              <Col>
                <Form.Label>Entering Fee</Form.Label>
                <Form.Control onChange={handleEntryFee} type="string" placeholder="Entering Fee in Dobby" />
              </Col>
              <Col>
                <Form.Label>Auction Time Limit</Form.Label>
                <Form.Control onChange={handleTimeChange} type="number" placeholder="Time in seconds" />
              </Col>
                <Button onClick={handleCreate}  variant="primary" type="submit">
                  Create Auction
                </Button>
            </Row>
          </Form.Group>
          
          
          <br></br>
          <Form.Group>
            <Form.Label>Create Check-In</Form.Label>
            <Form.Control type="text" onChange={handleEventName} placeholder="Event Name" /> 
            <Form.Control type="text" onChange={handlePassword} placeholder="Password" /> 
            <Form.Control type="int" onChange={handleTimeLimit} placeholder="0"/> 
          </Form.Group>
          <Button onClick={handleCheckIn}  variant="primary" type="submit">
            Create Check-In
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Officer;
