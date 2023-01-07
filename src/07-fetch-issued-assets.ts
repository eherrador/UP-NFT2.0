import "dotenv/config";
import Web3 from "web3";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import {  RPC_ENDPOINT_L14, RPC_ENDPOINT_L16, RPC_ENDPOINT_MUMBAI, RPC_ENDPOINT_GOERLI, RPC_ENDPOINT_GANACHE, L14chainId, L16chainId, MumbaichainId, GoerlichainId, GanachechainId, IPFS_LUKSO_GATEWAY } from "./constants";

const erc725schema = require("@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json");
const LSP12IssuedAssetsSchema = require("@erc725/erc725.js/schemas/LSP12IssuedAssets.json");

// Parameters for ERC725 Instance
const upAddress = "0x4eD4d830A514C83aD0D09E80f98046f91d835f35";
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT_L16);
const config = {
  ipfsGateway: IPFS_LUKSO_GATEWAY,
};

let LSP12IssuedAssets;

/*
 * Fetch the LSP12 data of Issued Assets
 *
 * @param address of the Universal Profile
 * @return address[] of issued assets or custom error
 */
async function fetchIssuedAssets(address: any) {
  try {
    const erc725LSP12IssuedAssets = new ERC725(LSP12IssuedAssetsSchema, upAddress, provider, config);
    // GET the current issued assets
    LSP12IssuedAssets = await erc725LSP12IssuedAssets.getData('LSP12IssuedAssets[]');
    return LSP12IssuedAssets.value;
  } catch (error) {
    // is EOA, get assets from localStorage
    //LSP12IssuedAssets = JSON.parse(localStorage.getItem('issuedAssets'));
    //return LSP12IssuedAssets.value;
    return console.log("Error - Is EOA, get assets from localStorage: ", error);
  }
}

// Debug
fetchIssuedAssets(upAddress).then((issuedAssets) =>
  console.log(JSON.stringify(issuedAssets, undefined, 2))
);