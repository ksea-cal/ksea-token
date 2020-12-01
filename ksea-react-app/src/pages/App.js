import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import loadAccount from "../components/ethereum/LoadAccount";
import kseaToken from "../components/ethereum/KSEA_Token";
import kseairdrop from "../components/ethereum/KSEAirdrop";
import factory from "../components/ethereum/AuctionFactory";

import Navbar from "../components/Navbar"
import Ranking from "../pages/Ranking"
import Checkin from "../components/Checkin"

import Officer from "./Officer"
import Auction from "./Auction"

import './App.css';


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
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('')
  const [token, setToken] = useState(null)
  const [auctionFactory, setAuctionFactory] = useState(null)
  const [airdrop, setAirdrop] = useState(null)
  const [auction, setAuction] = useState(null)
  const [itemNames, setItemName] = useState('');
  const [entryFees, setEntryFee] = useState(0);

  const [currentWinner, setWinner] = useState([])
  const [currentMember, setMember] = useState("Name")
  const [currentPoints, setPoints] = useState(0)

  console.log(currentMember)
  console.log(currentPoints)

  return (
    <Router>
      <div className="app">
        <Navbar
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
            <Officer
            />
          </Route>
          <Route path="/">
            <Ranking
            />
          </Route>
          <Route path="/checkin">
            <Checkin
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
