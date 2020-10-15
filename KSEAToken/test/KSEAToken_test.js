const { strictEqual } = require('assert');
const assert = require('assert');
const KSEAToken = artifacts.require("KSEAToken");

let accounts;
let dobby;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    dobby = await KSEAToken.deployed();
});

contract("KSEAToken", async () => {
    it("should send total supply of tokens to contract deployer's wallet", async () => {
       let bal = await dobby.balanceOf(accounts[0]);
       assert.equal(10000, bal);
    });

    it ("should show correct balance", async () => {

    });

    it ("should show correct name", async () => {

    });

    it ("should show correct symbol", async () => {

    });

    it ("should transfer 10 tokens from accounts[0] to accounts[1]", async () => {

    });

    it ("should let accounts[0] approve accounts[1] to send 10 tokens to accounts[2]", async () => {

    });

    it ("should correctly let accounts[1] to send 10 tokens from accounts[0] to accounts[2]", async () => {

    });
});