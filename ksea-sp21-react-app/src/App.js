import React, {useState} from 'react';
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

export default function App() {
  const [walletConnect, setWalletConnect] = useState(false)
  const [user, setUser] = useState()

  const currUser = UserDB.filter(person => {
    return person.id === 2 ?
      person : undefined
  })[0]

  function handleClick() {
    const newUser = walletConnect ?
      undefined : currUser
    setUser(newUser)
    setWalletConnect(curr => !curr)
  }

  const walletBtn = walletConnect ?
    <button onClick={handleClick}>Disconnect Wallet</button>
    :
    <button onClick={handleClick}>Connect Wallet</button>
  

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