import { useEffect, useState } from "react";
import { useStoreActions } from "../../store";
import { useBackendDomain } from "../../hooks/useBackendDomain";
import { Loader } from "../loader";

export const RedirectContent = () => {
  const actions = useStoreActions();
  const { domain, loading } = useBackendDomain();
  const [redirectUrl, setRedirectUrl] = useState(domain?.redirect || "");

  useEffect(() => {
    setRedirectUrl(domain?.redirect || "");
  }, [domain]);

  if (loading) {
    return <Loader />;
  }

  console.log(redirectUrl);

  return (
    <div className="p-4 bg-telegram-section-bg rounded-lg shadow-md">
      <div className="flex flex-col gap-4 font-gotham text-telegram-text">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-2">
          Set Redirect URL
        </h2>
        <p className="text-center text-telegram-subtitle-text mb-4">
          Enter the URL you want to redirect your domain to. This will send
          visitors to the specified website when they access your domain.
        </p>
        <div className="w-full">
          <label
            htmlFor="redirectUrl"
            className="block text-sm font-medium text-telegram-hint mb-2"
          >
            Enter Redirect URL
          </label>
          <input
            id="redirectUrl"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            className="p-3 rounded-lg w-full bg-telegram-bg border border-telegram-section-separator text-telegram-text placeholder-telegram-hint focus:ring-2 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out"
            placeholder="e.g., https://example.com"
          />
        </div>
        <button
          onClick={async () => await actions.handleSetRedirect(redirectUrl)}
          className="mt-4 bg-telegram-button text-telegram-button-text rounded-lg py-3 px-6 font-medium cursor-pointer whitespace-nowrap hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-telegram-accent-text focus:ring-opacity-50"
        >
          Set Redirect
        </button>
        <div className="mt-4 text-sm text-telegram-hint">
          <p>Important notes:</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              Always include the full URL, starting with 'http://' or 'https://'
            </li>
            <li>Double-check the URL to ensure it's correct</li>
            <li>The redirect will take effect immediately after setting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
