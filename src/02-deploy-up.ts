import "dotenv/config";
import { LSPFactory } from "@lukso/lsp-factory.js";
import {  RPC_ENDPOINT_L14, RPC_ENDPOINT_L16, RPC_ENDPOINT_MUMBAI, RPC_ENDPOINT_GOERLI, RPC_ENDPOINT_GANACHE, L14chainId, L16chainId, MumbaichainId, GoerlichainId, GanachechainId, IPFS_LUKSO_GATEWAY } from "./constants";
import Web3 from "web3";

// Setup Web3
const web3 = new Web3();

console.log("process.env.PRIVATE_KEY: ", process.env.PRIVATE_KEY);

// Load our Externally Owned Account (EOA)
const myEOA = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");
console.log(`Loaded address: ${myEOA.address} from process.env`);

// Initialize the LSPFactory with the RPC endpoint and your EOA's private key, which will deploy the UP smart contracts
const lspFactory = new LSPFactory(RPC_ENDPOINT_L16, { deployKey: process.env.PRIVATE_KEY, chainId: GanachechainId });

const myLSP3MetaData = {
  name: "Edgar-Herrador",
  description: "My name is Edgar Herrador",
  profileImage: [
    {
      width: 722,
      height: 860,
      hashFunction: 'keccak256(bytes)',
      hash: '0xe3c1b349dd4990624e6ce4e112d1bb6ec23e6ee33536d0119fddb6538c48e33e', // bytes32 hex string of the image hash
      url: 'QmW8GxjHMuePYcnZCoimm8ETPFcfmq1m4GXkU12o23WafW',
    },
  ],
  backgroundImage: [
    {
      width: 1024,
      height: 776,
      hashFunction: 'keccak256(bytes)',
      hash: '0xd54ecc5ef0327364436c5acda0d673a1b25feea1ceb40d579d62c5d5d8d2d098', // bytes32 hex string of the image hash
      url: 'QmeBKhfrF7dyEY9cfBnE2sHANqQ4kq6Z1pShLHLv73cJdS',
    },
  ],
  tags: ['Web3', 'ZK Proof', 'Token Engineering', 'IP-NFT', 'AI'],
  links: [{
    title: "My Websites",
    url: "https://linktr.ee/eherrador"
  }],
};

const profileDeploymentEvents = [];

const main = async () => {
  console.log("Deploying UP with lsp-factory.js");
  const myContracts = await lspFactory.UniversalProfile.deploy({
    controllerAddresses: [myEOA.address], // Account addresses which will control the UP
    lsp3Profile: myLSP3MetaData,
  },
  {
    onDeployEvents: {
      next: (deploymentEvent) => {
        console.log(deploymentEvent);
        profileDeploymentEvents.push(deploymentEvent);
      },
      error: (error) => {
        console.error(error);
      },
      complete: (contracts) => {
        console.log('Universal Profile deployment completed');
        console.log("Mi UP Address", contracts.LSP0ERC725Account?.address);
        console.log(contracts);
        console.log("-----------------------------------------------");
      },
    }
  });

  //console.log("UP Address", myContracts.LSP0ERC725Account?.address);
  //console.log(myContracts);
  console.log("Done");
};

main();
