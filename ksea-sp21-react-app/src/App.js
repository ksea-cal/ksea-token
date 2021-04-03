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
import Ranking from './components/Rank/Ranking';
import MyWallet from './components/Wallet/MyWallet';
import Auction from './components/Auction/Auction';
import Officer from './components/Officer';

export default function App() {
  return (
    <div>
      <Router>
        <div id="page-container">
          <div id="content-wrap">
            <Navbar />
            <div className="display-center">
              <Switch>
                <Route path="/" exact component={CheckIn}/>
                <Route path="/checkin" component={CheckIn}/>
                <Route path="/ranking" component={Ranking}/>
                <Route path="/auction" component={Auction}/>
                <Route path="/officer" component={Officer}/>
                <Route path="/my-wallet" component={MyWallet}/>
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