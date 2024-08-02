import { Address, Cell, toNano } from "@ton/core";
import axios from "axios";
import TonWeb from "tonweb";
import { SenderPlus } from "./hooks/useTonConnect";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constants";

axios.defaults.headers.common["Content-Type"] = "application/json";
const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

export function fetchTonDnsDomains(): Promise<Domain[]> {
  return axios
    .get(`${import.meta.env.VITE_BACKEND}/protected/get-domains`)
    .then((response) => response.data);
}

export async function getDomainData(domain: string, address: string) {
  const tonweb = new TonWeb();
  const dnsItem = new TonWeb.dns.DnsItem(tonweb.provider, {
    address: address,
  });
  const result = await dnsItem.resolve(".", "site");
  return result ? result.toHex() : null;
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

export async function setSiteData(data: SiteData) {
  await axios.post(
    `${import.meta.env.VITE_BACKEND}/protected/set-site-data`,
    data
  );
}

export async function getSiteData(domain: string): Promise<SiteData> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND}/protected/get-site-data/${domain}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("agora-auth-token")}`,
        },
      }
    );
    return response.data as SiteData;
  } catch (error) {
    throw error;
  }
}
