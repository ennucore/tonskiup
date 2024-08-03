import { useStoreActions } from "../../store";
import { useBackendDomain } from "../../hooks/useBackendDomain";

export const NoSiteContent = () => {
  const actions = useStoreActions();
  const { domain } = useBackendDomain();

  const getClearText = () => {
    if (domain?.proxy) return "Reset proxy configuration";
    if (domain?.redirect) return "Reset redirect configuration";
    if (domain?.title) return "Reset template configuration";
    return "Reset domain configuration";
  };

  return (
    <div className="p-4 rounded-2xl bg-telegram-section-bg">
      <div className="flex flex-col gap-4 font-gotham text-telegram-text">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-2">
          Reset Configuration
        </h2>
        <p className="text-telegram-subtitle-text mb-4">
          This action will reset the current configuration for your domain.
          Your domain will remain active and registered to you, but without any
          specific settings.
        </p>
        <div className="bg-telegram-secondary-bg p-4 rounded-lg mb-4">
          <ul className="list-disc list-inside text-telegram-hint">
            <li>All current settings will be reset</li>
            <li>Domain will return to its default state</li>
            <li>You can reconfigure the domain at any time</li>
          </ul>
        </div>
        <button
          onClick={async () => await actions.handleSetProxy(null)}
          className="bg-red-500 text-white rounded-lg py-3 px-6 font-medium cursor-pointer transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          {getClearText()}
        </button>
      </div>
    </div>
  );
};
