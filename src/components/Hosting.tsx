import React, { useState, useEffect } from "react";

import {
  NoSiteContent,
  SiteByTemplateContent,
  ProxyContent,
  RedirectContent,
} from "./contentComponents.js";
import {
  fetchTonDnsDomains,
  getDomainData,
  setADNLRecord,
} from "../hooks/useTonClient.js";
import { useTonConnect } from "../hooks/useTonConnect.js";
import { CHAIN } from "@tonconnect/protocol";
import { setSiteData, getSiteData } from "../hooks/useBackend.js";
import { Button } from "./styled/styled.js";
import WebApp from "@twa-dev/sdk";
import {
  ArrowLeft,
  ArrowRightCircle,
  Eye,
  FileX,
  LayoutTemplate,
  Network,
  X,
} from "lucide-react";

type Domain = {
  domain: string;
  picture: string;
  address: string;
};

type HostingOption = {
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
};

export function Hosting() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomainAddress, setSelectedDomainAddress] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domainRecord, setDomainRecord] = useState("");
  const [hostingOption, setHostingOption] = useState<string | null>(null);
  const { wallet, network, sender } = useTonConnect();
  const useTestnet = network !== CHAIN.MAINNET;
  const [isLoading, setIsLoading] = useState(true);

  const chooseDomain = async (domain: string, address: string) => {
    setSelectedDomain(domain);
    setSelectedDomainAddress(address);
    let record = await getDomainData(domain, address);
    setDomainRecord(record);
    setHostingOption(null);
  };

  const handleBack = () => {
    setSelectedDomain("");
    setSelectedDomainAddress("");
    setDomainRecord("");
    setHostingOption(null);
  };

  useEffect(() => {
    if (wallet) {
      fetchTonDnsDomains(wallet, useTestnet)
        .then(setDomains)
        .catch(console.error);
    }
  }, [wallet, useTestnet]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (domains.length != 0) {
      setIsLoading(false);
    }
  }, [domains]);

  const handleSaveTemplate = async (data: any) => {
    if (domainRecord !== import.meta.env.VITE_OUR_ADNL) {
      await setADNLRecord(
        selectedDomainAddress,
        import.meta.env.VITE_OUR_ADNL,
        sender
      );
    }
    await setSiteData({
      domain: selectedDomain,
      proxy: "",
      redirect: "",
      template_id: "1",
      title: data.title,
      description: data.description,
      contacts: {
        telegram: data.telegramDetails,
        wallet: data.tonWallet ? wallet : "",
      },
    });
  };

  const handleSetProxy = async (proxyUrl: string) => {
    if (!proxyUrl.includes(".")) {
      await setADNLRecord(selectedDomainAddress, proxyUrl, sender);
      setDomainRecord(proxyUrl);
      return;
    }
    await setADNLRecord(
      selectedDomainAddress,
      import.meta.env.VITE_OUR_ADNL,
      sender
    );
    await setSiteData({
      domain: selectedDomain,
      proxy: proxyUrl,
      redirect: "",
    });
  };

  const handleSetRedirect = async (redirectUrl: string) => {
    await setADNLRecord(
      selectedDomainAddress,
      import.meta.env.VITE_OUR_ADNL,
      sender
    );

    getSiteData(selectedDomain).then(async (site_data) => {
      if (site_data) {
        await setSiteData({
          domain: selectedDomain,
          proxy: "",
          redirect: redirectUrl,
        });
      }
    });
  };

  const hostingOptions: HostingOption[] = [
    {
      name: "noSite",
      icon: <FileX />,
      component: <NoSiteContent onSetProxy={handleSetProxy} />,
    },
    {
      name: "siteByTemplate",
      icon: <LayoutTemplate />,
      component: (
        <SiteByTemplateContent
          onSave={handleSaveTemplate}
          domain={selectedDomain}
        />
      ),
    },
    {
      name: "proxy",
      icon: <Network />,
      component: (
        <ProxyContent onSetProxy={handleSetProxy} domainRecord={domainRecord} />
      ),
    },
    {
      name: "redirect",
      icon: <ArrowRightCircle />,
      component: <RedirectContent onSetRedirect={handleSetRedirect} />,
    },
  ];

  return (
    wallet && (
      <div className="flex flex-col items-center gap-5">
        {isLoading ? (
          <div className="font-gotham text-nowrap text-telegram-text mt-[70px]">
            <h1>Loading...</h1>
          </div>
        ) : domains.length == 0 ? (
          <div className="font-gotham text-nowrap text-telegram-text mt-[70px]">
            <h1>
              You don't have any TON DNS domains, please visit
              <a
                href="http://dns.ton.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                dns.ton.org
              </a>
            </h1>
          </div>
        ) : !selectedDomain ? (
          <>
            <h1 className="font-gotham text-nowrap text-telegram-text mt-[70px]">
              Select Your Domain
            </h1>
            <div className="flex flex-col w-full">
              {domains.map((domain, index) => (
                <React.Fragment key={domain.domain}>
                  <div
                    className="flex items-center p-4 cursor-pointer bg-telegram-bg"
                    onClick={() => chooseDomain(domain.domain, domain.address)}
                  >
                    <img
                      src={domain.picture}
                      alt={domain.domain}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <span className="text-sm">{domain.domain}</span>
                  </div>
                  {index < domains.length - 1 && (
                    <div className="h-px bg-gray-200 dark:bg-gray-700" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={handleBack}
              className="mr-4 absolute top-4 left-0 p-4"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex flex-col items-center w-full mt-[4rem]">
              <h1 className="font-gotham text-xl text-telegram-text">
                {selectedDomain}
              </h1>
            </div>
            <img
              src={domains.find((d) => d.domain === selectedDomain)?.picture}
              alt={selectedDomain}
              className="w-24 h-24 rounded-full"
            />
            <button
              onClick={() => window.open(`https://${selectedDomain}.ski`)}
            >
              Open in browser
            </button>
            {hostingOption === null ? (
              <div className="flex flex-col w-full">
                {hostingOptions.map((option, index) => (
                  <React.Fragment key={option.name}>
                    <div
                      className="flex items-center p-4 cursor-pointer bg-telegram-bg"
                      onClick={() => setHostingOption(option.name)}
                    >
                      {option.icon}
                      <span className="text-sm ml-4">{option.name}</span>
                    </div>
                    {index < hostingOptions.length - 1 && (
                      <div className="h-px bg-gray-200 dark:bg-gray-700" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between w-full p-4 bg-telegram-bg">
                  <span className="text-sm">{hostingOption}</span>
                  <button onClick={() => setHostingOption(null)}>
                    <X size={24} />
                  </button>
                </div>
                <div className="mx-auto p-0 bg-telegram-secondary-bg shadow-md dark:bg-telegram-bg">
                  {
                    hostingOptions.find(
                      (option) => option.name === hostingOption
                    )?.component
                  }
                </div>
              </>
            )}
          </>
        )}
      </div>
    )
  );
}
