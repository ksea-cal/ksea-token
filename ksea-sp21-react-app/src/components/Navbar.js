import React, {useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [ walletConnect, setWalletConnect ] = useState(false)

  function handleClick() {
    setWalletConnect(curr => !curr)
  }

  return (
    <div>
      <header className="navbar-background">
        <div className="display-center">
          <div className="navbar row-space-out">
            <div className="nav-left row-space-out">
              <Link to="/checkin" className="navbar-item">Check In</Link>
              <Link to="/ranking" className="navbar-item">Ranking</Link>
              <Link to="/auction" className="navbar-item">Auction</Link>
              <Link to="/officer" className="navbar-item">Officer</Link>
            </div>
            <div className="nav-right row-space-out">
              <Link to="/my-wallet" className="navbar-item">Set Up</Link>
              { walletConnect ?
                <button onClick={handleClick}>541s5fd1v65b2g6b</button>
                :
                <button onClick={handleClick}>Connect Wallet</button>
              }
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}