const Web3 = require("web3");
const { RPC_ENDPOINT_L16 } = require("./constants");
const faucetABI = [{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"initialAmount","type":"uint256"}],"name":"InitialFund","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountReceived","type":"uint256"}],"name":"Received","type":"event"},{"inputs":[{"internalType":"addresspayable","name":"_requester","type":"address"}],"name":"sendFunds","outputs":[],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountSent","type":"uint256"}],"name":"Sent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountWithdraw","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];


const web3 = new Web3(RPC_ENDPOINT_L16);
const faucetContractAddress = "0xE916c2009678e7Ae96d8799Cd2454ff9EC080E2b";
const ownerAddress = "0x6eDD7FC8d6A7D7a14e18344Bee768E786273A4B1";
const receiverAddress = "0xdD0E5E20219bc787B0936451d48d6F4602262372";

const faucetContract = new web3.eth.Contract(faucetABI, faucetContractAddress);

//calling a send method in faucet contract
faucetContract.methods.sendFunds(receiverAddress).send({ from: ownerAddress }, function (err, res) {
    if (err) {
      console.log("An error occured", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  }); 