import "dotenv/config";
import Web3 from "web3";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import {  RPC_ENDPOINT_L14, RPC_ENDPOINT_L16, RPC_ENDPOINT_MUMBAI, RPC_ENDPOINT_GOERLI, RPC_ENDPOINT_GANACHE, L14chainId, L16chainId, MumbaichainId, GoerlichainId, GanachechainId, IPFS_LUKSO_GATEWAY } from "./constants";
//import LSP0ERC725Account from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
//import LSP0ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';

const erc725schema = require("@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json");
const LSP12IssuedAssetsSchema = require("@erc725/erc725.js/schemas/LSP12IssuedAssets.json");
//const LSP0ERC725Account = require("@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json");
const LSP0ERC725Account = require("@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json");

// Setup Web3
const web3 = new Web3(RPC_ENDPOINT_L16);

// Parameters for ERC725 Instance
const myEOA = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");
const upAddress = "0x300122Af053D7B44352c32B1C9ebb78582E95542";
const issuedAssetAddress = "0x4610ABce6be7ad99C1e5Ae02499fb59eBd8CF6c9";
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
    LSP12IssuedAssets = await erc725LSP12IssuedAssets.getData('LSP12IssuedAssets[]'); //const result = await profile.fetchData("LSP12IssuedAssets[]");
    return LSP12IssuedAssets.value;
  } catch (error) {
    // is EOA, get assets from localStorage
    //LSP12IssuedAssets = JSON.parse(localStorage.getItem('issuedAssets'));
    //return LSP12IssuedAssets.value;
    return console.log("Error - Is EOA, get assets from localStorage: ", error);
  }
}

/*
 * Update the LSP12 Issued Assets
 *
 * @param address of the Universal Profile
 * @param address of the Issued Asset
 * @return address[] of issued assets or custom error
 */
async function updateIssuedAssets(upAddress: any, issuedAssetAddress: any) {
    try {
      const erc725LSP12IssuedAssets = new ERC725(LSP12IssuedAssetsSchema, upAddress, provider, config);
      // GET the current issued assets
      LSP12IssuedAssets = await erc725LSP12IssuedAssets.getData('LSP12IssuedAssets[]');
      // add new asset
      //LSP12IssuedAssets.value.push(issuedAssetAddress);
      let issuedAssets: string[] = LSP12IssuedAssets.value as string[];
      issuedAssets.push(issuedAssetAddress);

      // https://docs.lukso.tech/standards/smart-contracts/interface-ids
      const LSP8IdentifiableDigitalAssetInterfaceId = '0x49399145';

      const encodedErc725Data = erc725LSP12IssuedAssets.encodeData([
        {
          keyName: 'LSP12IssuedAssets[]',
          value: LSP12IssuedAssets.value,
        },
        //{
        //  keyName: 'LSP12IssuedAssetsMap:<address>',
        //  dynamicKeyParts: issuedAssetAddress,
        //  value: [LSP8IdentifiableDigitalAssetInterfaceId, issuedAssets.length ], // LSP8 interface ID + index position of asset
        //},
      ]);

      const profileContract = new web3.eth.Contract(LSP0ERC725Account.abi, myEOA.address);
      //console.log("profileContract: ", profileContract);
      console.log("encodedErc725Data.keys: ", encodedErc725Data.keys);
      console.log("encodedErc725Data.values: ", encodedErc725Data.values);
      console.log("upAddress: ", upAddress);
      console.log("myEOA: ", myEOA);
      const receipt = await profileContract.methods['setData(bytes32[],bytes[])'](encodedErc725Data.keys, encodedErc725Data.values).send({ from: myEOA.address });
      console.log(6);
      console.log({ receipt, type: 'TRANSACTION', functionName: 'setData' });
    } catch (error) {
      // is EOA, get assets from localStorage
      //LSP12IssuedAssets = JSON.parse(localStorage.getItem('issuedAssets'));
      //return LSP12IssuedAssets.value;
      return console.log("Error in updateIssuedAssets: ", error);
    }
  }
  
  console.log("upAddress: ", upAddress);
  console.log("issuedAssetAddress: ", issuedAssetAddress);

  // Debug
  fetchIssuedAssets(upAddress).then((issuedAssets) =>
    console.log(JSON.stringify(issuedAssets, undefined, 2))
  );
  
  updateIssuedAssets(upAddress, issuedAssetAddress).then((issuedAssets) =>
    console.log(JSON.stringify(issuedAssets, undefined, 2))
  );
  
  fetchIssuedAssets(upAddress).then((issuedAssets) =>
    console.log(JSON.stringify(issuedAssets, undefined, 2))
  );