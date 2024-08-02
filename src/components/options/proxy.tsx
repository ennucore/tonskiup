import { useEffect, useState } from "react";
import { useStore, useStoreActions } from "../../store";
import { useBackendDomain } from "../../hooks/useBackendDomain";
import { Loader } from "../loader";

export const ProxyContent = () => {
  const actions = useStoreActions();
  const { domainRecord } = useStore();
  const { domain, loading } = useBackendDomain();
  const [proxyUrl, setProxyUrl] = useState(domain?.proxy || "");
  useEffect(() => {
    setProxyUrl(domain?.proxy || "");
  }, [domain]);

  useEffect(() => {
    if (domainRecord && !proxyUrl && !loading) {
      setProxyUrl(domainRecord);
    }
  }, [domainRecord, proxyUrl, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 bg-telegram-section-bg ">
      <div className="flex flex-col gap-4 font-gotham text-telegram-text items-center">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-2">
          Set Proxy or ADNL Address
        </h2>
        <p className="text-center text-telegram-subtitle-text mb-4">
          Enter an ADNL address for direct hosting, or input a website URL for
          our proxy service. This flexibility allows you to choose the best
          option for your needs.
        </p>
        <div className="w-full">
          <label
            htmlFor="proxyUrl"
            className="block text-sm font-medium text-telegram-hint mb-2"
          >
            Enter URL or ADNL Address
          </label>
          <input
            id="proxyUrl"
            value={proxyUrl}
            onChange={(e) => setProxyUrl(e.target.value)}
            className="p-3 rounded-lg w-full bg-telegram-bg border border-telegram-section-separator text-telegram-text placeholder-telegram-hint focus:ring-2 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out"
            placeholder="e.g., https://example.com or ADNL address"
          />
        </div>
        <button
          onClick={async () => await actions.handleSetProxy(proxyUrl)}
          className="mt-4 bg-telegram-button text-telegram-button-text rounded-lg py-3 px-6 font-medium cursor-pointer whitespace-nowrap hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-telegram-accent-text focus:ring-opacity-50"
        >
          Set Proxy / ADNL
        </button>
        <div className="mt-4 text-sm text-telegram-hint">
          <p>Need help? Here's a quick guide:</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              For websites, use the full URL including 'http://' or 'https://'
            </li>
            <li>
              For ADNL addresses, input the complete address without any
              prefixes
            </li>
            <li>Ensure your input is correct to avoid connectivity issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
