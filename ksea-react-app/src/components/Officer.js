import React from 'react';
// import Web3 from 'web3';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import '../App.css';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Officer(props) {

  function distributeTokens() {
    
  }

  //have input section for what event it is
  //import list of array 
  return (
      <div
            className="Form"
            style={{ display: "flex", justifyContent: "center", paddingTop: 150 }}
          >
          <ButtonGroup>

              <DropdownButton as={ButtonGroup}    title="Dropdown" 
              variant="secondary"
              id="bg-nested-dropdown">
                  <Dropdown.Item eventKey="Send Dobby!">GM: 2 Dobbies</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Focus Group: 3 Dobbies</Dropdown.Item>
              </DropdownButton>
          </ButtonGroup>
      </div>
  );
}

export default Officer;
