import './Officer.css'
import kseaToken from '../ethereum/KSEA_Token'
import kseAirdrop from '../ethereum/KSEAirdrop'
import auctionFactory from '../ethereum/AuctionFactory'
import KSEA_Token from "../../abis/KSEAToken.json";
import { useEffect, useState, useRef } from 'react'
import web3 from "../ethereum/Web3";
import { useDispatch, useSelector } from 'react-redux';
import { setAuctionList } from './../../redux/userActions';

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button, 
  Input,
  Select  
} from "@chakra-ui/react"

export default function Officer({address, onboardState}) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.allUsers.selUser)

  const [airdrop, setAirdrop] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [factory, setFactory] = useState(undefined);
  const [boardValue, setBoardValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [listOfMembers, setListOfMembers] = useState([]);
  const [listOfAuctions, setListOfAuctions] = useState([]);
  const [auctionInput, setAuctionInput] = useState('');
  const [eventName, setEventName] = useState('');
  const [bool, setBool] = useState(false);
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
    console.log(listOfAuctions);
    dispatch(setAuctionList(listOfAuctions))
    const auctionL = useSelector((state) => state.allUsers.auctionList)
    console.log(auctionL)
  }, [listOfAuctions])


  //KSEAirdrop button handlers. These functions will get called when buttons are clicked
  function handleBoardChange(event) {
    setBoardValue(event.target.value);
  }

  // function handleListChange(event) {
  //   event.preventDefault();
  //   setListOfMembers([...listOfMembers, memberValue])
  // }

  function handleEventChange(event) {
    eventValue = event.target.value
  }

  function handleAuctionChange(event) {
    setAuctionInput(event.target.value);
  }

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

  async function handleAuction(event) {
    event.preventDefault();
    const networkId = await web3.eth.net.getId();
    const networkData1 = KSEA_Token.networks[networkId]
    await createAuction(auctionInput, networkData1.address)
    console.log(listOfAuctions);
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
   * 
   */
   async function createAuction(name, tokenAddr) {
    await factory.methods.createAuction(name, tokenAddr).send({from:address});
    await factory.methods.getAuctionAddr(name).call().then(auctionAddr => {
      setListOfAuctions(listOfAuctions => [...listOfAuctions, auctionAddr]);
    });   
  }


  return airdrop && token ? (

    <div>
      {!onboardState.address ?
        <h2>Please Connect Your Wallet</h2>
        :
        <div>
          {/* {bool ? */}
            <div id='officer'>
              <Input onChange={handleBoardChange} placeholder="medium size" size="md" />
              <Button onClick={handleRegister} colorScheme="blue">Register Officer</Button>
              <Input onChange={handleBoardChange} placeholder="medium size" size="md" />
              <Button onClick={handleDeregister} colorScheme="blue">
                Deregister Officer</Button>
              <NumberInput min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button onClick={handleDistribute} colorScheme="blue">Distribute Dobby</Button>
              <NumberInput min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button colorScheme="blue">Distribute Ether</Button>
              <button>Create Checkin Event</button>
              <Input onChange={handleAuctionChange} placeholder="medium size" size="md" />
              <Button onClick={handleAuction} colorScheme="blue">Create Auction</Button>
            </div>
          {/* //   :
          //   <div>You Are Not An Officer</div>
          // } */}

        </div>
      }
    </div>
  ) : (
    <div>Loading...</div>
  )
}