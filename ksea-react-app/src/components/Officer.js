import React, {useState} from 'react';
// import Web3 from 'web3';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import '../App.css';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Officer(props) {

  function handleBoardChange(event) {
    setBoardValue(event.target.boardValue);
  }

  function handleMemberChange(event) {
    setMemberValue(event.target.memberValue);
  }

  function handleRegister(event) {
    event.preventDefault();
    props.registerBoardMem(boardValue)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    props.distributeTokens(memberValue, amount)
  }



  const [boardValue, setBoardValue] = useState('');
  const [memberValue, setMemberValue] = useState('');

  //have input section for what event it is
  //import list of array 
  return (
    
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Register Board Member</Form.Label>
        <Form.Control type="string" placeholder="Board Member Address" />
      </Form.Group>
      <Button onClick={handleRegister} variant="primary" type="submit">
        Register
      </Button>

      <br/><br/>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Loyal Dobbies!</Form.Label>
        <Form.Control type="list" placeholder="list of Dobbies" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
      <Form.Label>Type of Event</Form.Label>
        <Form.Control as="select" size="sm" custom>
          <option>GM: 2 Dobbies</option>
          <option>Focus Group: 3 Dobbies</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
      <Button onClick={handleSubmit} variant="primary" type="submit">
        Send Dobbies!
      </Button>
    </Form>
      // <div
      //       className="Form"
      //       style={{ display: "flex", justifyContent: "center", paddingTop: 150 }}
      //     >
      //     <ButtonGroup>
      //         <Button>Send Dobby!</Button>

      //         <DropdownButton as={ButtonGroup}    title="Dropdown" 
      //         variant="secondary"
      //         id="bg-nested-dropdown">
      //             <Dropdown.Item eventKey="Send Dobby!">GM: 2 Dobbies</Dropdown.Item>
      //             <Dropdown.Item eventKey="2">Focus Group: 3 Dobbies</Dropdown.Item>
      //         </DropdownButton>
      //     </ButtonGroup>
      // </div>
  );
}

export default Officer;