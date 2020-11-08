import React, { Component } from 'react';
import Navbar from "./Navbar"
import Officer from "./Officer"
import Web3 from 'web3';
import KSEA_Auction from "../abis/Auction.json";
import '../App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


 class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = KSEA_Auction.networks[networkId]
    if(networkData) {
      const auction = new web3.eth.Contract(KSEA_Auction.abi, networkData.address)
      this.setState({ auction })

      this.setState({ loading: false})
    } else {
      // ***Devs*** uncomment this after deploying smart contracts
      // window.alert('Smart contracts not deployed to detected network.')
      console.log('Smart contracts not deployed to detected network.')
      this.setState({ loading: false})
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      auction: null,
      loading: true,
      page: '/'
    }
  }
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />
          <Switch>
            <Route path="/auction">
            { this.state.loading
              ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>:<h1> Auction Page</h1>
            }  
            </Route>
            <Route path="/officer">
              <Officer />
            </Route>
            <Route path="/">
              <h1> Home Page!!!</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

{/*https://www.youtube.com/watch?v=1_IYL9ZMR_Y&t=18s*/}
