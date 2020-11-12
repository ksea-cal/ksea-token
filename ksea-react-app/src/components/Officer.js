import React, {useState, useRef} from 'react';
import {Container, Row, Button, Col, Form} from 'react-bootstrap'

function Officer(props) {


  function handleBoardChange(event) {
    setBoardValue(event.target.value);
    // console.log(boardValue);
  }

  function handleMemberChange(event) {
    setMemberValue(event.target.value);
  }

  function handleListChange(event) {
    event.preventDefault();
    setListOfMembers([...listOfMembers, memberValue])
    // console.log("memberValue: ", listOfMembers)
  }

  function handleEventChange(event) {
    eventValue = event.target.value
    // console.log("eventValue:", eventValue);
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
  }

  const [boardValue, setBoardValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [listOfMembers, setListOfMembers] = useState([]);
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
        </Form>
      </Container>
    </div>
  );
}

export default Officer;