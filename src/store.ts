import { proxy, useSnapshot } from "valtio";
import {
  getDomainData,
  setSiteData,
  setADNLRecord,
  getSiteData,
  fetchTonDnsDomains,
} from "./api";
import { useTonConnect } from "./hooks/useTonConnect";

type State = {
  domains: Domain[];
  selectedDomainAddress: string;
  selectedDomain: string;
  domainRecord: string;
  hostingOption: string | null;
};

const state = proxy<State>({
  domains: fetchTonDnsDomains() as unknown as Domain[],
  selectedDomainAddress: "",
  selectedDomain: "",
  domainRecord: "",
  hostingOption: null,
});
export const useStoreActions = () => {
  const { wallet, sender } = useTonConnect();
  return {
    chooseDomain: async (domain: string, address: string) => {
      state.selectedDomain = domain;
      state.selectedDomainAddress = address;
      state.domainRecord = await getDomainData(domain, address);
      state.hostingOption = null;
    },

    handleBack: () => {
      state.selectedDomain = "";
      state.selectedDomainAddress = "";
      state.domainRecord = "";
      state.hostingOption = null;
    },

    handleSaveTemplate: async (data: any) => {
      if (state.domainRecord !== import.meta.env.VITE_OUR_ADNL) {
      }
      await setSiteData({
        domain: state.selectedDomain,
        proxy: "",
        redirect: "",
        template_id: "1",
        title: data.title,
        description: data.description,
        contacts: {
          telegram: data.telegramDetails,
          wallet: data.tonWallet ? (wallet ? wallet : "") : "",
        },
      });
    },

    handleSetProxy: async (proxyUrl: string | null) => {
      if (proxyUrl && proxyUrl.includes(".")) {
        await setADNLRecord(state.selectedDomainAddress, proxyUrl, sender);
        state.domainRecord = proxyUrl;
        return;
      }
      await setADNLRecord(
        state.selectedDomainAddress,
        import.meta.env.VITE_OUR_ADNL,
        sender
      );
      await setSiteData({
        domain: state.selectedDomain,
        proxy: proxyUrl,
        redirect: "",
      });
    },

    handleSetRedirect: async (redirectUrl: string) => {
      // await setADNLRecord(
      //   state.selectedDomainAddress,
      //   import.meta.env.VITE_OUR_ADNL,
      //   sender
      // );

      getSiteData(state.selectedDomain).then(async (site_data) => {
        if (site_data) {
          await setSiteData({
            domain: state.selectedDomain,
            proxy: "",
            redirect: redirectUrl,
          });
        }
      });
    },

    setDomains: (domains: Domain[]) => {
      state.domains = domains;
    },
  };
};

export const useStore = () => {
  const store = useSnapshot(state);
  console.log(store);
  return {
    ...store,
  };
};
