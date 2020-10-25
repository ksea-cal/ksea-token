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

contract KSEAuction is Ownable {
    using SafeMath for uint256;

    // DobbyFactory private dobbyFactory;
    EIP20Interface private dobbyToken;
    // EIP20Interface private semesterToken;

    // Board Member mapping set up
    mapping (address => bool) private boardMembers;

    //event section

    constructor(address _dobbyToken) public {
        dobbyToken = EIP20Interface(_dobbyToken);
    }

    
}