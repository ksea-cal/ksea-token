import React from 'react';
import './Auction.css';
import AuctionItem from './AuctionItem';
import AuctionDB from './../../SampleDB/AuctionDB';

export default function Auction({onboardState}) {
  const user = {
    "id": 2,
    "img": "https://source.unsplash.com/collection/1051/3",
    "name": "박하민",
    "point": 32,
    "rank": 31
  }

  const AuctionItems = AuctionDB.map(eachItem => (
    <AuctionItem item={eachItem} />
  ))

   return (
    <div>
      {!onboardState.address ?
        <h2>Please connect your wallet</h2>
        :
        <div className="auction-content">
          <div className="user-info">
            <div className="my-ranking">
              <h4>My rank</h4>
              <img src={user.img} id="my-img" alt="headshot"/>
              <h5>Rank #1</h5>
              <p>{user.name}</p>
              <p>{user.point} points</p>
            </div>
          </div>
          <div className="auction-items">
            {AuctionItems}
          </div>
        </div>
      }
    </div>
  )
}