import { SiweMessage } from 'siwe';
import Web3 from "web3";
import { ethers } from 'ethers';
import {  RPC_ENDPOINT_L14, RPC_ENDPOINT_L16, RPC_ENDPOINT_MUMBAI, RPC_ENDPOINT_GOERLI, RPC_ENDPOINT_GANACHE, L14chainId, L16chainId, MumbaichainId, GoerlichainId, GanachechainId, IPFS_LUKSO_GATEWAY } from "./constants";

// Parameters for ERC725 Instance
const upAddress = "0x300122Af053D7B44352c32B1C9ebb78582E95542";

// Setup Web3
const web3 = new Web3(window.ethereum);
const provider = web3.setProvider(new Web3.providers.HttpProvider(RPC_ENDPOINT_L16));


let siweMessage: string;

/*
 * Connect to UP extension and get UP address
 */
async function connectToUP() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("Address: %s", address);
    return address;
}

/*
 * Prepare message to sign
*/
function prepareMessageTosign() {
    const message = new SiweMessage({
        domain: 'https://scienceconnexion.com/',
        address: upAddress,
        statement: 'By logging in you agree to the terms and conditions.',
        uri: 'https://scienceconnexion.com/',
        version: '1',
        chainId: L16chainId,
        resources: ['https://terms.website.com'],
    });
      
      siweMessage = message.prepareMessage();    
}

/*
 * Sign message
*/
async function signTheMessage() {
    const signature = await web3.eth.sign(siweMessage, upAddress);
    console.log("Signature: %d", signature.length);
}

const main = async () => {
    console.log("Preparing message...");
    prepareMessageTosign();
    console.log("Sign-in message...");
    signTheMessage()
    console.log("Done");
};
  
main();