import React, { useState, useEffect } from 'react';
import loadAccount from "../components/ethereum/LoadAccount";
import kseaToken from "../components/ethereum/KSEA_Token";
import kseairdrop from "../components/ethereum/KSEAirdrop";
import factory from "../components/ethereum/AuctionFactory";
import Header from "../components/Header";
import Officer from "./Officer"
import Auction from "./Auction"
import '../App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
 

function App() {

  useEffect(() => {
    async function fetchData() {
      await loadAccount()
      await kseaToken()
      await kseairdrop()
      await factory()
      await Ranking()
      await Member(account)
    }
    fetchData();
  }, [])

  async function Ranking() { 
    fetch('http://127.0.0.1:5000').then(res => res.json()).then(
      data => { 
        setWinner(data.curr_sem_users)
        console.log(data.curr_sem_users)
      }
    );
  }

  async function Member(address) { 
    fetch("http://127.0.0.1:5000/viewmember?address=".concat(address)).then(res => res.json()).then(
      data => { 
        setMember(data.name)
        setPoints(data.points)
      }
    );
  }

  // //Auction Section
  // async function createAuction(_name, _entryFee, _biddingTime, _dobbyToken) {
  //   setLoading(true);
  //   let web3 = window.web3
  //   await auctionFactory.methods.createAuction(_name, _entryFee, _biddingTime, _dobbyToken).send({from:account});

  //   let auctionAddr = await auctionFactory.methods.getAuctionAddr(_name).call();
  //   console.log("auction address:", auctionAddr)

  //   const auction = new web3.eth.Contract(KSEA_Auction.abi, auctionAddr);
  //   setAuction(auction);

  //   let itemName = await auctionFactory.methods.getItemName(_name).call();
  //   setItemName(itemName);
  //   console.log("name:", itemNames);
  //   let entryFee = await auctionFactory.methods.getEntryFee(_name).call();
  //   setEntryFee(entryFee);
  //   console.log("Entry fee:", entryFees);
  //   setLoading(false);
  // }

  // async function getItemName(_name) {
  //   await auctionFactory.methods.getItemName(_name).call();
  // }

  // async function getStartPrice(_name) {
  //   await auctionFactory.methods.getStartPrice(_name).call();
  // }

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
                // getItemName = {getItemName}
                // getStartPrice = {getStartPrice}
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
            <div>
              <h1> Hi { currentMember }! </h1>
              <h3> You currently have { currentPoints } points </h3>
            </div>
            <div className="App">
              <header className="App-header">
                <h1> Leaderboard </h1> 
                <p>The current winner is { currentWinner[0] } </p>
                <p> Second place is { currentWinner[1] } </p>
                <p> Third place is { currentWinner[2] } </p>
                <p> Fourth place is { currentWinner[3] } </p>
                <p> Fifth place is { currentWinner[4] } </p>
              </header>
            </div>
          </Route>
          <Route path="/checkin">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
