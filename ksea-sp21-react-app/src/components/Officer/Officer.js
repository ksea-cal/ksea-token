import './Officer.css'
import kseaToken from '../ethereum/KSEA_Token'
import kseAirdrop from '../ethereum/KSEAirdrop'
import auctionFactory from '../ethereum/AuctionFactory'
import KSEA_Token from "../../abis/KSEAToken.json";
import React, { useEffect, useState, useRef } from 'react'
import web3 from "../ethereum/Web3";

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setAuctionList } from '../../redux/actions/userActions';

import axios from 'axios';
import {useToast} from "@chakra-ui/react"

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button, 
  Input,
  Stack
} from "@chakra-ui/react"

//Import officer components
import CreateAuction from './CreateAuction';
import CreateCheckin from './CreateCheckin';
import CreateMember from './CreateMember';

export default function Officer({address, onboardState}) {
  //design
  const toast = useToast()
  const toastIdRef = React.useRef()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.allUsers.selUser)

  // New auction item info
  const [auctionImg, setAuctionImg] = useState('');
  const [auctionName, setAuctionName] = useState('');
  const [auctionDuration, setAuctionDuration] = useState('');

  // blockchain related
  const [airdrop, setAirdrop] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [factory, setFactory] = useState(undefined);
  const [boardValue, setBoardValue] = useState('');
  const [listOfMembers, setListOfMembers] = useState([]);
  const [listOfAuctions, setListOfAuctions] = useState([]);
  let eventValue = useRef(0);

  useEffect(() => {
    async function fetchData() {
      let t = await kseaToken()
      setToken(t);

      let a = await kseAirdrop()
      setAirdrop(a);

      let f = await auctionFactory()
      setFactory(f);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let list = JSON.parse(localStorage.getItem('listOfAuction', listOfAuctions));  
    setListOfAuctions(list); 
  }, [])

  useEffect(() => {
    console.log("list of auctions: " + listOfAuctions);
    // window.localStorage.setItem('listOfAuction', listOfAuction);   
    localStorage.setItem('listOfAuction', JSON.stringify(listOfAuctions));   
    dispatch(setAuctionList(listOfAuctions))
  }, [listOfAuctions])


  // useEffect(() => {
  //   console.log("list of auctions: " + listOfAuctions);
  //   dispatch(setAuctionList(listOfAuctions))
  //   // let formData = new FormData();
  //   // formData.append('auctionList', listOfAuctions);
  //   // axios.post("http://127.0.0.1:5000/auction_list", formData)
  //   //   .then(response => {
  //   //       console.log(response);
  //   //   })
  //   //   .catch(error => {
  //   //       console.log(error);
  //   //   });
  // }, [listOfAuctions])

  //KSEAirdrop button handlers. These functions will get called when buttons are clicked
  function handleBoardChange(event) {
    setBoardValue(event.target.value);
  }

  // function handleListChange(event) {
  //   event.preventDefault();
  //   setListOfMembers([...listOfMembers, memberValue])
  // }


  function handleRegister(event) {
    event.preventDefault();
    registerBoardMem(boardValue)
    console.log("register Board Member works!")
  }

  function handleDeregister(event) {
    event.preventDefault();
    deregisterBoardMem(boardValue)
  }

  function handleDistribute(event) {
    event.preventDefault();
    distributeTokens(listOfMembers, eventValue);
  }

  //KSEAirdrop Smart contract function calls. These functions will interact with the deployed smart contracts.
  async function registerBoardMem(_address) {
    await airdrop.methods.registerBoardMember(_address).send({from:address})
    let board = await airdrop.methods.isBoardMember(_address).call();
    console.log("IsBoardMember: ", board);
  }

  async function deregisterBoardMem(_address) {
    await airdrop.methods.deregisterBoardMember(_address).send({from:address})
    let board = await airdrop.methods.isBoardMember(_address).call();
    console.log("IsBoardMember: ", board);
  }

  async function distributeTokens(_addresses, _value) {
    let total_val = _value * _addresses.length
    await token.methods.approve(airdrop._address, total_val).send({from:address});
    await airdrop.methods.distributeDobbyTokens(_addresses, _value).send({from:address})
    console.log(total_val)
  }


  //Auction
  /** 
   * 1. create auction 
   * 2. put into a list of auction addresses
   */
  

  function handleAuctionChange(event) {
    event.preventDefault();
    const { name, value } = event.target
    if (name === "auctionName") {
      setAuctionName(value);
    } else if (name === "auctionImg") {
      setAuctionImg(value)
    } else {
      setAuctionDuration(value);
    }
  }

  async function handleAuction(event) {
    event.preventDefault();
    const networkId = await web3.eth.net.getId();
    const networkData1 = KSEA_Token.networks[networkId]
    await createAuction(auctionName, networkData1.address)
    // console.log(listOfAuctions);
  }

  async function createAuction(name, tokenAddr) {
    await factory.methods.createAuction(name, tokenAddr).send({from:address});
    await factory.methods.getAuctionAddr(name).call().then(auctionAddr => {
      //setListOfAuctions(listOfAuctions => [...listOfAuctions, auctionAddr]);
      let formData = new FormData();
      formData.append('name', auctionName); 
      formData.append('img', auctionImg); 
      formData.append('contractAddr', auctionAddr); 
      formData.append('duration', auctionDuration); 
      axios.post("http://127.0.0.1:5000/auction", formData)
        .then(res => { 
          console.log(res.data.status)
          toastIdRef.current = toast({ description: `Auction ${name} created`})
        })
    });
    setAuctionImg('');
    setAuctionName('');
    setAuctionDuration('');
  }

// airdrop && token ?
  return  (
    <div>
      {!onboardState.address ?
        <h2>Please Connect Your Wallet</h2>
        :
        <div>
          {/* {bool ? */}
            <Stack spacing={5} id='officer'>
              <div>
                <Input onChange={handleBoardChange} placeholder="medium size" size="md" />
                <Button onClick={handleRegister} colorScheme="blue">Register Officer</Button>
              </div>

              <div>
                <Input onChange={handleBoardChange} placeholder="medium size" size="md" />
                <Button onClick={handleDeregister} colorScheme="blue">
                  Deregister Officer</Button>
              </div>

              <div>
                <NumberInput min={0}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button onClick={handleDistribute} colorScheme="blue">Distribute Dobby</Button>
              </div>

              <div>
                <NumberInput min={0}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button colorScheme="blue">Distribute Ether</Button>
              </div>

              <CreateAuction
                auctionName = {auctionName}
                auctionImg = {auctionImg}
                auctionDuration = {auctionDuration}
                handleAuction = {handleAuction}
                handleAuctionChange = {handleAuctionChange}
              />

              <CreateCheckin />

              <CreateMember />

            </Stack>
          {/* //   :
          //   <div>You Are Not An Officer</div>
          // } */}

        </div>
      }
    </div>
  )
}
//  : (
//     <div>Loading...</div>
//   )