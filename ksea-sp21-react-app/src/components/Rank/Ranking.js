import React, {useEffect, useState} from 'react';
import './Ranking.css';
import axios from "axios";
import MyRank from './MyRank';

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [user, setUser] = useState({
        "id": 1,
        "img": "https://source.unsplash.com/collection/1051/3",
        "name": "이신희",
        "point": 92,
        "rank": 2
    });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users`)
      .then(res => {
        const list = res.data
        const sorted = list.sort((a, b) => b.point - a.point);
        //console.log(sorted)
        setRanking(
          sorted.map(person => {
            const rankIndex = sorted.findIndex(p => person.id === p.id)+1
            axios.put(`http://localhost:5000/api/user/${person.id}`, 
            {
              "name": person.name,
              "point": person.point,
              "rank": rankIndex + "",
              "img": person.img
            })
            .catch(err => console.error(`Error: ${err}`));
            
            return(
              {...person, rank: rankIndex}
            )
          })
        )
      })
      .catch(err => console.error(`Error: ${err}`));
  
  setLoading(true);
  }, []);

  function createTableContent(person, cssId) {
    return (
      <tr>
        <td>{person.rank}</td>
        <td>
          <img src={person.img} id={cssId} alt="headshot"/>
        </td>
        <td>{person.name}</td>
        <td>{person.point}</td>
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
      <div id="ranking">
        <div className="left-ranking">
          <MyRank />
        </div>
        
        {loading ?
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
          :
          <h2>Loading...</h2>
        }
        </div>
    </div>
  )
}