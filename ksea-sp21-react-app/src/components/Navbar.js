import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  

  return (
    <div>
      <header className="navbar-background">
        <div className="display-center">
          <div className="navbar row-space-out">
            <div className="nav-left row-space-out">
              <Link to="/checkin" className="navbar-item">Check In</Link>
              <Link to="/ranking" className="navbar-item">Ranking</Link>
              <Link to="/auction" className="navbar-item">Auction</Link>
              <Link to="/trade" className="navbar-item">Trade</Link>
            </div>
            <div className="nav-right row-space-out">
              <Link to="/offier" className="navbar-item">Officer</Link>
              <Link to="/my-wallet"><button>My Wallet</button></Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}