import React, {useEffect, useState} from 'react';
import './Ranking.css';
import MyRank from './MyRank';

export default function Ranking({user, UserDB}) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sorted = UserDB.sort((a, b) => b.point - a.point);
    setRanking(
      sorted.map(person => {
        const rankIndex = sorted.findIndex(p => person.id === p.id)+1
        return(
          {...person, rank: rankIndex}
        )
      })
    )
    setLoading(true);
  }, [])

  function createTableContent(person, cssId) {
    return (
      <tr>
        <td><h2>{person.rank}</h2></td>
        <td>
          <img src={person.img} id={cssId} alt="headshot"/>
        </td>
        <td><h4>{person.name}</h4></td>
        <td><h4>{person.point}</h4></td>
      </tr>
    )
  }

  const top3Table = ranking.slice(0,3).map(person =>
    createTableContent(person, "top3-img")
  )
  const restTable = ranking.slice(3).map(person => 
    createTableContent(person, "rest-img")
  )

  function rankTable(tableContent) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Img</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
          <tfoot></tfoot>
        </table>
      </div>
    )
  }

  return (
    <div>
    {loading ?
      <div id="ranking">
        <div id="left-ranking">
          {user === undefined ?
            <h2>Please connect your wallet</h2>
            :
            <MyRank user={user}/>
          }
        </div>

        <div id="total-ranking">
          <p>Number of ppl: {ranking.length}</p>
          <div className="top3-ranking">
            <h2>명예의 전당</h2>
            {rankTable(top3Table)}
          </div>
          <div className="rest-ranking">
            <h4>Rest ranking</h4>
            {rankTable(restTable)}
          </div>
        </div>
      </div>
      :
      <h2>Loading...</h2>
    }
    </div>
  )
}