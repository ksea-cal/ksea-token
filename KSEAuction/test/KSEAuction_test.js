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
    await token.approve(airdrop.address, 10000, {from: accounts[0]});
    await airdrop.registerBoardMember(accounts[0]);
    await airdrop.distributeDobbyTokens([accounts[1], accounts[2], accounts[3]], 100, {from: accounts[0]});


    await token.approve(auction.address, 10000, {from: accounts[1]});
    await auction.bid(10, {from: accounts[1]});
    let highBid1 = await auction.getHighestBid();
    assert.equal(10, highBid1);
    await token.approve(auction.address, 10000, {from: accounts[2]});
    await auction.bid(15, {from: accounts[2]});
    await token.approve(auction.address, 10000, {from: accounts[3]});
    await auction.bid(30, {from: accounts[3]});
    let highBid2 = await auction.getHighestBid();
    assert.equal(30, highBid2);
  });

  it ("withdraw function test", async () => {
    let status = auction.withdraw({from: accounts[1]});
    let bal1 = await token.balanceOf(accounts[1]);
    let bal1Parsed = await parseFloat(bal1);
    assert.equal(100, bal1Parsed);
  });

  it ("internal withdraw test", async() => {
    await auction.bid(40, {from: accounts[2]});
    let bal2 = await token.balanceOf(accounts[2]);
    let bal2Parsed = await parseFloat(bal2);
    assert.equal(60, bal2Parsed);
  });

  it ("getTotalBids function test", async () => {
    await auction.bid(50, {from: accounts[1]});
    let totBid = await auction.getTotalBids();
    let totBidParsed = await parseFloat(totBid);
    assert.equal(120, totBidParsed);
  });

  it ("auctionEnd function test", async () => {
    evm_
  });
});
