const assert = require('assert');
const KSEAToken = artifacts.require("KSEAToken");
const KSEADobby = artifacts.require("KSEADobby");

let accounts;
let dobby;
let token;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    token = await KSEAToken.deployed();
    dobby = await KSEADobby.deployed(token.address);
});

contract("KSEADobby", async () => {
    it("should register board member", async () => {
        await dobby.registerBoardMember(accounts[0], {from:accounts[0]});

        let board = await dobby.isBoardMember(accounts[0]);

        assert.equal(board,true);
    })

    it("accounts[0] is the owner", async () => {
        let owner = await dobby.owner();
        assert.equal(owner, accounts[0]);
    })

    it("balance of accounts[0]", async () => {
        let bal0 = await token.balanceOf(accounts[0]);
        assert.equal(bal0, 10000);
    })

    it("sendInternally", async () => {
        await token.approve(dobby.address, 100);

        await dobby.sendInternally(accounts[1], 5, {from:accounts[0]});

        let bal = await token.balanceOf(accounts[1]);
        assert.equal(bal, 5);
    })

    it("distributeTokens", async () => {
       await dobby.distributeTokens([accounts[1], accounts[2]], 5, {from: accounts[0]});

       let bal1 = await token.balanceOf(accounts[1]);
       let bal1Num = await parseFloat(bal1);
       let bal2 = await token.balanceOf(accounts[2])
       ;
       let bal2Num = await parseFloat(bal2);

       assert.equal(bal1Num, 10);
       assert.equal(bal2Num, 5);
    });
    
});