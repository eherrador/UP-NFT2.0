import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import Web3 from "web3";
import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import {  RPC_ENDPOINT_L14, RPC_ENDPOINT_L16, RPC_ENDPOINT_MUMBAI, RPC_ENDPOINT_GOERLI, RPC_ENDPOINT_GANACHE, L14chainId, L16chainId, MumbaichainId, GoerlichainId, GanachechainId, IPFS_LUKSO_GATEWAY } from "./constants";
//import "isomorphic-fetch";

// Parameters for ERC725 Instance
const upAddress = "0x4eD4d830A514C83aD0D09E80f98046f91d835f35";
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT_L16);
const config = {
  ipfsGateway: IPFS_LUKSO_GATEWAY,
};

// Fetchable metadata information
let name;
let description;
let links = [];
let firstLink;
let tags = [];
let firstTag;

// Fetchable picture information
let backgroundImageLinks: any[][] = [];
let fullSizeBackgroundImg;
let profileImageLinks: any[][] = [];
let fullSizeProfileImg;


/*
 * Fetch the @param's Universal Profile's
 * LSP3 data
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
async function fetchProfileData(address: any) {
    try {
      const profile = new ERC725(erc725schema as ERC725JSONSchema[], address, provider, config);
      return await profile.fetchData("LSP3Profile");
    } catch (error) {
      return console.log("This is not an ERC725 Contract: ", error);
    }
  }
  
  /*
   * Fetch metadata information from the JSON dataset of
   * an Universal Profile
   */
  async function fetchProfileMetadata(address: any) {
    const profileData = JSON.stringify(await fetchProfileData(address));  //const profileData = await fetchProfileData(address);
    const profileDataParsed = JSON.parse(profileData);
    console.log("Profile Data: ", profileData);

    // Read JSON
    name = profileDataParsed.value.LSP3Profile.name;
    description = profileDataParsed.value.LSP3Profile.description;
    links = profileDataParsed.value.LSP3Profile.links;
    firstLink = links[0];
    tags = profileDataParsed.value.LSP3Profile.tags;
    firstTag = tags[0];

    // Debug
    console.log("Name: " + name);
    console.log("Description: " + description + "\n");
    console.log("Links: " + JSON.stringify(links, undefined, 2) + "\n");
    console.log("Title of First Link: " + firstLink.title + "\n");
    console.log("URL of First Link: " + firstLink.url + "\n");
    console.log("Tags: " + JSON.stringify(tags, undefined, 2) + "\n");
    console.log("First Tag: " + firstTag + "\n");
  }

  /* Fetch picture information from the JSON dataset of
 * a Universal Profile
 *
 * @return string Error
 */
async function fetchPictureData(address: any) {
    const profileData = JSON.stringify(await fetchProfileData(address));  //const profileData = await fetchProfileData(address);
    const profileDataParsed = JSON.parse(profileData);
    console.log("Profile Data: ", profileData);
    
    // Read JSON
    let backgroundImagesIPFS = profileDataParsed.value.LSP3Profile.backgroundImage;
    let profileImagesIPFS = profileDataParsed.value.LSP3Profile.profileImage;
    try {
      for (let i in backgroundImagesIPFS) {
        backgroundImageLinks.push([
          i,
          backgroundImagesIPFS[i].url.replace("ipfs://", IPFS_LUKSO_GATEWAY),
        ]);
      }
      for (let i in profileImagesIPFS) {
        profileImageLinks.push([
          i,
          profileImagesIPFS[i].url.replace("ipfs://", IPFS_LUKSO_GATEWAY),
        ]);
      }

      fullSizeBackgroundImg = backgroundImageLinks[0][1];
      fullSizeProfileImg = profileImageLinks[0][1];
  
      // Debug
      console.log("Fullsize Background Image: " + fullSizeBackgroundImg + "\n");
      console.log("Fullsize Background Image: " + fullSizeProfileImg + "\n");
      console.log(
        "Background Image Links: " +
          JSON.stringify(backgroundImageLinks, undefined, 2) +
          "\n"
      );
      console.log(
        "Background Image Links: " +
          JSON.stringify(profileImageLinks, undefined, 2) +
          "\n"
      );
    } catch (error) {
      return console.log("Could not fetch images: ", error);
    }
  }

  fetchPictureData(upAddress);
  fetchProfileMetadata(upAddress);