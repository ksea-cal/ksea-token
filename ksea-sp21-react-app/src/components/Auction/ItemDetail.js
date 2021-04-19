import React, {useState} from 'react';
import {
  useToast,
  Button,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react"
import { CheckIcon } from '@chakra-ui/icons'

//import components
import Timer from './Timer';
import AuctionDB from './../../SampleDB/AuctionDB';
import './ItemDetail.css';

export default function ItemDetail({match}) {
  const [inputBid, setInputBid] = useState('');
  const toast = useToast()
  const toastIdRef = React.useRef()

  const id = match.params.id;
  const itemSel = AuctionDB.filter(item => (
    item.id == id
  ))[0]

  const {name, img, dueDate, entry_fee, best_bid} = itemSel

  function handleChange(e) {
    setInputBid(e.target.value)
  }
  function handleSubmit() {
    const alertText = inputBid !== '' ?
      "You've made a bid!" : "Please make a bid!"
    toastIdRef.current = toast({ description: alertText })
    setInputBid('')
  }

   return (
    <Stack spacing="2vh" className="item-detail">
      <img src={img} alt="item-img"/>
        <h1>{name}</h1>
        <h2>Entry fee: {entry_fee} token(s)</h2>
        <h2>Best Bid: {best_bid} token(s)</h2>
        <Timer dueDate={dueDate}/>
        
        <InputGroup style={{width: "80%"}}>
          <InputLeftAddon children="$"/>
          <Input 
            type="number"
            value={inputBid}
            placeholder="Your bid"
            variant="filled"
            onChange={handleChange}
            style={{fontSize: "3vh"}}
          />
        </InputGroup>
        <Button 
          onClick={handleSubmit}
          rightIcon={<CheckIcon />} 
          colorScheme="blue" 
          variant="outline"
          className="btn"
        >
          Make a bid
        </Button>
    </Stack>
  )
}