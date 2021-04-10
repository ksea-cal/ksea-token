import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({walletBtn}) {
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
              <Link to="/profile" className="navbar-item">Set Up</Link>
              {walletBtn}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}