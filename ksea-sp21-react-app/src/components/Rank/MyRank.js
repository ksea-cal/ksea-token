import './MyRank.css';

export default function MyRank({user}) {
  return(
    <div id="my-ranking">
      <h4>My rank</h4>
      <img src={user.img} id="my-img" alt="headshot"/>
      <h5>Rank #1</h5>
      <p>{user.name}</p>
      <p>{user.point} points</p>
    </div>
  )
}