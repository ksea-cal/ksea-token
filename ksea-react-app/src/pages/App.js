import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import loadAccount from "../components/ethereum/LoadAccount";

import Ranking_page from "../pages/Ranking";
import Checkin from "../components/Checkin";
import Profile from "../components/Profile";

import Header from "../components/Header";
import Officer from "./Officer";
import './App.css';

 

function App() {

  useEffect(() => {
    async function fetchData() {
      let addr = await loadAccount()
      setAccount(addr)
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
            <h1>Work in Progress</h1>
          </Route>
          <Route path="/officer">
              <Officer />
          </Route>
          <Route path="/">
            <Profile />
            <Ranking_page />
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
