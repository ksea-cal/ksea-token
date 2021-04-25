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
import KseaToken from "../ethereum/KSEA_Token";
import { useSelector } from 'react-redux';

export default function AuctionItem({address, contractAddr}) {
  const user = useSelector((state) => state.allUsers.selUser)
  const [inputBid, setInputBid] = useState('');
  const [highestBid, setHighestBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState('');
  
  //design
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const toastIdRef = React.useRef()
  
  //auction
  const [auction, setAuction] = useState(undefined);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      let auction = await kseAuction();
      setAuction(auction);

      let token = await KseaToken();
      setToken(token);
    }
    fetchData();
  }, [])

  useEffect(() => {
    console.log("highest bid: " + highestBid);
    // window.localStorage.setItem('listOfAuction', listOfAuction);   
    console.log("highest Bidder" + highestBidder);
  }, [highestBid, highestBidder])

  // useEffect(() => {
  //   async function fetchData() {
  //     const highestBid = await getHighestBid();
  //     setHighestBid(highestBid);

  //     const highestBidder = await getHighestBidder();
  //     setHighestBidder(highestBidder);
  //   }

  //   fetchData();
  // }, [contractAddr])

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
    await token.methods.approve(contractAddr, _amount).send({from:address});
    await auction.methods.bid(_amount).send({from:address})
    let myBid = await auction.methods.getBid(address).call();
    let highestBid = await getHighestBid();
    setHighestBid(highestBid);
    let highestBidder = await getHighestBidder();
    setHighestBidder(highestBidder);
    console.log("my bid: ", myBid);
  }

  async function getHighestBid() {
    let highestBid = await auction.methods.getHighestBid().call();
    console.log("highest Bid: ", highestBid);
    return highestBid;
  }

  async function getHighestBidder() {
    let highestBidder = await auction.methods.getHighestBidder().call();
    console.log("highest Bidder: ", highestBidder);
    return highestBidder;
  }


  function handleChange(e) {
    setInputBid(e.target.value)
  }
  function handleSubmit() {
    if (inputBid <= 0) {
      toastIdRef.current = toast({ description: "너같으면 마이너스 배팅이 되겠냐? ㅡ.ㅡ" })
    } else {
      setTimeout(() => {
        makeBid(inputBid);
      }, 5000);
      toastIdRef.current = toast({ description: "짝짝짝! 성공적으로 배팅하셨습니다!" })
      setInputBid('')
    }
  }



  return (
    <div className="auction-item">
      <div className="auction-contractAddr-overlay"/>
      <Button onClick={onOpen}>Choose</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{contractAddr}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="2vh">
              <h2>Highest Bid: {highestBid} token(s)</h2>
              <h2>Highest Bidder: {highestBidder} </h2>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

