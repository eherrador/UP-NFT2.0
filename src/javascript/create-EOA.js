const Web3 = require("web3");
const { RPC_ENDPOINT_L16 } = require("./constants");

const web3 = new Web3(RPC_ENDPOINT_L16);

const myEOA = web3.eth.accounts.create();
console.log(myEOA);

console.log("Add funds to:", myEOA.address);
console.log("Faucet: https://faucet.l16.lukso.network/");

console.log("Add the private key to the .env file.");
console.log(
  `Check founds: https://explorer.execution.l16.lukso.network/tx/${myEOA.address}/internal-transactions`
);