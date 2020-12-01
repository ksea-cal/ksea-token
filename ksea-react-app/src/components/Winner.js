import React from "react";

class Winner extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      winner: [],
    }
  }

  componentDidMount() {
    fetch('http://127.0.0.1:5000').then(res => res.json()).then(
      data => { 
        this.setState( { "winner": data.curr_sem_users })
      }
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1> Leaderboard </h1> 
        <p>The current winner is { this.state.winner[0] } </p>
        <p> Second place is { this.state.winner[1] } </p>
        <p> Third place is { this.state.winner[2] } </p>
        <p> Fourth place is { this.state.winner[3] } </p>
        <p> Fifth place is { this.state.winner[4] } </p>
        </header>
      </div>
    )    
  }
}

export default Winner;
