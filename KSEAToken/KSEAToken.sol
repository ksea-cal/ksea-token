// SPDX-License-Identifier: UNLICENSED

/** 
* @title KSEA Standard EIP 20 Token 
* 
* @dev KSEA Tokens for incentivizing members to participate more in KSEA activities 
* by awarding members with a KSEA Token per attendance
* Implements EIP20 token standard: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
*/


pragma solidity ^0.4.12;

import "./EIP20Interface.sol";
import "./SafeMath.sol";

/// @notice KSEA Token Contract by implementing EIP20 Interface
contract KSEAToken is EIP20Interface {
    using SafeMath for uint256;

    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    string public name;
    
    constructor(uint256 _initialSupply) public {
        balances[msg.sender] = _initialSupply;               // Give the creator all initial tokens
        totalSupply = _initialSupply;                        // Update total supply
        name = "KSEA Token";                                 // Set the name of token to 'KSEA Token'
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value && _value < 10); // Ensure number of tokens sent is less than 10 
        require(_to != address(0));
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); 
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value);
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
        require(_value < 10); 
        require(_spender != address(0));
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); 
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}