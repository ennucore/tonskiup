import { useEffect, useState } from "react";
import { useStore, useStoreActions } from "../../store";
import { useBackendDomain } from "../../hooks/useBackendDomain";
import { Loader } from "../loader";

export const ProxyContent = () => {
  const actions = useStoreActions();
  const { domainRecord } = useStore();
  const { domain, loading } = useBackendDomain();
  const [proxyUrl, setProxyUrl] = useState(domain?.proxy || "");
  const [isValidInput, setIsValidInput] = useState(false);

  useEffect(() => {
    if (domain) {
      setProxyUrl(domain.proxy || "");
    }
  }, [domain]);

  useEffect(() => {
    if (domainRecord && !proxyUrl && !loading) {
      setProxyUrl(domainRecord);
    }
  }, [domainRecord, proxyUrl, loading]);

  useEffect(() => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const adnlPattern = /^[a-fA-F0-9]{64}$/;
    setIsValidInput(urlPattern.test(proxyUrl) || adnlPattern.test(proxyUrl));
  }, [proxyUrl]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 rounded-lg bg-telegram-section-bg">
      <div className="flex flex-col gap-3 font-gotham text-telegram-text">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-2 text-center">
          Set Proxy or ADNL Address
        </h2>
        <p className="text-sm text-telegram-subtitle-text mb-4 text-center">
          Configure your domain with a proxy URL or ADNL address for seamless
          connectivity.
        </p>
        <div className="space-y-4">
          <div className="grid gap-1">
            <label
              htmlFor="proxyUrl"
              className="text-sm font-semibold text-telegram-accent-text"
            >
              Proxy URL or ADNL Address *
            </label>
            <input
              id="proxyUrl"
              value={proxyUrl}
              onChange={(e) => setProxyUrl(e.target.value)}
              className={`p-2 rounded-md w-full bg-telegram-bg border ${
                isValidInput
                  ? "border-green-500"
                  : "border-telegram-section-separator"
              } text-telegram-text placeholder-telegram-hint focus:ring-1 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out`}
              placeholder="https://example.com or ADNL address"
            />
            <p className="text-xs text-telegram-hint mt-1">
              Enter a valid URL (including http:// or https://) or ADNL address
            </p>
            {!isValidInput && proxyUrl && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid URL or ADNL address
              </p>
            )}
          </div>
        </div>
        <button
          onClick={async () => await actions.handleSetProxy(proxyUrl)}
          disabled={!isValidInput}
          className={`mt-6 bg-telegram-button text-telegram-button-text rounded-md py-3 px-4 font-bold text-sm cursor-pointer whitespace-nowrap transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-telegram-accent-text focus:ring-opacity-50 ${
            !isValidInput
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-90"
          }`}
        >
          Set Proxy / ADNL
        </button>
        <p className="mt-2 text-xs text-telegram-hint text-center">
          Your proxy or ADNL settings will be instantly updated. Ensure the
          input is correct!
        </p>
      </div>
    </div>
  );
};
