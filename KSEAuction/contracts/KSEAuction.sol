// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.5.0 < 0.7.0;

// import "../../KSEAToken/contracts/SafeMath.sol";
// import "../../KSEAToken/contracts/EIP20Interface.sol";
import "../../KSEAToken/contracts/KSEAToken.sol";

contract Ownable {

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Ownable: caller is not owner");
    _;
  }

  function transferOwnership(address newOwner) onlyOwner public {
    require(newOwner != address(0));
    owner = newOwner;
  }
}

contract Auction is Ownable {
    using SafeMath for uint256;

    EIP20Interface private dobbyToken;

    uint256 public auctionEndTime; 
    uint256 public highestBid; 
    address public highestBidder; 
    bool ended;

    address[] bidders;

    // Allowed withdrawals of previous bids
    mapping(address => uint) pendingReturns;
    mapping(address => uint) public bids; 

      

    // modifier an_ongoing_auction() { require(now <= auction_end);
    // _;
    // }

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    constructor(uint256 _biddingTime, address _dobbyToken) public {
        auctionEndTime = now + _biddingTime;
        dobbyToken = EIP20Interface(_dobbyToken);
    }
    
    function bid(uint256 _amount) public payable {
        require(
            now <= auctionEndTime,
            "Auction already ended."
        );

        require(
            msg.value > highestBid,
            "There already is a higher bid."
        );

        if (highestBid != 0) {
            // Sending back the money by simply using
            // highestBidder.send(highestBid) is a security risk
            // because it could execute an untrusted contract.
            // It is always safer to let the recipients
            // withdraw their money themselves.
            pendingReturns[highestBidder] += highestBid;
        }
        dobbyToken.transferFrom(msg.sender, address(this), _amount);
        highestBidder = msg.sender;
        highestBid = _amount;
        emit HighestBidIncreased(msg.sender, _amount);
    }

    /// Withdraw a bid that was overbid.
    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before `send` returns.
            pendingReturns[msg.sender] = 0;
            dobbyToken.transferFrom(address(this), msg.sender, amount);

            if (!msg.sender.send(amount)) {
                // No need to call throw here, just reset the amount owing
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    /// End the auction and send the highest bid
    /// to the beneficiary.
    function auctionEnd() public {
        // It is a good guideline to structure functions that interact
        // with other contracts (i.e. they call functions or send Ether)
        // into three phases:
        // 1. checking conditions
        // 2. performing actions (potentially changing conditions)
        // 3. interacting with other contracts
        // If these phases are mixed up, the other contract could call
        // back into the current contract and modify the state or cause
        // effects (ether payout) to be performed multiple times.
        // If functions called internally include interaction with external
        // contracts, they also have to be considered interaction with
        // external contracts.

        // 1. Conditions
        require(now >= auctionEndTime, "Auction not yet ended.");
        require(!ended, "auctionEnd has already been called.");

        // 2. Effects
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // 3. Interaction
        dobbyToken.transferFrom(address(this), owner, highestBid);
    }

    function getTotalBids() public view returns (uint256) {
        return dobbyToken.balanceOf(address(this));
    }
}
