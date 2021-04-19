import './UserRank.css';

export default function MyRank({user, rankingSel}) {
  const designClass = rankingSel === 0 ?
    "top3-ranking" : "rest-ranking"
    
  return(
    <div className={`${designClass} ranking-display`}>
      <img src={user.img} alt="headshot"/>
      <h5>Rank #{user.rank}</h5>
      <p>{user.name}</p>
      <p>{user.point} points</p>
    </div>
  )
}