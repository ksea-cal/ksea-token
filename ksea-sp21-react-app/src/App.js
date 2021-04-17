import React, {useState, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

//Import components
import Navbar from './components/Main/Navbar';
import Main from './components/Main/Main';
import CheckIn from './components/CheckIn/CheckIn';
import Ranking from './components/Rank/Ranking';
import Profile from './components/UserInfo/Profile';
import Auction from './components/Auction/Auction';
import Officer from './components/UserInfo/Officer';
import ItemDetail from './components/Auction/ItemDetail';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Main/Footer';
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
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  ): (
    <div>Loading...</div>
  )
}