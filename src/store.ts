import { proxy, useSnapshot } from "valtio";
import { getDomainData, setSiteData, setADNLRecord } from "./api";
import { useTonConnect } from "./hooks/useTonConnect";

type State = {
  domains: Domain[];
  selectedDomainAddress: string;
  selectedDomain: string;
  domainRecord: string;
  hostingOption: string | null;
};

const state = proxy<State>({
  domains: [],
  selectedDomainAddress: "",
  selectedDomain: "",
  domainRecord: "",
  hostingOption: null,
});

const handleBack = () => {
  state.selectedDomain = "";
  state.selectedDomainAddress = "";
  state.domainRecord = "";
  state.hostingOption = null;
};

export const setDomains = (domains: Domain[]) => {
  state.domains = domains;
};

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

    handleSaveTemplate: async (data: {
      title: string;
      description: string;
      telegramDetails: string;
      tonWallet: boolean;
      templateId: "1" | "2";
    }) => {
      if (state.domainRecord !== import.meta.env.VITE_OUR_ADNL) {
        await setADNLRecord(
          state.selectedDomainAddress,
          import.meta.env.VITE_OUR_ADNL,
          sender
        );
      }
      await setSiteData({
        domain: state.selectedDomain,
        proxy: "",
        redirect: "",
        template_id: data.templateId,
        title: data.title,
        description: data.description,
        contacts: {
          telegram: data.telegramDetails,
          wallet: data.tonWallet ? (wallet ? wallet : "") : "",
        },
      });
      handleBack();
    },

    handleReset: async () => {
      await setSiteData({
        domain: state.selectedDomain,
        proxy: "",
        redirect: "",
        template_id: "",
        title: "",
        description: "",
        contacts: {
          telegram: "",
          wallet: "",
        },
      });
      handleBack();
    },

    handleSetProxy: async (proxyUrl: string) => {
      if (state.domainRecord !== import.meta.env.VITE_OUR_ADNL) {
        await setADNLRecord(
          state.selectedDomainAddress,
          import.meta.env.VITE_OUR_ADNL,
          sender
        );
      }
      await setSiteData({
        domain: state.selectedDomain,
        proxy: proxyUrl,
        redirect: "",
      });
      handleBack();
    },

    handleSetRedirect: async (redirectUrl: string) => {
      if (state.domainRecord !== import.meta.env.VITE_OUR_ADNL) {
        await setADNLRecord(
          state.selectedDomainAddress,
          import.meta.env.VITE_OUR_ADNL,
          sender
        );
      }

      await setSiteData({
        domain: state.selectedDomain,
        proxy: "",
        redirect: redirectUrl,
      });
      handleBack();
    },
  };
};

export const useStore = () => {
  const store = useSnapshot(state);
  return {
    ...store,
  };
};

type UpdateDomainArgs = {
  domain: string;
  site: SiteData;
};

export const updateDomain = async (args: UpdateDomainArgs) => {
  const updatedDomains = state.domains.map((d) => {
    if (d.domain === args.domain) {
      return {
        ...d,
        site: {
          ...d.site,
          ...args.site,
        },
      };
    }
    return d;
  });

  state.domains = updatedDomains;
};
