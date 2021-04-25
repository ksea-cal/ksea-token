import {
  Button, 
  Input,
  Stack,
  InputRightAddon,
  InputGroup
} from "@chakra-ui/react"
import './Officer.css'

export default function Createcheckin(
  {auctionName, auctionImg, auctionDuration, 
    handleAuction, handleAuctionChange}
    ) {

  return (
    <Stack spacing={5} className="create-new">
      <h1>Auction Name:</h1>
      <Input
        name="auctionName" 
        value={auctionName}
        onChange={handleAuctionChange} 
        placeholder="name"
      />
      <Stack spacing={2}>
        <h1>Auction Image:</h1>
        <Input
          name="auctionImg"
          value={auctionImg}
          onChange={handleAuctionChange} 
          placeholder="img link"
        />
      </Stack>
      <h1>Auction Duration:</h1>
      <InputGroup>
        <Input
          name="auctionDuration" 
          type="number"
          value={auctionDuration}
          onChange={handleAuctionChange} 
          placeholder="duration"
        />
        <InputRightAddon children="DAY(S)" />
      </InputGroup>
      <Button 
        onClick={handleAuction} 
        colorScheme="blue">
        Create Auction
      </Button>
    </Stack>
  )
}