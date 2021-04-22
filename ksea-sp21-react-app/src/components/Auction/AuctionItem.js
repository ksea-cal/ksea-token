import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './AuctionItem.css';
import Timer from './Timer';

import web3 from "../ethereum/Web3";
import KSEA_Auction from "../../abis/KSEAuction.json";

export default function AuctionItem({contractAddr, item}) {
  
  // const [auction, setAuction] = useState(undefined);

  // useEffect(() => {
  //   async function fetchData() {
  //     let auction = await kseAuction();
  //     setAuction(auction);
  //   }
  //   fetchData();
  // }, [])

  // const kseAuction = async () => {
  //   if(contractAddr) {
  //   const auction = new web3.eth.Contract(KSEA_Auction.abi, contractAddr)
  //   //   console.log("airdrop address:", airdrop.options.address)

  //     return auction
  //   } else {
  //     // ***Devs*** uncomment this after deploying smart contracts
  //     // window.alert('Airdrop contract not deployed to detected network.')
  //     console.log('Smart contracts not deployed to detected network.')
  //   }
  // }

  return (
    <div className="auction-item">
      <Link to={`/auction-item/${item.id}`}>
        <img src={item.img} alt="item-img"/>
        <div className="auction-item-overlay"></div>
        <h1>{item.name}</h1>
        <Timer dueDate={item.dueDate}/>
      </Link>
    </div>
  )
}