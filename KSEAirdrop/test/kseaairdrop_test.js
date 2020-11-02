const assert = require('assert');
const KSEAToken = artifacts.require("KSEAToken");
const KSEAirdrop = artifacts.require("KSEAirdrop");

let accounts;
let airdrop;
let token;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    token = await KSEAToken.deployed();
    airdrop = await KSEAirdrop.deployed(token.address);
});

contract("KSEAirdrop", async () => {
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

    it("distributeTokens", async () => { //parameter check
       await token.approve(airdrop.address, 100);
       await airdrop.distributeDobbyTokens([accounts[1], accounts[2]], 5, {from: accounts[0]});

       let bal1 = await token.balanceOf(accounts[1]);
       let bal1Num = await parseFloat(bal1);
       let bal2 = await token.balanceOf(accounts[2]);
       let bal2Num = await parseFloat(bal2);

       assert.equal(bal1Num, 5);
       assert.equal(bal2Num, 5);
    });


    it("distributeEther", async () => { //parameter check
       await airdrop.distributeEther([accounts[1], accounts[2]], {from: accounts[0], value: 2e18});

       let bal1 = await web3.eth.getBalance(accounts[1]);
       let bal1Num = await parseFloat(bal1);
       let bal2 = await web3.eth.getBalance(accounts[2]);
       let bal2Num = await parseFloat(bal2);

       assert.equal(bal1Num/1e18, 101);
       assert.equal(bal2Num/1e18, 101);
    });
});


