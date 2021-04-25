import React, {useState, useEffect} from 'react';

import './Auction.css';
import AuctionItem from './AuctionItem';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Auction({address, onboardState}) {
  const user = useSelector((state) => state.allUsers.selUser)
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/auction")
      .then(res => { 
        console.log(res.data)
        setAuctions(res.data)
      })
  }, [user])

  const auctionItems = auctions.map(item => (
    <AuctionItem address={address} item={item} key={item.aid} />
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
              <p>{user.name}</p>
              <p>{user.point} points</p>
            </div>
          </div>
          <div className="auction-items">
            {auctionItems}
          </div>
        </div>
      }
    </div>
  )
}