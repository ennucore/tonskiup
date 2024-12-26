import { useEffect, useState } from "react";
import { useStore, useStoreActions } from "../../store";
import { useBackendDomain } from "../../hooks/useBackendDomain";
import { Loader } from "../loader";

export const ProxyContent = () => {
  const actions = useStoreActions();
  const { domainRecord } = useStore();
  const { domain, loading } = useBackendDomain();
  const [proxyUrl, setProxyUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [proxyType, setProxyType] = useState<"iframe" | "reverse">("reverse");

  useEffect(() => {
    if (domain) {
      setProxyUrl(domain.proxy || "");
      setIframeUrl(domain.iframe || "");
      if (domain.iframe) {
        setProxyType("iframe");
      } else if (domain.proxy) {
        setProxyType("reverse");
      }
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
    const currentUrl = proxyType === "iframe" ? iframeUrl : proxyUrl;
    setIsValidInput(urlPattern.test(currentUrl));
  }, [proxyUrl, iframeUrl, proxyType]);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async () => {
    if (proxyType === "iframe") {
      await actions.handleSetIframe(iframeUrl);
    } else {
      await actions.handleSetProxy(proxyUrl);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-telegram-section-bg">
      <div className="flex flex-col gap-3 font-gotham text-telegram-text">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-2 text-center">
          Set Proxy
        </h2>
        <p className="text-sm text-telegram-subtitle-text mb-4 text-center">
          Configure your domain with a proxy URL for seamless connectivity.
        </p>
        <div className="space-y-4">
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setProxyType("reverse")}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                proxyType === "reverse"
                  ? "bg-telegram-button text-telegram-button-text"
                  : "bg-telegram-bg text-telegram-text"
              }`}
            >
              Reverse Proxy
            </button>
            <button
              onClick={() => setProxyType("iframe")}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                proxyType === "iframe"
                  ? "bg-telegram-button text-telegram-button-text"
                  : "bg-telegram-bg text-telegram-text"
              }`}
            >
              Iframe Proxy
            </button>
          </div>
          <div className="grid gap-1">
            <label
              htmlFor="proxyUrl"
              className="text-sm font-semibold text-telegram-accent-text"
            >
              URL *
            </label>
            <input
              id="proxyUrl"
              value={proxyType === "iframe" ? iframeUrl : proxyUrl}
              onChange={(e) =>
                proxyType === "iframe"
                  ? setIframeUrl(e.target.value)
                  : setProxyUrl(e.target.value)
              }
              className={`p-2 rounded-md w-full bg-telegram-bg border ${
                isValidInput
                  ? "border-green-500"
                  : "border-telegram-section-separator"
              } text-telegram-text placeholder-telegram-hint focus:ring-1 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out`}
              placeholder="https://example.com"
              autoCapitalize="off"
            />
            <p className="text-xs text-telegram-hint mt-1">
              Enter a valid URL (including http:// or https://)
            </p>
            {!isValidInput &&
              (proxyType === "iframe" ? iframeUrl : proxyUrl) && (
                <p className="text-xs text-red-500 mt-1">
                  Please enter a valid URL
                </p>
              )}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isValidInput}
          className={`mt-6 bg-telegram-button text-telegram-button-text rounded-md py-3 px-4 font-bold text-sm cursor-pointer whitespace-nowrap transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-telegram-accent-text focus:ring-opacity-50 ${
            !isValidInput
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-90"
          }`}
        >
          {proxyType === "iframe" ? "Set Iframe Proxy" : "Set Reverse Proxy"}
        </button>
        <p className="mt-2 text-xs text-telegram-hint text-center">
          Your proxy settings will be instantly updated. Ensure the input is
          correct!
        </p>
      </div>
    </div>
  );
};
