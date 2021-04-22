import React, {useEffect, useState} from 'react';
import './Ranking.css';
import UserRank from './UserRank';
import { CircularProgress} from "@chakra-ui/react";

//redux imports
import { setUsers } from './../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function Ranking({onboardState}) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  
  //redux
  const user = useSelector((state) => state.allUsers.selUser)
  const allUsers = useSelector((state) => state.allUsers.users)
  const dispatch = useDispatch()

  const fetchUsers = async () => {
    const res = await axios
      .get(`http://localhost:5000//api/users`)
      .catch((err) => {
        console.log("Error:", err);
      })
    if (res) {
      dispatch(setUsers(res.data))
    }
  }

  useEffect(() => {
    fetchUsers()
    const sorted = allUsers.sort((a, b) => b.point - a.point);
    setRanking(
      sorted.map(person => {
        const rankIndex = sorted.findIndex(p => person.id === p.id)+1
        return(
          {...person, rank: rankIndex}
        )
      })
    )
    setLoading(true);
  }, [allUsers])

  const top3Rank = ranking.slice(0,3).map(person =>
    <UserRank user={person} rankingSel={0} key={person.id} />
  )
  const restRank = ranking.slice(3).map(person => 
    <UserRank user={person} rankingSel={1} key={person.id} />
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

        <div>
          <h2>명예의 전당</h2>
          <p>Number of ppl: {ranking.length}</p>
          <div className="total-ranking">
            {top3Rank}
          </div>
          <h2>Rest ranking</h2>
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