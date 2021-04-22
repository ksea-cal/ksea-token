import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  InputGroup,
  InputLeftAddon,
  Input,
  Stack
} from "@chakra-ui/react"
import { CheckIcon } from '@chakra-ui/icons'
import './AuctionItem.css';
import Timer from './Timer';

import web3 from "../ethereum/Web3";
import KSEA_Auction from "../../abis/KSEAuction.json";

export default function AuctionItem({address, contractAddr}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  //page
  const [inputBid, setInputBid] = useState('');
  const toast = useToast()
  const toastIdRef = React.useRef()

  const [auction, setAuction] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      let auction = await kseAuction();
      setAuction(auction);
    }
    fetchData();
  }, [])

  const kseAuction = async () => {
    if(contractAddr) {
    const auction = new web3.eth.Contract(KSEA_Auction.abi, contractAddr)
    //   console.log("airdrop address:", airdrop.options.address)

      return auction
    } else {
      // ***Devs*** uncomment this after deploying smart contracts
      // window.alert('Airdrop contract not deployed to detected network.')
      console.log('Smart contracts not deployed to detected network.')
    }
  }


  //Auction Contract interacting functions 
  async function makeBid(_amount) {
    await auction.methods.bid(_amount).send({from:address})
    let myBid = await auction.methods.getBid(address).call();
    console.log("my bid: ", myBid);
  }

  async function getHighestBid() {
    let highestBid = await auction.methods.getHighestBid().call();
    console.log("highest Bid: ", highestBid);
  }

  async function getHighestBidder() {
    let highestBidder = await auction.methods.getHighestBidder().call();
    console.log("highest Bidder: ", highestBidder);
  }


  const {name, img, dueDate, entry_fee, best_bid} = contractAddr

  function handleChange(e) {
    setInputBid(e.target.value)
  }
  function handleSubmit() {
    if (inputBid <= 0) {
      toastIdRef.current = toast({ description: "너같으면 마이너스 배팅이 되겠냐? ㅡ.ㅡ" })
    } else {
      setTimeout(() => {
        makeBid(inputBid);
      }, 500);
      toastIdRef.current = toast({ description: "짝짝짝! 성공적으로 배팅하셨습니다!" })
      setInputBid('')
    }
  }

  return (
    <div>
      <div className="auction-item">
        <img src={img} alt="contractAddr-img"/>
        <div className="auction-contractAddr-overlay"/>
        <h1>{name}</h1>
        <Timer dueDate={dueDate}/>
        <Button onClick={onOpen}>Choose</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing="2vh">
                <img src={img} style={{width: "50%", margin: "auto"}} alt="item-img"/>
                  <h2>Highest Bid: {best_bid} token(s)</h2>
                  <h2>Highest Bidder: name</h2>
                  <Timer dueDate={dueDate}/>
                  
                  <InputGroup>
                    <InputLeftAddon children="DOBBY"/>
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
                    Bid
                  </Button>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      
    </div>
  )
}


{/* <div className="auction-item">
      <Link to={`/auction-item/${item.id}`}>
        <img src={item.img} alt="item-img"/>
        <div className="auction-item-overlay"></div>
        <h1>{item.name}</h1>
        <Timer dueDate={item.dueDate}/>
      </Link>
    </div> */}