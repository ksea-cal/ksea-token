// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.5.0 < 0.7.0;

import "../../KSEAToken/contracts/SafeMath.sol";
import "../../KSEAToken/contracts/EIP20Interface.sol";
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
    EIP20Interface private semesterToken;

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

    //Token Distribution functions
    function distributeEther(address[] calldata _members, uint256 _value) onlyOwner external {

    } 
 
    //send tokens to users 
    function distributeTokens(address[] calldata _members, uint256 _value) onlyOwner external {
        require(isBoardMember(msg.sender) == true, "You are not the board member!");
        for (uint i = 0; i < _members.length; i++) {
            sendInternally(_members[i], _value);
        }
    }

    function sendInternally(address recipient, uint256 tokensToSend) public {
        if(recipient == address(0)) return;

        if(tokensAvailable() >= tokensToSend) {
        dobbyToken.transferFrom(msg.sender, recipient, tokensToSend);
        emit TransferredToken(recipient, tokensToSend);
        } else {
        emit FailedTransfer(recipient, tokensToSend); 
        }
    }  

    function tokensAvailable() view internal returns (uint256) {
        return dobbyToken.balanceOf(owner);
    }  

    //exchange semester token to dobby token. Don't literally exchange semester token. Just give semester token amount of dobby token. They can keep their semester token. 
    function exchangeToDobby(address _curSemester, address[] memory _memberAccount) public {
        semesterToken = EIP20Interface(_curSemester);
        uint256 i = 0;
        while (i < _memberAccount.length) {
            uint256 semBal = semesterToken.balanceOf(_memberAccount[i]);
            sendInternally(_memberAccount[i], semBal);
            i++;
        }
    }

    //implement Auction functions


    // function getBalance(address _member) public returns(uint256) {
    //     return 
    // }   
}