import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import loadAccount from "../components/ethereum/LoadAccount";
import kseaToken from "../components/ethereum/KSEA_Token";
import kseairdrop from "../components/ethereum/KSEAirdrop";
import factory from "../components/ethereum/AuctionFactory";
import Navbar from "../components/Navbar"
import Member from "../components/Member"
import Winner from "../components/Winner"
import Checkin from "../components/Checkin"

import Officer from "./Officer"
import Auction from "./Auction"

import '../App.css';
 

function App() {

  useEffect(() => {
    async function fetchData() {
      await loadAccount()
      await kseaToken()
      await kseairdrop()
      await factory()
    }
    fetchData();
  }, [])

  async function bid(_amount) {
    await auction.methods.bid(_amount).send({from:account});
  }

  async function withdraw() {
    await auction.methods.withdraw().send({from:account});
  }
  async function endAuction() {
    await auction.methods.auctionEnd().send({from:account});
  }

  // States
  const [account, setAccount] = useState('')
  const [currentWinner, setWinner] = useState([])
  const [currentMember, setMember] = useState("Name")
  const [currentPoints, setPoints] = useState(0)

  return (
    <body style={{backgroundColor:"#011826"}}>
    <Router>
      <div className="app" style={{backgroundColor:"#011826"}}>
        <Header
          account = {account}
        />
        <Switch>
          <Route path="/auction">
          {entryFees
            ?<Auction 
                bid = {bid}
                withdraw = {withdraw}
                endAuction = {endAuction}
                itemName = {itemNames}
                entryFee = {entryFees}
                auction = {auction}
              />
            : <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          }
          </Route>
          <Route path="/officer">
              <Officer />
          </Route>
          <Route path="/">
            <Member 
              account = { account }
            />
            <Winner 
            />
          </Route>
          <Route path="/checkin">
            <Checkin 
            />
          </Route>
        </Switch>
      </div>
    </Router>
    </body>
  );
}

export default App;
