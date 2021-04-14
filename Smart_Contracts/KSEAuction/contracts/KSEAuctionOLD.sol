// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.7.0;

import "../../KSEAToken/contracts/KSEAToken.sol";
import "../../KSEAirdrop/contracts/KSEAirdrop.sol";

contract KSEAuction_old is Ownable {
    using SafeMath for uint256;

    EIP20Interface private dobbyToken;

    uint256 public auctionEndTime;
    uint256 public highestBid;
    uint256 public entryFee;
    address public highestBidder;
    bool ended;

    address[] bidders;

    // Allowed withdrawals of previous bids
    mapping(address => uint256) pendingReturns;
    mapping(address => uint256) public bids;
    mapping(address => bool) private bidChecker;

    event HighestBidIncreased(address bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);

    constructor(
        uint256 _biddingTime,
        uint256 _entryFee,
        address _dobbyToken,
        address _owner
    ) public {
        auctionEndTime = block.timestamp + _biddingTime;
        dobbyToken = EIP20Interface(_dobbyToken);
        entryFee = _entryFee;
        owner = _owner;
    }

    function bid(uint256 _amount) public {
        require(block.timestamp <= auctionEndTime, "Auction already ended.");

        require(_amount > highestBid, "There already is a higher bid.");

        if (highestBid != 0) {
            pendingReturns[highestBidder] += highestBid;
        }

        if (bidChecker[msg.sender] == true) {
            internalWithdraw(msg.sender);
            dobbyToken.transferFrom(msg.sender, address(this), _amount);
        } else {
            uint256 premiumBid = _amount + entryFee;
            dobbyToken.transferFrom(msg.sender, address(this), premiumBid);
            bidChecker[msg.sender] = true;
        }

        highestBidder = msg.sender;
        highestBid = _amount;

        emit HighestBidIncreased(msg.sender, _amount);
    }

    function internalWithdraw(address member) internal returns (bool) {
        uint256 amount = pendingReturns[member];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
            if (dobbyToken.transfer(member, amount)) {
                return true;
            } else {
                pendingReturns[member] = amount;
                return false;
            }
        }
    }

    /// Withdraw a bid that was overbid.
    function withdraw() public returns (bool) {
        uint256 amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
            if (dobbyToken.transfer(msg.sender, amount)) {
                return true;
            } else {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
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

    function getTotalBids() public view returns (uint256) {
        return dobbyToken.balanceOf(address(this));
    }
}
