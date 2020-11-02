import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Router path="/checkout">
            <h1> Check out</h1>
          </Router>
          <Route path="/login">
            <h1> Log-in page</h1>
          </Route>
          <Route path="/">
            <h1> Home Page!!!</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

{/*https://www.youtube.com/watch?v=1_IYL9ZMR_Y&t=18s*/}
