import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Web3 from 'web3';

import Auction_Factory from "../abis/AuctionFactory.json";
import KSEA_Airdrop from "../abis/KSEAirdrop.json";
import KSEA_Token from "../abis/KSEAToken.json";

import Navbar from "../components/Navbar";
import Ranking_page from "../pages/Ranking";
import Checkin from "../components/Checkin";
import Profile from "../components/Profile";

import Header from "../components/Header";
import Officer from "./Officer";
import Auction from "./Auction";
import './App.css';

 

function App() {

  useEffect(() => {
    async function fetchData() {
      await loadWeb3()
      await loadBlockchainData()
      await Ranking()
      await Member(account)
    }
    fetchData();
  }, [])

  async function loadWeb3()  {
    window.ethereum.autoRefreshOnNetworkChange = false;
    if (window.ethereum) {
      
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    // Network ID
    const networkId = await web3.eth.net.getId()

    // KSEA Token
    const networkData1 = KSEA_Token.networks[networkId]
    if(networkData1) {
      const token = new web3.eth.Contract(KSEA_Token.abi, networkData1.address)
      setToken(token)

      setLoading(false)
    } else {
      // ***Devs*** uncomment this after deploying smart contracts
      // window.alert('Token contract not deployed to detected network.')
      // console.log('Smart contracts not deployed to detected network.')
      setLoading(false)
    }

    // KSEA Airdrop
    const networkData2 = KSEA_Airdrop.networks[networkId]
    if(networkData2) {
      const airdrop = new web3.eth.Contract(KSEA_Airdrop.abi, networkData2.address)
      setAirdrop(airdrop)

      setLoading(false)
    } else {
      // ***Devs*** uncomment this after deploying smart contracts
      // window.alert('Airdrop contract not deployed to detected network.')
      // console.log('Smart contracts not deployed to detected network.')
      setLoading(false)
    }

    //KSEA Auction Factory
    const networkData3 = Auction_Factory.networks[networkId]
    if(networkData3) {
      const auctionFactory = new web3.eth.Contract(Auction_Factory.abi, networkData3.address)
      setAuctionFactory(auctionFactory)

      setLoading(false)
    } else {
      // ***Devs*** uncomment this after deploying smart contracts
      // window.alert('Token contract not deployed to detected network.')
      // console.log('Smart contracts not deployed to detected network.')
      setLoading(false)
    }
  }

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

  // // Airdrop Section

  // async function registerBoardMem(_address) {
  //   await airdrop.methods.registerBoardMember(_address).send({from:account})
  //   let board = await airdrop.methods.isBoardMember(_address).call();
  //   console.log("IsBoardMember: ", board);
  // }

  // async function deregisterBoardMem(_address) {
  //   await airdrop.methods.deregisterBoardMember(_address).send({from:account})
  //   let board = await airdrop.methods.isBoardMember(_address).call();
  //   console.log("IsBoardMember: ", board);
  // }

  // async function distributeTokens(_addresses, _value) {
  //   let total_val = _value * _addresses.length
  //   await token.methods.approve(airdrop._address, total_val).send({from:account});
  //   await airdrop.methods.distributeDobbyTokens(_addresses, _value).send({from:account})
  //   console.log(total_val)
  // }

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

  // States
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('')
  const [token, setToken] = useState(null)
  const [auctionFactory, setAuctionFactory] = useState(null)
  const [airdrop, setAirdrop] = useState(null)
  const [currentWinner, setWinner] = useState([])
  const [currentMember, setMember] = useState("Name")
  const [currentPoints, setPoints] = useState(0)

  return (
    <body style={{backgroundColor:"#011826"}}>
    <Router>
      <div className="app" style={{backgroundColor:"#011826"}}>
        <Navbar
          account = {account}
        />
        
        <Switch>
          <Route path="/auction">
            <h1>Work in Progress</h1>
          {/* {entryFees
            ?<Auction
                bid = {bid}
                withdraw = {withdraw}
                endAuction = {endAuction}
                itemName = {itemNames}
                entryFee = {entryFees}
                auction = {auction}
              />
            : <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          } */}
          </Route>
          <Route path="/officer">
            <Officer
              airdrop = {airdrop}
              token = {token}
            />
          </Route>
          <Route path="/">
            <Profile />
            <Ranking_page />
            
            {/* <div>
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
            </div> */}
          </Route>
          <Route path="/checkin">
            <Checkin />
          </Route>
        </Switch>
      </div>
    </Router>
    </body>
  );
}

export default App;
