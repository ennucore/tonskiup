import { Address, Cell, toNano } from "@ton/core";
import axios from "axios";
import TonWeb from "tonweb";
import { SenderPlus } from "./hooks/useTonConnect";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constants";
import { updateDomain } from "./store";

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
    .then((response) => response.data)
    .catch((e) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      delete axios.defaults.headers.common["Authorization"];
    });
}

export async function getDomainData(domain: string, address: string) {
  const tonweb = new TonWeb();
  const dnsItem = new (TonWeb as any).dns.DnsItem(tonweb.provider, {
    address: address,
  });
  const result = await dnsItem.resolve(".", "site");
  return result ? result.toHex() : null;
}

async function getManageDomainPayload(key: string, value: Cell) {
  const cell = await (TonWeb as any).dns.DnsItem.createChangeContentEntryBody({
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
    const adnlAddress = new (TonWeb as any).utils.AdnlAddress(adnl);
    record = (TonWeb as any).dns.createAdnlAddressRecord(adnlAddress);
  }
  let payload = await getManageDomainPayload(
    (TonWeb as any).dns.DNS_CATEGORY_SITE,
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
  updateDomain({ domain: data.domain, site: data });
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
