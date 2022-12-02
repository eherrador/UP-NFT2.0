import "dotenv/config";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import Web3 from "web3";
import {  RPC_ENDPOINT_L14, RPC_ENDPOINT_L16, RPC_ENDPOINT_MUMBAI, RPC_ENDPOINT_GOERLI, RPC_ENDPOINT_GANACHE, L14chainId, L16chainId, MumbaichainId, GoerlichainId, GanachechainId, IPFS_LUKSO_GATEWAY } from "./constants";

// Setup Web3
const web3 = new Web3();

// Load our Externally Owned Account (EOA)
const myEOA = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");
console.log(`Loaded address: ${myEOA.address} from process.env`);

// Initialize the LSPFactory with the L16 RPC endpoint and your EOA's private key, which will deploy the UP smart contracts
const lspFactory = new LSPFactory(RPC_ENDPOINT_L16, { deployKey: process.env.PRIVATE_KEY, chainId: 2828 });

const deploymentEventsLSP7NFT2 = [];

const main = async () => {
  console.log("Deploying a LSP7 Fungible Token with lsp-factory.js");
  const myLSP7NFT2 = await lspFactory.LSP7DigitalAsset.deploy({
    isNFT: false,
    controllerAddress: myEOA.address,
    name: 'Kiki Token',
    symbol: 'KIKI',
  },
  {
    onDeployEvents: {
      next: (deploymentEvent) => {
        console.log(deploymentEvent);
        deploymentEventsLSP7NFT2.push(deploymentEvent);
      },
      error: (error) => {
        console.error(error);
      },
      complete: (nft) => {
        console.log('LSP7 Fungible Token deployment completed');
        console.log("Fungible Token Address", nft.LSP7DigitalAsset.address);
        console.log("Fungible Token Receipt", nft.LSP7DigitalAsset.receipt);
        console.log(nft);
        console.log("---------------------- Done! ----------------------------");
      },
    }
  });
};

main();