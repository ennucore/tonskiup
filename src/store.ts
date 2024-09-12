import { proxy, useSnapshot } from "valtio";
import { getDomainData, setSiteData, setADNLRecord } from "./api";
import { useTonConnect } from "./hooks/useTonConnect";
import { useTonConnectUI } from "@tonconnect/ui-react";

type State = {
  domains: Domain[];
  selectedDomainAddress: string;
  selectedDomain: string;
  domainRecord: string;
  hostingOption: string | null;
  proccessingTransaction: null | "processing" | "finished";
};

const state = proxy<State>({
  domains: [],
  selectedDomainAddress: "",
  selectedDomain: "",
  domainRecord: "",
  hostingOption: null,
  proccessingTransaction: null,
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

let intervalId: NodeJS.Timeout;
const handleDomainCheck = async () => {
  state.proccessingTransaction = "processing";

  const domain = state.selectedDomain;
  const address = state.selectedDomainAddress;
  intervalId = setInterval(async () => {
    try {
      const currentRecord = await getDomainData(domain, address);
      if (currentRecord === import.meta.env.VITE_OUR_ADNL) {
        state.proccessingTransaction = "finished";
        clearInterval(intervalId);
      }
    } catch (error) {
      state.proccessingTransaction = null;
      clearInterval(intervalId);
    }
  }, 2000);
};

window.addEventListener(
  "unhandledrejection",
  (event: PromiseRejectionEvent) => {
    if (event.reason?.message?.includes("TON_CONNECT_SDK")) {
      clearInterval(intervalId);
      state.proccessingTransaction = null;
    }
  }
);

export const useStoreActions = () => {
  const { wallet, sender } = useTonConnect();
  return {
    startProcessingTransaction: () => {
      state.proccessingTransaction = "processing";
    },
    finishProcessingTransaction: () => {
      state.proccessingTransaction = "finished";
    },
    stopProcessingTransaction: () => {
      state.proccessingTransaction = null;
    },
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
        handleDomainCheck();

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
        handleDomainCheck();
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
        handleDomainCheck();
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
