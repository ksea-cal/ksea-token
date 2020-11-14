import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar"
import Officer from "./Officer"
import Web3 from 'web3';
import KSEA_Auction from "../abis/KSEAuction.json";
import KSEA_Airdrop from "../abis/KSEAirdrop.json";
import KSEA_Token from "../abis/KSEAToken.json";
import '../App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
 

function App() {

  useEffect(() => {
    async function fetchData() {
      await loadWeb3()
      await loadBlockchainData()
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
      window.alert('Token contract not deployed to detected network.')
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
      window.alert('Airdrop contract not deployed to detected network.')
      // console.log('Smart contracts not deployed to detected network.')
      setLoading(false)
    }

    // KSEA Auction
    const networkData3 = KSEA_Auction.networks[networkId]
    if(networkData3) {
      const auction = new web3.eth.Contract(KSEA_Auction.abi, networkData3.address)
      setAuction(auction)

      setLoading(false)
    } else {
      // ***Devs*** uncomment this after deploying smart contracts
      window.alert('Auction contract not deployed to detected network.')
      // console.log('Smart contracts not deployed to detected network.')
      setLoading(false)
    }
  }

  // Airdrop Section

  async function registerBoardMem(_address) {
    await airdrop.methods.registerBoardMember(_address).send({from:account})
    let board = await airdrop.methods.isBoardMember(_address).call();
    console.log("IsBoardMember: ", board);
  }

  async function deregisterBoardMem(_address) {
    await airdrop.methods.deregisterBoardMember(_address).send({from:account})
    let board = await airdrop.methods.isBoardMember(_address).call();
    console.log("IsBoardMember: ", board);
  }

  async function distributeTokens(_addresses, _value) {
    let total_val = _value * _addresses.length
    await token.methods.approve(airdrop._address, total_val).send({from:account});
    await airdrop.methods.distributeDobbyTokens(_addresses, _value).send({from:account})
    console.log(total_val)
  }

  // States
  const [account, setAccount] = useState('')
  const [auction, setAuction] = useState(null)
  const [token, setToken] = useState(null)
  const [airdrop, setAirdrop] = useState(null)
  const [loading, setLoading] = useState(true)

  return (
    <Router>
      <div className="app">
        <Navbar 
          account = {account}
        />
        <Switch>
          <Route path="/auction">
          {loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>:<h1> Auction Page</h1>
          }  
          </Route>
          <Route path="/officer">
            <Officer
              registerBoardMem = {registerBoardMem}
              deregisterBoardMem = {deregisterBoardMem}
              distributeTokens = {distributeTokens}
            />
          </Route>
          <Route path="/">
            <h1> Home Page!!!</h1>
          </Route>
          <Route path="/checkin">
            <h1> Check In Page!!!</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
