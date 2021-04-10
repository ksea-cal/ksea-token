import React from 'react';
import { Link } from "react-router-dom";
import './AuctionItem.css';
import Timer from './Timer';

export default function AuctionItem({item}) {
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