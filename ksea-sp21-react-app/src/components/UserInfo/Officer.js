import './Officer.css'
import kseaToken from '../ethereum/KSEA_Token'
import kseAirdrop from '../ethereum/KSEAirdrop'
import { useEffect, useState, useRef } from 'react'

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

export default function Officer({user, onboardState}) {
  useEffect(() => {
    async function fetchData() {

      let t = await kseaToken()
      setToken(t);

      let a = await kseAirdrop()
      setAirdrop(a);
    }
    fetchData();
  }, []);

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
    await airdrop.methods.registerBoardMember(_address).send({from:user})
    let board = await airdrop.methods.isBoardMember(_address).call();
    console.log("IsBoardMember: ", board);
  }

  async function deregisterBoardMem(_address) {
    await airdrop.methods.deregisterBoardMember(_address).send({from:user})
    let board = await airdrop.methods.isBoardMember(_address).call();
    console.log("IsBoardMember: ", board);
  }

  async function distributeTokens(_addresses, _value) {
    let total_val = _value * _addresses.length
    await token.methods.approve(airdrop._address, total_val).send({from:user});
    await airdrop.methods.distributeDobbyTokens(_addresses, _value).send({from:user})
    console.log(total_val)
  }

  const [airdrop, setAirdrop] = useState(null);
  const [token, setToken] = useState(null);
  const [boardValue, setBoardValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [listOfMembers, setListOfMembers] = useState([]);
  const [eventName, setEventName] = useState('');
  let eventValue = useRef(0);

  return airdrop && token ? (
    <div>
      {!onboardState.address ?
        <h2>Please Connect Your Wallet</h2>
        :
        <div>
          <div id='officer'>
            <Input onChange={handleBoardChange} placeholder="medium size" size="md" />
            <Button onClick={handleRegister} colorScheme="blue">Register Officer</Button>
            <Input onChange={handleBoardChange} placeholder="medium size" size="md" />
            <Button onClick={handleDeregister} colorScheme="blue">
              Deregister Officer</Button>
            <Select onChange={handleEventChange} placeholder="Choose Event">
              <option value="2">GM: 2 Dobbies</option>
              <option value="3">Focus Group: 3 Dobbies</option>
              <option value="1">KSEA Chat: 1 Dobby</option>
              <option value="4">Lead Focus Group: 4 Dobbies</option>
              <option value="1">Small Group: 1 Dobby</option>
              <option value="1">Social: 1 Dobby</option>
              <option value="1">Workshop: 1 Dobby</option>
              <option value="1">Review: 1 Dobby</option>
            </Select>
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
            <button>Create Auction</button>
          </div>
        </div>
      }
    </div>
  ) : (
    <div>Loading...</div>
  )
}