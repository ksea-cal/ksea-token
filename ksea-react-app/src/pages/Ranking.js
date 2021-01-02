import React from 'react';
import './Ranking.css'


class Ranking extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: [],
      points: [],
    }
  };

  componentDidMount() {
    fetch('http://127.0.0.1:5000').then(res => res.json()).then(
      data => {
        this.setState( {
          "winner": data.curr_sem_users,
          "points": data.curr_sem_points,
          }
        )
      }
    );
  }


  render() {
    return (
        <div className="ranking">
            <div class="rankingbox">
                <article class="topthree">
                    <article class="relativebox">
                    <article class="firstplace">
                        <div class="firstperson"></div>
                        <div class="firstcontent">
                            <p style={{lineHeight: "0.1"}}> { this.state.winner[0] } </p>
                            <p> { this.state.points[0] } </p>
                        </div>
                    </article>
                    <article class="secondplace">
                        <div class="secondperson"></div>
                        <div class="secondcontent">
                            <p style={{lineHeight: "0.1"}}> { this.state.winner[1] } </p>
                            <p> { this.state.points[1] } </p>
                        </div>
                    </article>
                    <article class="thirdplace">
                        <div class="thirdperson"></div>
                        <div class="thirdcontent">
                            <p style={{lineHeight: "0.1"}}> { this.state.winner[2] } </p>
                            <p> { this.state.points[2] } </p>
                        </div>
                    </article>
                    </article>
                </article>
                <div class="wholerankbox">
                    <table class="ranktable">
                        <thead>
                            <tr>
                                <th class="title" scope="cols">#</th>
                                <th class="title" scope="cols">Name</th>
                                <th class="title" scope="cols">Points</th>
                            </tr>
                        </thead>
                        { this.state.winner.map(( winner, i ) => {
                          return (
                            <tbody>
                              <td class="content"> { i + 1 } </td>
                              <td class="content"> { this.state.winner[i] }</td>
                              <td class="content"> { this.state.points[i] }</td>
                            </tbody>
                          );
                        }) }
                    </table>
                </div>
            </div>
        </div>
      )
  }
}

export default Ranking;
