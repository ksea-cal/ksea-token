import React, {useState} from 'react';
import Timer from './Timer';
import AuctionDB from './../../SampleDB/AuctionDB';
import './ItemDetail.css';

export default function ItemDetail({match}) {
  const [inputBid, setInputBid] = useState('');

  const id = match.params.id;
  const itemSel = AuctionDB.filter(item => (
    item.id == id
  ))[0]

  const {name, img, dueDate, entry_fee, best_bid} = itemSel

  function handleChange(e) {
    setInputBid(e.target.value)
  }
  function handleSubmit() {
    const bidConfirm = inputBid !== '' ?
      "You've made a bid!" : "Please make a bid!"
    alert(bidConfirm)
    setInputBid('')
  }

   return (
    <div className="item-detail">
      <img src={img} alt="item-img"/>
        <h1>{name}</h1>
        <h2>Entry fee: {entry_fee} token(s)</h2>
        <h2>Best Bid: {best_bid} token(s)</h2>
        <Timer dueDate={dueDate}/>
        <input 
          type="text"
          value={inputBid}
          placeholder="Your bid"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          Make a bid
        </button>
    </div>
  )
}