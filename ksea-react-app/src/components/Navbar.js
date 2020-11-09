import React from 'react';
// import ksea_logo from '../ksea_logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar() {

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
      </Nav>
    </Navbar>
  );
}

export default NavBar;