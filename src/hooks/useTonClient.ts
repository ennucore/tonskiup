import {getHttpEndpoint} from "@orbs-network/ton-access";
import {useState} from "react";
import {Address, ADNLAddress, toNano, TonClient} from "ton";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {useTonConnect} from "./useTonConnect";
import {CHAIN} from "@tonconnect/protocol";

import dotenv from 'dotenv';
import axios from 'axios';
import TonWeb from "tonweb";
import {categoryToBN, parseSiteRecord, dnsResolve} from "tonweb/src/contract/dns/DnsUtils";
import {Cell} from "ton-core";
// import {HttpProvider} from "tonweb/http-provider";


// Load environment variables
dotenv.config();

export function useTonClient() {
    const {network} = useTonConnect();

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
export async function fetchTonDnsDomains(accountAddress: string, useTestnet: string) {
    // Removed the hooks and replaced with parameters
    // Construct the API endpoint
    const apiToken = import.meta.env.VITE_TONAPI_KEY;// process.env.VITE_TONAPI_TOKEN;
    const apiBase = useTestnet ? 'https://testnet.tonapi.io' : 'https://tonapi.io';
    const apiUrl = `${apiBase}/v2/accounts/${accountAddress}/nfts?collection=EQC3dNlesgVD8YbAazcauIrXBPfiVhMMr5YYk2in0Mtsz0Bz&limit=1000&offset=0&indirect_ownership=false`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {'Authorization': `Bearer ${apiToken}`}
        });
        return response.data.nft_items.map(item => ({
            domain: item.dns,
            picture: item.previews[item.previews.length - 1].url,
            address: item.address,
        }));
    } catch (error) {
        console.error('Error fetching TON DNS domains:', error);
        throw error;
    }
}

export async function getDomainData(domain: string, address: string) {
    const tonweb = getTonweb();
    let dnsItem = new TonWeb.dns.DnsItem(tonweb.provider, {
        address: address,
    });
    console.log('getting data for', domain);

    const result = await dnsItem.resolve('.', "site");// categoryBN);
    if (result) {
        return result.toHex();
    } else {
        return null;
    }
}

async function getManageDomainPayload(key: string, value: Cell) {
    const cell = await TonWeb.dns.DnsItem.createChangeContentEntryBody({
        category: key,
        value: value,
    });
    return cell;
}

export async function setADNLRecord(address: string, adnl: string | null, sender: Sender) {

    console.log(address)
    let record = null;
    if (adnl) {
        const adnlAddress = new TonWeb.utils.AdnlAddress(adnl)
        record = TonWeb.dns.createAdnlAddressRecord(adnlAddress)
    }
    let payload = await getManageDomainPayload(TonWeb.dns.DNS_CATEGORY_SITE, adnl ? record : null)
    await sender.send({
        to: Address.parse(address),
        value: toNano("0.05"),
        body: payload
    });
}
