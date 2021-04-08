import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// pages import oges here
import Ranking_page from "../pages/ranking";
import Checkin from "../pages/checkin";
import Officer from "./pages/officer";
import Auction from "./pages/auction";

// components import goes here
import Signup from "../components/signup";
import Header from "../components/header";

// connects metamask to our web app 
import loadAccount from "../components/ethereum/LoadAccount";

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
