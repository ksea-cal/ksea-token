import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({onboard, onboardState}) {

  let address = onboardState.address;

  async function readyToTransact() {
    if (!onboardState.address) {
      const walletSelected = await onboard.walletSelect();
      if (!walletSelected) return false;
    }

    const ready = await onboard.walletCheck();
    return ready;
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
              <Link to="/profile" className="navbar-item">Profile</Link>
            {!onboardState.address && (
              <button onClick={() => readyToTransact()}>Connect Wallet</button>
            )}
            
            {onboardState.address && (
              <button>{`${address?.substr(0, 6)}...${address?.substr(address.length - 4)}`}</button>
            )}  
            </div>
          </div>
        </div>
      </header> 
    </div>
  )
}