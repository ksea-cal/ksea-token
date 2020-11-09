import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar"
import Officer from "./Officer"
import Web3 from 'web3';
import KSEA_Auction from "../abis/KSEAuction.json";
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
    const networkData = KSEA_Auction.networks[networkId]
    console.log(account)
    if(networkData) {
      const auction = new web3.eth.Contract(KSEA_Auction.abi, networkData.address)
      setAuction(auction)

      setLoading(false)
    } else {
      // ***Devs*** uncomment this after deploying smart contracts
      // window.alert('Smart contracts not deployed to detected network.')
      // console.log('Smart contracts not deployed to detected network.')
      setLoading(false)
    }
  }

  function Ranking() { 
    fetch('http://127.0.0.1:5000').then(res => res.json()).then(
      data => setWinner(data.curr_sem_users)
    );
  }

  function Member(address) { 
    fetch("http://127.0.0.1:5000/viewmember?address=".concat(address)).then(res => res.json()).then(
      data => { 
        setMember(data.name)
        setPoints(data.points)
      }
    );
  }

  const [account, setAccount] = useState('')
  const [auction, setAuction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentWinner, setWinner] = useState([])
  const [currentMember, setMember] = useState("Name")
  const [currentPoints, setPoints] = useState(0)
  Ranking()
  Member(account)

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/auction">
          {loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>:<h1> Auction Page</h1>
          }  
          </Route>
          <Route path="/officer">
            <Officer />
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;

{/*https://www.youtube.com/watch?v=1_IYL9ZMR_Y&t=18s*/}
