import React, {useState, useEffect} from 'react';

import './Auction.css';
import AuctionItem from './AuctionItem';
import AuctionDB from './../../SampleDB/AuctionDB';
import { useSelector } from 'react-redux';

export default function Auction({address, onboardState}) {
  const user = useSelector((state) => state.allUsers.selUser)
  // const auctionList = useSelector((state) => state.allUsers.auctionList)
  // // localStorage.setItem("auctionList", JSON.stringify(auctionList));

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    let list = JSON.parse(localStorage.getItem('listOfAuction'));  
    setAuctions(list); 
  }, [])

  const AuctionItems = auctions.map(eachAddr => (
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