pragma solidity >= 0.5.0 < 0.7.0;

import "./KSEAuction.sol";

contract AuctionFactory {

    address addr;

    struct AuctionItem {
        string name;
        uint256 startPrice;
        address auctionAddr;
    }
    mapping (string => AuctionItem) private auctions;
    
    function createAuction(
        string calldata _name,
        uint256 _startPrice,
        uint256 _biddingTime,
        address _dobbyToken
    ) external returns (bool) {
        KSEAuction k = new KSEAuction(_biddingTime, _startPrice, _dobbyToken, msg.sender);
        addr = address(k);
        auctions[_name].name = _name;
        auctions[_name].startPrice = _startPrice;
        auctions[_name].auctionAddr = addr;
        return true;
    }

    function getAuctionAddr(string calldata _name) external view returns(address) {
        return auctions[_name].auctionAddr;
    }
    
    function getItemName(string calldata _name) external view returns(string memory) {
        return auctions[_name].name;
    }
    
    function getStartPrice(string calldata _name) external view returns(uint256) {
        return auctions[_name].startPrice;
    }
}
