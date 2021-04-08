// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.7.0;

import "../../KSEAToken/contracts/KSEAToken.sol";
import "../../KSEAirdrop/contracts/KSEAirdrop.sol";


/**
=== RULE OF THE AUCTION ===
1. Blind Auction: The highest Bid is visible but becomes invisible at the last 1 hour.
2. There is no entry fee to enter the auction
3. There is no Bid Limit!
4. You cannot withdraw you bids. You can only add on more bids.
 */

contract KSEAuction is Ownable {
    using SafeMath for uint256;

    EIP20Interface private dobbyToken;

    uint256 public auctionEndTime;
    uint256 public highestBid;
    address public highestBidder;
    bool ended;

    address[] bidders;

    // maps address to user's total bid
    mapping(address => uint256) public bids;

    //checks if this user already bidded 
    mapping(address => bool) private bidChecker;

    event HighestBidIncreased(address bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);

    constructor(
        uint256 _biddingTime,
        address _dobbyToken,
        address _owner
    ) public {
        auctionEndTime = block.timestamp + _biddingTime;
        dobbyToken = EIP20Interface(_dobbyToken);
        owner = _owner;
    }

    /**
    Bid Function handles the token transaction from user's wallet to this smart contract. If the user already has bids staked in the contract, the new bids gets added on to their total bids. 
     */
    function bid(uint256 _amount) public {
    
    }

    /// End the auction and send the highest bid
    /// to the beneficiary.
    function auctionEnd() public {
        // 1. Conditions
        require(block.timestamp >= auctionEndTime, "Auction not yet ended.");
        require(!ended, "auctionEnd has already been called.");

        // 2. Effects
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // 3. Interaction
        dobbyToken.transferFrom(address(this), owner, highestBid);
    }

    //returns the total bids staked in this smart contract
    function getTotalBids() public view returns (uint256) {
        return dobbyToken.balanceOf(address(this));
    }

    //returns the user's current bid
    function getBid(address bidder) public view returns (uint256) {

    }

    //returns the current highest bid
    function getHighestBid() public view returns (uint256) {

    }

    //returns the highest bidder's address
    function getHigestBidder() public view returns (address) {

    }
}
