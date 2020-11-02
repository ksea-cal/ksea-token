const assert = require('assert')
const KSEAuction = artifacts.require("KSEAuction");
const KSEAToken = artifacts.require("KSEAToken");
const KSEAirdrop = artifacts.require("KSEAirdrop");

let accounts;
let token;
let auction;
let airdrop;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  token = await KSEAToken.deployed();
  auction = await KSEAuction.deployed();
  airdrop = await KSEAirdrop.deployed();
});

contract("KSEAuction", async () => {
  it ("highestBid function test", async () => {
    await token.approve(airdrop.address, 100);
    await airdrop.distributeEther([accounts[1], accounts[2]], {from: accounts[0], value: 2e18});
    await airdrop.distributeDobbyTokens([accounts[1], accounts[2], accounts[3]], 100, {from: accounts[0]});

    await auction.bid(10, {from: accounts[1]});
    assert.equal(10, auction.highestBid());
    await auction.bid(10, {from: accounts[2]});
    await auction.bid(30, {from: accounts[3]});
    assert.equal(30, auction.highestBid());
  });

  it ("withdraw function test", async () => {
    let status = auction.withdraw({from: accounts[2]});
    assert.true(status);
  });

  it ("getTotalBids function test", async () => {
    await auction.bid(50, {from: accounts[1]});
    assert.equal(90, auction.getTotalBids());
  });

  it ("auctionEnd function test", async () => {

  });
});
