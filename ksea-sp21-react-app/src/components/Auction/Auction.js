import React from 'react';
import './Auction.css';
import AuctionItem from './AuctionItem';
import AuctionDB from './../../SampleDB/AuctionDB';
import { useSelector } from 'react-redux';

export default function Auction({address, onboardState}) {
  const user = useSelector((state) => state.allUsers.selUser)
  const auctionList = useSelector((state) => state.allUsers.auctionList)
  console.log(auctionList)

  const AuctionItems = auctionList.map(eachAddr => (
    <AuctionItem address = {address} contractAddr={eachAddr} key={eachAddr} />
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
              <h5>Rank #{user.rank}</h5>
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