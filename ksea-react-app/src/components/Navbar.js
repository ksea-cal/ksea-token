import React from 'react';
// import ksea_logo from '../ksea_logo.png';
import {Navbar, Nav} from 'react-bootstrap';

function NavBar(props) {

  return (
    <Navbar bg="dark" variant="dark">
      {/* <img
        src="../ksea_logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /> */}
      <Navbar.Brand href="/">KSEA</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/auction">Auction</Nav.Link>
        <Nav.Link href="/officer">Officer</Nav.Link>
        <Nav.Link href="/checkin">Check In</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="/">{props.account}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;