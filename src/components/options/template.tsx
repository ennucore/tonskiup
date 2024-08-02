import { useEffect, useState } from "react";
import { useStoreActions } from "../../store";
import { Switch } from "../ui/switch";
import { Loader } from "../loader";
import { useBackendDomain } from "../../hooks/useBackendDomain";

export const SiteByTemplateContent = () => {
  const actions = useStoreActions();
  const { domain, loading } = useBackendDomain();
  const [title, setTitle] = useState(domain?.title || "");
  const [description, setDescription] = useState(domain?.description || "");
  const [telegramDetails, setTelegramDetails] = useState(
    domain?.contacts?.telegram || ""
  );
  const [tonWallet, setTonWallet] = useState(Boolean(domain?.contacts?.wallet));

  useEffect(() => {
    if (domain) {
      setTitle(domain.title || "");
      setDescription(domain.description || "");
      setTelegramDetails(domain.contacts?.telegram || "");
      setTonWallet(Boolean(domain.contacts?.wallet));
    }
  }, [domain]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 rounded-lg bg-telegram-section-bg">
      <div className="flex flex-col gap-3 font-gotham text-telegram-text">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-2 text-center">
          Customize Your Site
        </h2>
        <p className="text-sm text-telegram-subtitle-text mb-4 text-center">
          Create a stunning personal page that reflects your unique style and
          connects you with your audience.
        </p>
        <div className="flex items-center justify-center mb-6">
          <div
            className="bg-cover bg-center w-full h-48 rounded-lg overflow-hidden relative"
            style={{
              backgroundImage:
                "linear-gradient(45deg, var(--tg-theme-button-color), var(--tg-theme-accent-text-color), var(--tg-theme-link-color), var(--tg-theme-destructive-text-color))",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-xl font-bold text-telegram-button-text mb-1">
                {title || "Your Awesome Title"}
              </h3>
              <p className="text-xs text-telegram-button-text">
                {description || "Your captivating description goes here"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-1">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-telegram-accent-text"
            >
              Title *
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded-md w-full bg-telegram-bg border border-telegram-section-separator text-telegram-text placeholder-telegram-hint focus:ring-1 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Enter a catchy title"
            />
            <p className="text-xs text-telegram-hint mt-1">Required field</p>
          </div>

          <div className="grid gap-1">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-telegram-accent-text"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded-md w-full bg-telegram-bg border border-telegram-section-separator text-telegram-text placeholder-telegram-hint focus:ring-1 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out h-32 resize-none"
              placeholder="Describe yourself or your project"
            />
          </div>

          <div className="grid gap-1">
            <label
              htmlFor="telegramDetails"
              className="text-sm font-semibold text-telegram-accent-text"
            >
              Telegram Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-telegram-hint">
                @
              </span>
              <input
                id="telegramDetails"
                value={telegramDetails}
                onChange={(e) => setTelegramDetails(e.target.value)}
                className="p-2 pl-6 rounded-md w-full bg-telegram-bg border border-telegram-section-separator text-telegram-text placeholder-telegram-hint focus:ring-1 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out"
                placeholder="your_username"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="tonWallet"
              className="text-sm font-semibold text-telegram-accent-text"
            >
              Display TON Wallet
            </label>
            <Switch
              initialState={tonWallet}
              onToggle={(state) => setTonWallet(state)}
            />
          </div>
        </div>

        <button
          onClick={async () =>
            await actions.handleSaveTemplate({
              title,
              description,
              telegramDetails,
              tonWallet,
            })
          }
          disabled={!title}
          className={`mt-6 bg-telegram-button text-telegram-button-text rounded-md py-3 px-4 font-bold text-sm cursor-pointer whitespace-nowrap transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-telegram-accent-text focus:ring-opacity-50 ${
            !title
              ? "opacity-50 cursor-not-allowed bg-gray-400"
              : "hover:bg-opacity-90"
          }`}
        >
          Save and Publish
        </button>

        <p className="mt-2 text-xs text-telegram-hint text-center">
          Your site will be instantly updated with these changes. Make sure
          everything looks perfect!
        </p>
      </div>
    </div>
  );
};
