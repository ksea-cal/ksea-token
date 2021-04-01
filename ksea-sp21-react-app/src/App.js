import React, {useState} from 'react';
import axios from "axios";
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import CheckIn from './components/CheckIn/CheckIn';
import Ranking from './components/Ranking';
import MyWallet from './components/Wallet/MyWallet';
import ConnectWallet from './components/Wallet/ConnectWallet';
import Auction from './components/Auction/Auction';

export default function App() {
  const [user, setUser] = useState({
    id: '',
    name: "",
    img: "",
    point: 0,
    rank: 0
  });
  const [ walletConnect, setWalletConnect ] = useState(false)
  const [ connectWalShown, setConnectWalShown ] = useState(false);

  function showConnectWal() {
    setConnectWalShown(true);
  };
  function closeConnectWal() {
    setConnectWalShown(false);
  };
  function handleWalletConnect() {
    axios.get(`http://localhost:5000/api/user/${user.id}`)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => console.error(`Error: ${err}`));
    setWalletConnect(true);
    closeConnectWal();
  }
    
  function handleChange(e) {
    setUser({...user, id:e.target.value});
  }

  return (
    <div>
      {walletConnect ?
      <Router>
        <div id="page-container">
          <div id="content-wrap">
            <Navbar />
            <div className="display-center">
              <Switch>
                <Route path="/" exact component={CheckIn}/>
                <Route path="/checkin" component={CheckIn}/>
                <Route path="/ranking"><Ranking user={user}/></Route>
                <Route path="/auction" component={Auction}/>
                <Route path="/my-wallet"><MyWallet user={user} setWalletConnect={setWalletConnect}/></Route>
              </Switch>
            </div>
          </div>
          <footer>
            This is footer section
          </footer>
        </div>
      </Router>
      :
      <div>
        <button onClick={showConnectWal}>Connect Wallet</button>
        <ConnectWallet 
          connectWalShown={connectWalShown}
        >
          <input
            type="text"
            value={user.id}
            placeholder="User Id"
            onChange={handleChange}
          />
          <button onClick={handleWalletConnect}>Connect</button>
          <button onClick={closeConnectWal}>Close</button>
        </ConnectWallet>
      </div>
      }
    </div>
  )
}