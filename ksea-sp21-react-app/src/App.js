import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import CheckIn from './components/CheckIn/CheckIn';
import Ranking from './components/Rank/Ranking';
import Profile from './components/Wallet/Profile';
import Auction from './components/Auction/Auction';
import Officer from './components/Officer';
import ItemDetail from './components/Auction/ItemDetail';
import UserDB from './DB/UserDB';

//blockchain related
import initOnboard from './utils/initOnboard';
import Web3 from 'web3'

export default function App() {
  const [walletConnection, setWalletConnection] = useState(false)
  const [user, setUser] = useState()

  //blockchain related
  const [onboard, setOnboard] = useState(null);
  const [wallet, setWallet] = useState({});
  const [address, setAddress] = useState(null);
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

    let user = window.localStorage.getItem('user');
    let walletConnection = window.localStorage.getItem('walletConnection');
    setUser(user);
    setWalletConnection(walletConnection);
  }, []);

  useEffect(() => {
    const prevWallet = window.localStorage.getItem('selectedWallet');
    if (prevWallet && onboard) {
      onboard.walletSelect(prevWallet);
    }
  }, [onboard]);

  async function walletConnect() {
    let newUser;
    let state;
    if (!walletConnection) {
      await onboard.walletSelect();
      await onboard.walletCheck();
      state = await onboard.getState();
      newUser = state.address;
    } else {
      await onboard.walletReset();
      state = await onboard.getState();
      newUser = undefined;
    }
    console.log(state);
    window.localStorage.setItem('user', newUser);
    if (walletConnection) {
      window.localStorage.setItem('walletConnection', !walletConnection);
    } else {
      window.localStorage.setItem('walletConnection', walletConnection);
    }
    
    setUser(newUser)
    setWalletConnection(curr => !curr)
  }

  const walletBtn = walletConnection ?
    <button onClick={walletConnect}>Disconnect Wallet</button>
    :
    <button onClick={walletConnect}>Connect Wallet</button>
  

  return (
    <div>
      <Router>
        <div id="page-container">
          <div id="content-wrap">
            <Navbar walletBtn={walletBtn}/>
            <div className="display-center">
              <Switch>
                <Route path="/" exact><CheckIn user={user}/></Route>
                <Route path="/checkin"><CheckIn user={user}/></Route>
                <Route path="/ranking"><Ranking user={user} UserDB={UserDB}/></Route>
                <Route path="/auction"><Auction user={user}/></Route>
                <Route path="/officer"><Officer user={user}/></Route>
                <Route path="/profile"><Profile user={user}/></Route>
                <Route path="/auction-item/:id" component={ItemDetail}/>
              </Switch>
            </div>
          </div>
          <footer>
            This is footer section
          </footer>
        </div>
      </Router>
    </div>
  )
}