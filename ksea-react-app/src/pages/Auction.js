import React, {useState, useRef} from 'react';
import {Container, Row, Button, Col, Form, Card, ListGroup, ListGroupItem} from 'react-bootstrap'

function Auction(props) {

  // useEffect(() => {
  //   async function fetchData() {
  //     await loadWeb3()
  //     await loadBlockchainData()
  //   }
  //   fetchData();
  // }, [])
  
  function handleBidAmount(event) {
    setBidAmount(event.target.value);
  }

  function handleBid(event) {
    event.preventDefault();
    props.bid(bidAmount);

  }

  const [bidAmount, setBidAmount] = useState(0);
  const [itemName, setItemName] = useState('');
  const [entryFee, setEntryFee] = useState(0);

  return (
    <div className="auction">
      <Container>
        <Card className="text-center">
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Body>
            <Card.Title>{itemName}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Entering Fee: {entryFee}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Form.Group>
          <Form.Control onChange={handleBidAmount} type="number" placeholder="Bid amount in Dobby" />
          <Button onClick={handleBid}  variant="primary" type="submit">
            Bid
          </Button>
        </Form.Group>
      </Container>
      
    </div>
  );
}

export default Auction;