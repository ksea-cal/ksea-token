import React from 'react';


class Ranking extends React.Component {
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
        <div className="ranking">
            <div class="rankingbox">
                <article class="topthree">
                    <article class="relativebox">
                    <article class="firstplace">
                        <div class="firstperson"></div>
                        <div class="firstcontent">
                            <p style={{lineHeight: "0.1"}}> { this.state.winner[0] } </p>
                            <p>Point</p>
                        </div>
                    </article>
                    <article class="secondplace">
                        <div class="secondperson"></div>
                        <div class="secondcontent">
                            <p style={{lineHeight: "0.1"}}> { this.state.winner[1] } </p>
                            <p>Point</p>
                        </div>
                    </article>
                    <article class="thirdplace">
                        <div class="thirdperson"></div>
                        <div class="thirdcontent">
                            <p style={{lineHeight: "0.1"}}> { this.state.winner[2] } </p>
                            <p>Point</p>
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
                        <tbody>
                            <td class="content">1</td>
                            <td class="content">Chris</td>
                            <td class="content">45</td>
                        </tbody>
                        <tbody>
                            <td class="content">2</td>
                            <td class="content">Brian</td>
                            <td class="content">43</td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )
  }
}

export default Ranking;
