import { getDomainData } from "../../api";

export const getSelectedOption = async (
  domain: SiteData
): Promise<"Proxy" | "Redirect" | "Template" | null> => {
  if (!domain.address) {
    throw new Error("Domain address is required");
  }
  const adnlAdress = await getDomainData(domain.domain, domain.address);

  if (adnlAdress !== import.meta.env.VITE_OUR_ADNL) {
    return null;
  }

  if (domain?.proxy) return "Proxy";
  if (domain?.redirect) return "Redirect";
  if (domain?.title) return "Template";

  return null;
};
