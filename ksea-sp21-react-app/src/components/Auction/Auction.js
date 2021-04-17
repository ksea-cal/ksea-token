import React from 'react';
import MyRank from './../Rank/MyRank';
import './Auction.css';
import AuctionItem from './AuctionItem';
import AuctionDB from './../../DB/AuctionDB';

export default function Auction({user, onboardState}) {
  const AuctionItems = AuctionDB.map(eachItem => (
    <AuctionItem item={eachItem} />
  ))

   return (
    <div>
      {!onboardState.address ?
        <h2>Please connect your wallet</h2>
        :
        <div className="auction-content">
          <div id="left-ranking">
            <MyRank user={user}/>
          </div>
          <div className="auction-items">
            {AuctionItems}
          </div>
        </div>
      }
    </div>
  )
}