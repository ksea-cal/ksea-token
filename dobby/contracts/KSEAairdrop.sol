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


contract KSEAairdrop is Ownable {
    using SafeMath for uint256;

    // DobbyFactory private dobbyFactory;
    EIP20Interface private dobbyToken;
    // EIP20Interface private semesterToken;

    // Board Member mapping set up
    mapping (address => bool) private boardMembers;

    //event section
    event RegisteredBoardMember(address indexed _boardMember, bool indexed _flag);
    event DeregisteredBoardMember(address indexed _boardMember, bool indexed _flag);
    event TransferredToken(address indexed _to, uint256 _value);
    event FailedTransfer(address indexed _to, uint256 _value);

    constructor(address _dobbyToken) public {
        dobbyToken = EIP20Interface(_dobbyToken);
    }

    // Register board member and emit Registered Board Member event 
    function registerBoardMember(address _boardMember) onlyOwner external {
        boardMembers[_boardMember] = true;
        emit RegisteredBoardMember(_boardMember, true);
    }

    // Deregister board member and emit Registered Board Member event 
    function deregisterBoardMember(address _boardMember) onlyOwner external {
        boardMembers[_boardMember] = false;
        emit DeregisteredBoardMember(_boardMember, true);
    }

    // Check if address corresponds to a Board Member 
    // TODO: This is currently a hack using Solidity internals 
    function isBoardMember(address _boardMember) public view returns (bool) {
        return boardMembers[_boardMember]; // Notice Solidity initializes maps with False 
    }

    // Ether Distribution function
    function distributeEther(address[] calldata _members, uint256 _value) onlyOwner external {

    } 
 
    // Distribute tokens to a list of members 
    function distributeTokens(address[] calldata _members, uint256 _value) external {
        require(isBoardMember(msg.sender) == true, "You are not the board member!");
        for (uint i = 0; i < _members.length; i++) {
            sendInternally(_members[i], _value);
        }
    }

    // Distribute token to one recipient 
    function sendInternally(address recipient, uint256 tokensToSend) internal {
        if (recipient == address(0)) return;

        if (tokensAvailable() >= tokensToSend) {
            dobbyToken.transferFrom(msg.sender, recipient, tokensToSend);
            emit TransferredToken(recipient, tokensToSend);
        } else {
            emit FailedTransfer(recipient, tokensToSend); 
        }
    }  

    // Check how much tokens are currently available 
    function tokensAvailable() view internal returns (uint256) {
        return dobbyToken.balanceOf(owner);
    }  
}