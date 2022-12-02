import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import Web3 from "web3";
import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import {  RPC_ENDPOINT_L14, RPC_ENDPOINT_L16, RPC_ENDPOINT_MUMBAI, RPC_ENDPOINT_GOERLI, RPC_ENDPOINT_GANACHE, L14chainId, L16chainId, MumbaichainId, GoerlichainId, GanachechainId, Ipfs_Lukso_Gateway } from "./constants";

// Parameters for ERC725 Instance
const upAddress = "0x4eD4d830A514C83aD0D09E80f98046f91d835f35";
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT_L16);
const config = {
  ipfsGateway: Ipfs_Lukso_Gateway,
};

const erc725 = new ERC725(
  erc725schema as ERC725JSONSchema[],
  upAddress,
  provider,
  config
);

const main = async () => {
  console.log("Starting...");
  const data = await erc725.getData();
  console.log(data);
  console.log("Done");
};

main();
