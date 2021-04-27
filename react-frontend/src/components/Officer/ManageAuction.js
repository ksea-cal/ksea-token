import React, {useState} from 'react';
import {
  Button, 
  Input,
  Stack,
  InputRightAddon,
  InputGroup,
  Switch,
  FormControl,
  FormLabel,
  useToast
} from "@chakra-ui/react";
import './Officer.css';

export default function ManageAuction(
  {auctionName, auctionImg, auctionDuration, 
    handleAuction, handleAuctionChange}
    ) {
  const [deleteAuctionAddr, setDeleteAuctionAddr] = useState('');

  //design
  const toast = useToast();
  const toastIdRef = React.useRef();

  function handleChange(event) {
    const {value} = event.target;
    setDeleteAuctionAddr(value);
  }

  function handleDeleteAuction(event) {
    event.preventDefault();
    /* TODO: DELTE EVENT WITH ID */
    toastIdRef.current = toast({ description: `not implemented yet` })
  }

  return (
    <Stack spacing={5} className="create-new">
      <h2>Auction Name:</h2>
      <Input
        name="auctionName" 
        value={auctionName}
        onChange={handleAuctionChange} 
        placeholder="name"
      />
      <Stack spacing={2}>
        <h2>Auction Image:</h2>
        <Input
          name="auctionImg"
          value={auctionImg}
          onChange={handleAuctionChange} 
          placeholder="img link"
        />
      </Stack>
      <h2>Auction Duration:</h2>
      <InputGroup>
        <Input
          name="auctionDuration" 
          type="number"
          value={auctionDuration}
          onChange={handleAuctionChange} 
          placeholder="duration"
        />
        <InputRightAddon children="hour" />
      </InputGroup>
      <Button 
        onClick={handleAuction} 
        colorScheme="green">
        Create Auction
      </Button>

      <h2>Delete Auction</h2>
      <Input
        name="deleteAuctionAddr"
        value={deleteAuctionAddr}
        onChange={handleChange} 
        placeholder="auction contract address"
      />
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="3">
          <h5>Delete All?</h5>
        </FormLabel>
        <Switch id="email-alerts" colorScheme="red" />
      </FormControl>
      <Button onClick={handleDeleteAuction} colorScheme="red">
        Delete Auction
      </Button>
    </Stack>
  )
}