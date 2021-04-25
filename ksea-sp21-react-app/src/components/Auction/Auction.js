import React, {useState, useEffect} from 'react';

import './Auction.css';
import AuctionItem from './AuctionItem';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Auction({address, onboardState}) {
  const user = useSelector((state) => state.allUsers.selUser)
  const [auctions, setAuctions] = useState([]);


  const fetchAllAuctions = async () => {
    console.log("fetching all...")
    const res = await axios
      .get(`http://localhost:5000/auction?getAll=true`)
      .catch(err => {
        console.log("Error:", err)
      })
    
    if(res) {
      console.log(res.data)
      setAuctions(res.data)
    }
  }

  useEffect(() => {
    fetchAllAuctions();
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