import React, {useState, useEffect, useRef} from 'react';
import {Container, Row, Button, Col, Form} from 'react-bootstrap'
import loadAccount from "../components/ethereum/LoadAccount";
import kseaToken from "../components/ethereum/KSEA_Token";
import kseairdrop from "../components/ethereum/KSEAirdrop";
import kseafactory from "../components/ethereum/AuctionFactory";
import web3 from "../components/ethereum/Web3";
import KSEA_Auction from "../abis/KSEAuction.json";

const axios = require('axios').default;


function Officer(props) {

  useEffect(() => {
    async function fetchData() {
      let accounts = await loadAccount()
      setAccount(accounts);

      let t = await kseaToken()
      setToken(t);

      let a = await kseairdrop()
      setAirdrop(a);

      let f = await kseafactory()
      setFactory(f);
    }
    fetchData();
  }, [])

  function handleBoardChange(event) {
    setBoardValue(event.target.value);
  }

  function handleMemberChange(event) {
    setMemberValue(event.target.value);
  }

  function handleListChange(event) {
    event.preventDefault();
    setListOfMembers([...listOfMembers, memberValue])
  }

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

    let formData = new FormData();
    formData.append('members', listOfMembers); 
    formData.append('points', eventValue); 
    axios.post("http://127.0.0.1:5000/award", formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
  }

  function handlePassword(event) { 
    setPassword(event.target.value);
  }

  function handleTimeLimit(event) { 
    setTimeLimit(event.target.value);
  }

  function handleEventName(event) { 
    setEventName(event.target.value);
  }

  // Airdrop Section

  async function registerBoardMem(_address) {
    await airdrop.methods.registerBoardMember(_address).send({from:account})
    let board = await airdrop.methods.isBoardMember(_address).call();
    console.log("IsBoardMember: ", board);
  }

  async function deregisterBoardMem(_address) {
    await airdrop.methods.deregisterBoardMember(_address).send({from:account})
    let board = await airdrop.methods.isBoardMember(_address).call();
    console.log("IsBoardMember: ", board);
  }

  async function distributeTokens(_addresses, _value) {
    let total_val = _value * _addresses.length
    await token.methods.approve(airdrop._address, total_val).send({from:account});
    await airdrop.methods.distributeDobbyTokens(_addresses, _value).send({from:account})
    console.log(total_val)
  }

  //Auction Section
<<<<<<< HEAD
  // async function createAuction(_name, _entryFee, _biddingTime, _dobbyToken) {
  //   // let web3 = window.web3
  //   await factory.methods.createAuction(_name, _entryFee, _biddingTime, _dobbyToken).send({from:account});

  //   let auctionAddr = await factory.methods.getAuctionAddr(_name).call();
  //   console.log("auction address:", auctionAddr)
  //   setAuctionAddr(auctionAddr);
  //   setAuctionName(_name);
  //   setUpdate(!update);
  // }

  // function auctionInstanceCreate(addr) {
  //   const auctionInst = new web3.eth.Contract(KSEA_Auction.abi, addr);
  //   setAuction(auctionInst);
    
    
  // }

  //   // let itemName = await auctionFactory.methods.getItemName(_name).call();
  //   // setItemName(itemName);
  //   // console.log("name:", itemNames);
  //   // let entryFee = await auctionFactory.methods.getEntryFee(_name).call();
  //   // setEntryFee(entryFee);
  //   // console.log("Entry fee:", entryFees);

  // useEffect(() => {
  //   async function fetchData() {
  //     auctionInstanceCreate(auctionAddr);
  //     let itemName = await auction.methods.getItemName(auctionName).call();
  //     setAuctionItem(itemName);

  //     let entryFee = await auction.methods.getEntryFee(auctionName).call();
  //     setAuctionFee(entryFee);
  //   }
  //   fetchData();
  // }, [update])
=======
  async function createAuction(_name, _entryFee, _biddingTime, _dobbyToken) {
    // let web3 = window.web3
    await factory.methods.createAuction(_name, _entryFee, _biddingTime, _dobbyToken).send({from:account});

    let auctionAddr = await factory.methods.getAuctionAddr(_name).call();
    console.log("auction address:", auctionAddr)
    setAuctionAddr(auctionAddr);
    setAuctionName(_name);
    setUpdate(!update);
  }

  function auctionInstanceCreate(addr) {
    const auctionInst = new web3.eth.Contract(KSEA_Auction.abi, addr);
    setAuction(auctionInst);
    
    
  }

    // let itemName = await auctionFactory.methods.getItemName(_name).call();
    // setItemName(itemName);
    // console.log("name:", itemNames);
    // let entryFee = await auctionFactory.methods.getEntryFee(_name).call();
    // setEntryFee(entryFee);
    // console.log("Entry fee:", entryFees);

  useEffect(() => {
    async function fetchData() {
      auctionInstanceCreate(auctionAddr);
      let itemName = await auction.methods.getItemName(auctionName).call();
      setAuctionItem(itemName);

      let entryFee = await auction.methods.getEntryFee(auctionName).call();
      setAuctionFee(entryFee);
    }
    fetchData();
  }, [update])
>>>>>>> 73d907a7bbd79f3d77603bec12735b15c8d6cf3f

  // Push Check-in information to the database 
  function handleCheckIn(event) { 
    let formData = new FormData();
    formData.append('password', password); 
    formData.append('timeLimit', timeLimit); 
    formData.append('eventName', eventName); 
    axios.post("http://127.0.0.1:5000/createcheckin", formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });

  }

  //Auction Handlers
<<<<<<< HEAD
  // function handleEntryFee(event) {
  //   setEntryFee(event.target.value);
  // }

  // function handleItemChange(event) {
  //   setItemValue(event.target.value);
  // }
  // function handleTimeChange(event) {
  //   setTimeValue(event.target.value); 
  // }

  // function showState(event) {
  //   event.preventDefault();
  //   console.log("Auction Instance!!: ", auction);
  //   console.loge("Auction Item: ", auctionItem);
  //   console.log("Auction Fee: ", auctionFee);
  // }

  // function handleCreate(event) {
  //   event.preventDefault();
  //   console.log("dobby address: ", token.options.address);
  //   createAuction(itemValue, entryFee, timeValue, token.options.address);
  // }
=======
  function handleEntryFee(event) {
    setEntryFee(event.target.value);
  }

  function handleItemChange(event) {
    setItemValue(event.target.value);
  }
  function handleTimeChange(event) {
    setTimeValue(event.target.value); 
  }

  function showState(event) {
    event.preventDefault();
    console.log("Auction Instance!!: ", auction);
    console.loge("Auction Item: ", auctionItem);
    console.log("Auction Fee: ", auctionFee);
  }

  function handleCreate(event) {
    event.preventDefault();
    console.log("dobby address: ", token.options.address);
    createAuction(itemValue, entryFee, timeValue, token.options.address);
  }
>>>>>>> 73d907a7bbd79f3d77603bec12735b15c8d6cf3f

  //Blockchain States
  const [account, setAccount] = useState('');
  const [airdrop, setAirdrop] = useState(null);
  const [token, setToken] = useState(null);
  const [factory, setFactory] = useState(null);
  const [auction, setAuction] = useState(null);
  const [update, setUpdate] = useState(false);

  //Auction
  const [auctionItem, setAuctionItem] = useState('');
  const [auctionFee, setAuctionFee] = useState(0);
  const [auctionName, setAuctionName] = useState('');
  const [auctionAddr, setAuctionAddr] = useState('');

  const [boardValue, setBoardValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [timeValue, setTimeValue] = useState(0);
  const [itemValue, setItemValue] = useState('');
  const [entryFee, setEntryFee] = useState(0);
  const [listOfMembers, setListOfMembers] = useState([]);
  const [password, setPassword] = useState('');
  const [eventName, setEventName] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);

  let eventValue = useRef(0);

  return (
    <div className="officer">
      <br/><br/>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Register Board Member</Form.Label>
                <Form.Control type="text" onChange={handleBoardChange} placeholder="Board Member Address" />
              </Form.Group>
              <Button onClick={handleRegister} variant="primary" type="submit">
                Register
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Deregister Board Member</Form.Label>
                <Form.Control type="text" onChange={handleBoardChange} placeholder="Board Member Address" /> 
              </Form.Group>
              <Button onClick={handleDeregister}  variant="primary" type="submit">
                Deregister
              </Button>
            </Col>          
          </Row>
          <br/><br/>

          <Form.Group>
            <Form.Label>Loyal Dobbies!</Form.Label>
            <Form.Control onChange={handleMemberChange} type="list" placeholder="list of Dobbies" />
            <Button onClick={handleListChange}  variant="primary" type="submit">
              Add Member
            </Button>
          </Form.Group>

          <ul>
            {listOfMembers.map((member, key) => {
              return(
                <li key={key}>{member}</li>
              )
            })}
          </ul>

          <Form.Group>
          <Form.Label>Type of Event</Form.Label>
            <Form.Control onChange={handleEventChange} as="select" size="sm" custom>
              <option value="0">Choose Event</option>
              <option value="2">GM: 2 Dobbies</option>
              <option value="3">Focus Group: 3 Dobbies</option>
              <option value="1">KSEA Chat: 1 Dobby</option>
              <option value="4">Lead Focus Group: 4 Dobbies</option>
              <option value="1">Small Group: 1 Dobby</option>
              <option value="1">Social: 1 Dobby</option>
              <option value="1">Workshop: 1 Dobby</option>
              <option value="1">Review: 1 Dobby</option>
            </Form.Control>
          </Form.Group>
          <Button onClick={handleDistribute} variant="primary" type="submit">
            Send Dobbies!
          </Button>
          <br /> <br />
<<<<<<< HEAD
          {/* <Form.Group>
=======
          <Form.Group>
>>>>>>> 73d907a7bbd79f3d77603bec12735b15c8d6cf3f
            <Row>
              <Col>
                <Form.Label>Auction Item</Form.Label>
                <Form.Control onChange={handleItemChange} type="string" placeholder="Item Name" />
              </Col>
              <Col>
                <Form.Label>Entering Fee</Form.Label>
                <Form.Control onChange={handleEntryFee} type="string" placeholder="Entering Fee in Dobby" />
              </Col>
              <Col>
                <Form.Label>Auction Time Limit</Form.Label>
                <Form.Control onChange={handleTimeChange} type="number" placeholder="Time in seconds" />
              </Col>
                <Button onClick={handleCreate}  variant="primary" type="submit">
                  Create Auction
                </Button>
            </Row>
<<<<<<< HEAD
          </Form.Group> */}
=======
          </Form.Group>
>>>>>>> 73d907a7bbd79f3d77603bec12735b15c8d6cf3f
          
          
          <br></br>
          <Form.Group>
            <Form.Label>Create Check-In</Form.Label>
            <Form.Control type="text" onChange={handleEventName} placeholder="Event Name" /> 
            <Form.Control type="text" onChange={handlePassword} placeholder="Password" /> 
            <Form.Control type="int" onChange={handleTimeLimit} placeholder="0"/> 
          </Form.Group>
          <Button onClick={handleCheckIn}  variant="primary" type="submit">
            Create Check-In
          </Button>
        </Form>
<<<<<<< HEAD
=======
        <Button onClick={showState}>show State!</Button>
>>>>>>> 73d907a7bbd79f3d77603bec12735b15c8d6cf3f
      </Container>
    </div>
  );
}

export default Officer;
