import web3 from "./Web3";

const loadAccount = async () => {

    // Load account
    const accounts = await web3.eth.getAccounts()
    // console.log(accounts)
    return accounts[0]
}

export default loadAccount