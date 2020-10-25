const assert = require('assert');
const KSEAToken = artifacts.require("KSEAToken");
const KSEAairdrop = artifacts.require("KSEAairdrop");

let accounts;
let airdrop;
let token;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    token = await KSEAToken.deployed();
    airdrop = await KSEAairdrop.deployed(token.address);
});

contract("KSEAairdrop", async () => {
    it("should register board member", async () => {
        await airdrop.registerBoardMember(accounts[0], {from:accounts[0]});

        let board = await airdrop.isBoardMember(accounts[0]);

        assert.equal(board,true);
    })

    it("accounts[0] is the owner", async () => {
        let owner = await airdrop.owner();
        assert.equal(owner, accounts[0]);
    })

    it("balance of accounts[0]", async () => {
        let bal0 = await token.balanceOf(accounts[0]);
        assert.equal(bal0, 10000);
    })

    it("sendInternally", async () => {
        await token.approve(airdrop.address, 100);

        await airdrop.sendInternally(accounts[1], 5, {from:accounts[0]});

        let bal = await token.balanceOf(accounts[1]);
        assert.equal(bal, 5);
    })

    it("distributeTokens", async () => {
       await airdrop.distributeTokens([accounts[1], accounts[2]], 5, {from: accounts[0]});

       let bal1 = await token.balanceOf(accounts[1]);
       let bal1Num = await parseFloat(bal1);
       let bal2 = await token.balanceOf(accounts[2])
       ;
       let bal2Num = await parseFloat(bal2);

       assert.equal(bal1Num, 10);
       assert.equal(bal2Num, 5);
    });
    
});