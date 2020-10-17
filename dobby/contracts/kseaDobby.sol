pragma solidity >= 0.5.0 < 0.7.0;

// import "../KSEAToken/contracts/SafeMath.sol";
// import "../KSEAToken/contracts/EIP20Interface.sol";
import "../../KSEAToken/contracts/KSEAToken.sol";

// contract DobbyFactory {
//     function createDobby(
//         uint256 calldata _initialSupply,
//         string calldata _name,
//         string calldata _symbol
//     ) external returns (address) {
//         KSEAToken instance = new KSEAToken(_initialSupply, _name, _symbol);
//         // p.transferOwnership(msg.sender);
//         address addr = address(instance);

//         return addr;
//     }
// }

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


contract KSEADobby is Ownable {
    using SafeMath for uint256;

    // DobbyFactory private dobbyFactory;
    EIP20Interface private dobbyToken;

    //mapping, struct, variable Set up
    mapping (address => bool) private boardMembers;

    //event section
    event RegisterBoardMember(address indexed _boardMember, bool indexed _flag);
    event DeregisterBoardMember(address indexed _boardMember, bool indexed _flag);
    event TransferredToken(address indexed _to, uint256 _value);
    event FailedTransfer(address indexed _to, uint256 _value);

    constructor(address _dobbyToken) public {
        //dobbyFactory = DobbyFactory(_dobbyFactory);
        dobbyToken = EIP20Interface(_dobbyToken);
    }

    //board member mamagement
    function registerBoardMember(address _boardMember) onlyOwner external {
        boardMembers[_boardMember] = true;
        emit RegisterBoardMember(_boardMember, true);
    }

    function deregisterBoardMember(address _boardMember) onlyOwner external {
        boardMembers[_boardMember] = false;
        emit DeregisterBoardMember(_boardMember, false);
    }

    function isBoardMember(address _boardMember) public view returns (bool) {
        return boardMembers[_boardMember];
    }
 
    //send tokens to users 
    function distributeTokens(address[] calldata _members, uint256 _value) onlyOwner external {
        require(isBoardMember(msg.sender) == true, "You are not the board member!");
        uint256 i = 0;
        uint256 toSend = _value;
        while (i < _members.length) {
            sendInternally(_members[i] , toSend, _value);
            i++;
        }
    }

    function sendInternally(address recipient, uint256 tokensToSend, uint256 valueToPresent) internal {
        if(recipient == address(0)) return;

        if(tokensAvailable() >= tokensToSend) {
        dobbyToken.transfer(recipient, tokensToSend);
        emit TransferredToken(recipient, valueToPresent);
        } else {
        emit FailedTransfer(recipient, valueToPresent); 
        }
    }   


    function tokensAvailable() view internal returns (uint256) {
        return dobbyToken.balanceOf(this);
    }  

    // function getBalance(address _member) public returns(uint256) {
    //     return 
    // }

    
}