import { useStoreActions } from "../../store";

export const NoSiteContent = () => {
  const actions = useStoreActions();
  return (
    <div className="p-4 rounded-2xl bg-telegram-section-bg">
      <div className="flex flex-col gap-4 font-gotham text-telegram-text">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-2">
          Empty Site
        </h2>
        <p className="text-telegram-subtitle-text mb-4">
          Your domain will not host any content. This option is ideal if you
          want to reserve the domain for future use or keep it inactive.
        </p>
        <div className="bg-telegram-secondary-bg p-4 rounded-lg mb-4">
          <ul className="list-disc list-inside text-telegram-hint">
            <li>No content will be displayed</li>
            <li>Domain remains registered to you</li>
            <li>Can be easily activated later</li>
          </ul>
        </div>
        <button
          onClick={async () => await actions.handleSetProxy(null)}
          className="bg-telegram-button text-telegram-button-text rounded-lg py-3 px-6 font-medium cursor-pointer transition-all duration-300 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-telegram-button focus:ring-opacity-50"
        >
          Confirm Empty Site
        </button>
      </div>
    </div>
  );
};
