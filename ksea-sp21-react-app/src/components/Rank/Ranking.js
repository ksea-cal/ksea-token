import React, {useEffect, useState} from 'react';
import './Ranking.css';
import UserRank from './UserRank';
import { CircularProgress} from "@chakra-ui/react";

export default function Ranking({UserDB, onboardState}) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = {
    "id": 2,
    "img": "https://source.unsplash.com/collection/1051/3",
    "name": "박하민",
    "point": 32,
    "rank": 31
  }

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

  const top3Rank = ranking.slice(0,3).map(person =>
    <UserRank user={person} rankingSel={0}/>
  )
  const restRank = ranking.slice(3).map(person => 
    <UserRank user={person} rankingSel={1}/>
  )

  return (
    <div>
    {loading ?
      <div id="ranking">
        {!onboardState.address ?
          <div className="my-ranking">
            <h2>Please connect your wallet</h2>
          </div>
          :
          <div className="my-ranking">
            <h2>My rank</h2>
            <div className="my-ranking-box">
              <div className="my-ranking-content">
                <img src={user.img} id="my-img" alt="headshot"/>
                <p>Rank #{user.rank}</p>
                <p>{user.name}</p>
                <p>{user.point} points</p>
              </div>
            </div>
          </div>
        }

        <p>Number of ppl: {ranking.length}</p>
        <div>
          <h2>명예의 전당</h2>
          <div className="total-ranking">
            {top3Rank}
          </div>
          <h4>Rest ranking</h4>
          <div className="total-ranking">
            {restRank}
          </div>
        </div>
      </div>
      :
      <CircularProgress isIndeterminate color="green.300" />
    }
    </div>
  )
}