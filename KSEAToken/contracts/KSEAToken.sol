// SPDX-License-Identifier: UNLICENSED

pragma solidity >= 0.5.0 < 0.7.0;

// //SafeMath Library
// library SafeMath {
//     function add(uint256 a, uint256 b) internal pure returns (uint256) {
//         uint256 c = a + b;
//         require(c >= a, "SafeMath: addition overflow");

//         return c;
//     }

//     function sub(uint256 a, uint256 b) internal pure returns (uint256) {
//         return sub(a, b, "SafeMath: subtraction overflow");
//     }

//     function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
//         require(b <= a, errorMessage);
//         uint256 c = a - b;

//         return c;
//     }

//     function mul(uint256 a, uint256 b) internal pure returns (uint256) {
//         if (a == 0) {
//             return 0;
//         }

//         uint256 c = a * b;
//         require(c / a == b, "SafeMath: multiplication overflow");

//         return c;
//     }

//     function div(uint256 a, uint256 b) internal pure returns (uint256) {
//         return div(a, b, "SafeMath: division by zero");
//     }

//     function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
//         require(b > 0, errorMessage);
//         uint256 c = a / b;
//         // assert(a == b * c + a % b); // There is no case in which this doesn't hold

//         return c;
//     }

//     function mod(uint256 a, uint256 b) internal pure returns (uint256) {
//         return mod(a, b, "SafeMath: modulo by zero");
//     }

//     function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
//         require(b != 0, errorMessage);
//         return a % b;
//     }
// }

// contract EIP20Interface {

//     uint256 public totalSupply;

//     function balanceOf(address _owner) public view returns (uint256 balance);
//     function transfer(address _to, uint256 _value) public returns (bool success);
//     function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
//     function approve(address _spender, uint256 _value) public returns (bool success);
//     function allowance(address _owner, address _spender) public view returns (uint256 remaining);

//     event Transfer(address indexed _from, address indexed _to, uint256 _value);
//     event Approval(address indexed _owner, address indexed _spender, uint256 _value);
// }

import "./SafeMath.sol";
import "./EIP20Interface.sol";

/** 
* @title KSEA Standard EIP 20 Token 
* 
* @dev KSEA Tokens for incentivizing members to participate more in KSEA activities 
* by awarding members with a KSEA Token per attendance
* Implements EIP20 token standard: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
*/

/// @notice KSEA Token Contract by implementing EIP20 Interface
contract KSEAToken is EIP20Interface {
    using SafeMath for uint256;

    string public name;
    string public symbol;

    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    
    constructor(uint256 _initialSupply, string memory _name, string memory _symbol) public {
        balances[msg.sender] = _initialSupply;               // Give the creator all initial tokens
        totalSupply = _initialSupply;                        // Update total supply
        symbol = _symbol;                                    // Set the symbol of token to _symbol
        name = _name;                                        // Set the name of token to _name
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value && _value <= 10, "Not enough balance or You are sending more than 10 tokens"); // Ensure number of tokens sent is less than 10 
        require(_to != address(0));
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value); 
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value, "Not enough balance or Not enough allowance");
        balances[_to] = balances[_to].add(_value);
        balances[_from] = balances[_from].sub(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value); // Decrement allowance 
        emit Transfer(_from, _to, _value); 
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner]; 
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_value <= 10, "You can only approve less than 10 tokens"); 
        require(_spender != address(0));
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); 
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
