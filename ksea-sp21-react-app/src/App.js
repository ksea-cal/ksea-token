import React, {useState, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

//import imgs
import bottom from './img/bottom.png';
import fbLogo from './img/fb-logo.png';
import igLogo from './img/ig-logo.png';
import kseaLogo from './img/ksea-logo.png';

//Import components
import Navbar from './components/Main/Navbar';
import Main from './components/Main/Main';
import CheckIn from './components/CheckIn/CheckIn';
import Ranking from './components/Rank/Ranking';
import Profile from './components/UserInfo/Profile';
import Auction from './components/Auction/Auction';
import Officer from './components/UserInfo/Officer';
import ItemDetail from './components/Auction/ItemDetail';
import AboutUs from './components/Main/AboutUs';
import UserDB from './DB/UserDB';

//blockchain related
import initOnboard from './utils/initOnboard';
import Web3 from 'web3'

export default function App() {
  // const [walletConnection, setWalletConnection] = useState(false)
  // // const [user, setUser] = useState()
  
  //blockchain related
  const [onboard, setOnboard] = useState(null);
  const [wallet, setWallet] = useState({});
  const [user, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [, setNetwork] = useState(null);

  const web3 = new Web3(wallet.provider);
  useEffect(() => {
    const ob = initOnboard({
      address: setAddress,
      network: setNetwork,
      balance: setBalance,
      wallet: (w) => {
        if (w.provider) {
          setWallet(w);
          window.localStorage.setItem('selectedWallet', w.name);
        } else {
          setWallet({});
        }
      },
    });

    setOnboard(ob);
    // console.log("Address:" + user);
  }, []);

  useEffect(() => {
    const prevWallet = window.localStorage.getItem('selectedWallet');
    if (prevWallet && onboard) {
      onboard.walletSelect(prevWallet);
    }
    // console.log("Address:" + user);
  }, [onboard]);
  
  return onboard ? (
    <div>
      <Router>
        <div id="page-container">
          <div id="content-wrap">
            <Navbar onboard={onboard} onboardState={onboard ? onboard.getState() : null}/>
            <div className="display-center">
              <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/checkin"><CheckIn onboardState={onboard ? onboard.getState() : null}/></Route>
                <Route path="/ranking"><Ranking user={user} onboardState={onboard ? onboard.getState() : null} UserDB={UserDB}/></Route>
                <Route path="/auction"><Auction user={user} onboardState={onboard ? onboard.getState() : null}/></Route>
                <Route path="/officer"><Officer user={user} onboardState={onboard ? onboard.getState() : null}/></Route>
                <Route path="/profile"><Profile user={user} onboardState={onboard ? onboard.getState() : null}/></Route>
                <Route path="/auction-item/:id" component={ItemDetail}/>
                <Route path="/about-us" component={AboutUs}/>
              </Switch>
            </div>
          </div>
          <div id="footer-section">
            <div className="logo fb-logo">
              <a href="https://www.facebook.com/kseaatcal">
                <img src={fbLogo} alt="fb logo"/>
              </a>
            </div>
            <div className="logo ig-logo">
              <a href="https://www.instagram.com/kseaatcal/">
                <img src={igLogo} alt="ig logo"/>
              </a>
            </div>
            <h1>Created & Designed by</h1>
            <div className="logo ksea-logo">
              <img src={kseaLogo} alt="ksea logo"/>
            </div>
            <img src={bottom} alt="bottom"/>
          </div>
        </div>
      </Router>
    </div>
  ): (
    <div>Loading...</div>
  )
}