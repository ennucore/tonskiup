import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useState } from "react";
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { CHAIN } from "@tonconnect/protocol";

import dotenv from 'dotenv';
import axios from 'axios';
import TonWeb from "tonweb";
// import {HttpProvider} from "tonweb/http-provider";


// Load environment variables
dotenv.config();

export function useTonClient() {
  const { network } = useTonConnect();

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;
      return new TonClient({
        endpoint: await getHttpEndpoint({
          network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
        }),
        apiKey: process.env.VITE_TONCENTER_API_KEY,
      });
    }, [network]),
  };
}

export function getTonweb() {
  const tonweb = new TonWeb(new HttpProvider('', {apiKey: process.env.VITE_TONCENTER_API_KEY}));
    return tonweb;
}

// export async function fetchTonDnsDomains(accountAddress: string = "" ) {
//   if (accountAddress === "") {
//     const { wallet } = useTonConnect();
//     accountAddress = wallet!;
//   }
//   const { network } = useTonConnect();
//   let useTestnet = network !== CHAIN.MAINNET;
//   // Construct the API endpoint
//   const apiBase = useTestnet ? 'https://testnet.tonapi.io' : 'https://tonapi.io';
//   const apiUrl = `${apiBase}/v2/accounts/${accountAddress}/nfts?collection=EQC3dNlesgVD8YbAazcauIrXBPfiVhMMr5YYk2in0Mtsz0Bz&limit=1000&offset=0&indirect_ownership=false`;
//
//   try {
//     // Make the HTTP GET request to the API
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Authorization': `Bearer ${process.env.VITE_TONAPI_TOKEN}` // Replace with your API token environment variable
//       }
//     });
//
//     // Process and print the domain names and corresponding pictures
//     return response.data.nft_items.map((item: any) => ({
//       domain: item.dns,
//       picture: item.previews[item.previews.length - 1].url
//     }));
//   } catch (error) {
//     console.error('Error fetching TON DNS domains:', error);
//     throw error;
//   }
// }

// fetchTonDnsDomains.js
export async function fetchTonDnsDomains(accountAddress: string, useTestnet: string) {
  // Removed the hooks and replaced with parameters
  // Construct the API endpoint
  const apiToken = import.meta.env.VITE_TONAPI_KEY;// process.env.VITE_TONAPI_TOKEN;
  const apiBase = useTestnet ? 'https://testnet.tonapi.io' : 'https://tonapi.io';
  const apiUrl = `${apiBase}/v2/accounts/${accountAddress}/nfts?collection=EQC3dNlesgVD8YbAazcauIrXBPfiVhMMr5YYk2in0Mtsz0Bz&limit=1000&offset=0&indirect_ownership=false`;

  try {
    const response = await axios.get(apiUrl, {
      headers: { 'Authorization': `Bearer ${apiToken}` }
    });
    return response.data.nft_items.map(item => ({
      domain: item.dns,
      picture: item.previews[item.previews.length - 1].url
    }));
  } catch (error) {
    console.error('Error fetching TON DNS domains:', error);
    throw error;
  }
}
