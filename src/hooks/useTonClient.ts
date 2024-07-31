import { getHttpEndpoint } from "@orbs-network/ton-access";
import { toNano, TonClient } from "@ton/ton";
import { Address } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { SenderPlus, useTonConnect } from "./useTonConnect";
import { CHAIN } from "@tonconnect/protocol";

import dotenv from "dotenv";
import axios from "axios";
import TonWeb from "tonweb";
import { Cell, Sender } from "@ton/core";
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
  const tonweb = new TonWeb();
  return tonweb;
}

// fetchTonDnsDomains.js

export async function fetchTonDnsDomains(
  accountAddress: string,
  useTestnet: boolean
) {
  // Removed the hooks and replaced with parameters
  // Construct the API endpoint
  const response = await axios.get("/server/protected/get-domains", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("agora-auth-token")}`,
    },
  });
  const res = response.data;
  console.log(res);
  return res;
}

export async function getDomainData(domain: string, address: string) {
  const tonweb = getTonweb();
  // @ts-ignore
  let dnsItem = new TonWeb.dns.DnsItem(tonweb.provider, {
    address: address,
  });
  console.log("getting data for", domain);

  const result = await dnsItem.resolve(".", "site"); // categoryBN);
  if (result) {
    return result.toHex();
  } else {
    return null;
  }
}

async function getManageDomainPayload(key: string, value: Cell) {
  // @ts-ignore
  const cell = await TonWeb.dns.DnsItem.createChangeContentEntryBody({
    category: key,
    value: value,
  });
  return cell;
}

export async function setADNLRecord(
  address: string,
  adnl: string | null,
  sender: SenderPlus
) {
  console.log(address);
  let record = null;
  if (adnl) {
    console.log("Creating an adnl record out of", adnl);
    // @ts-ignore
    const adnlAddress = new TonWeb.utils.AdnlAddress(adnl);
    // @ts-ignore
    record = TonWeb.dns.createAdnlAddressRecord(adnlAddress);
  }
  // @ts-ignore
  let payload = await getManageDomainPayload(
    TonWeb.dns.DNS_CATEGORY_SITE,
    record
  );
  await sender.send_many([
    {
      to: Address.parse(address),
      value: toNano("0.05"),
      body: payload,
    },
    // {
    //     to: RECEIVER,
    //     value: toNano("0.05"),
    // }
  ]);
}
