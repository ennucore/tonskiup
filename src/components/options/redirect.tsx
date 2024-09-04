import { useEffect, useState } from "react";
import { useStoreActions } from "../../store";
import { useBackendDomain } from "../../hooks/useBackendDomain";
import { Loader } from "../loader";

export const RedirectContent = () => {
  const actions = useStoreActions();
  const { domain, loading } = useBackendDomain();
  const [redirectUrl, setRedirectUrl] = useState(domain?.redirect || "");
  const [isValidUrl, setIsValidUrl] = useState(false);

  useEffect(() => {
    if (domain) {
      setRedirectUrl(domain.redirect || "");
    }
  }, [domain]);

  useEffect(() => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    setIsValidUrl(
      urlPattern.test(redirectUrl) &&
        (redirectUrl.startsWith("http://") ||
          redirectUrl.startsWith("https://"))
    );
  }, [redirectUrl]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 rounded-lg bg-telegram-section-bg">
      <div className="flex flex-col gap-3 font-gotham text-telegram-text">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-2 text-center">
          Set Your Redirect
        </h2>
        <p className="text-sm text-telegram-subtitle-text mb-4 text-center">
          Effortlessly guide your visitors to any destination by setting up a
          custom redirect for your domain.
        </p>
        <div className="space-y-4">
          <div className="grid gap-1">
            <label
              htmlFor="redirectUrl"
              className="text-sm font-semibold text-telegram-accent-text"
            >
              Redirect URL *
            </label>
            <input
              id="redirectUrl"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              className={`p-2 rounded-md w-full bg-telegram-bg border ${
                isValidUrl
                  ? "border-green-500"
                  : "border-telegram-section-separator"
              } text-telegram-text placeholder-telegram-hint focus:ring-1 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out`}
              placeholder="https://example.com"
              autoCapitalize="off"
            />
            <p className="text-xs text-telegram-hint mt-1">
              Enter the full URL including http:// or https://
            </p>
            {!isValidUrl && redirectUrl && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid URL starting with http:// or https://
              </p>
            )}
          </div>
        </div>
        <button
          onClick={async () => await actions.handleSetRedirect(redirectUrl)}
          disabled={!isValidUrl}
          className={`mt-6 bg-telegram-button text-telegram-button-text rounded-md py-3 px-4 font-bold text-sm cursor-pointer whitespace-nowrap transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-telegram-accent-text focus:ring-opacity-50 ${
            !isValidUrl
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-90"
          }`}
        >
          Set Redirect
        </button>
        <p className="mt-2 text-xs text-telegram-hint text-center">
          Your redirect will be instantly active. Ensure the URL is correct
          before setting!
        </p>
      </div>
    </div>
  );
};
