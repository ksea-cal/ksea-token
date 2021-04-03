import React from 'react';
import Timer from './Timer';
import MyRank from './../Rank/MyRank';
import './Auction.css';
import AuctionItems from './AuctionItems';

export default function Auction() {
   return (
    <div>
      <Timer />
      <p>This is Auction Page</p>
      <div className="auction-content">
        <div className="left-ranking">
          <MyRank />
        </div>
        <div className="auction-items">
          <iframe src={AuctionItems} width="100%" height="100%"  name="current"></iframe>
        </div>
      </div>
    </div>
  )
}