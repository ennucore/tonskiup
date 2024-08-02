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
    <div className="p-6 rounded-2xl bg-telegram-section-bg shadow-lg">
      <div className="flex flex-col gap-4 font-gotham text-telegram-text">
        <h2 className="text-3xl font-bold text-telegram-accent-text mb-4 text-center">
          Customize Your Site
        </h2>
        <p className="text-telegram-subtitle-text mb-6 text-center">
          Create a stunning personal page that reflects your unique style and
          connects you with your audience.
        </p>
        <div className="flex items-center justify-center mb-8">
          <div
            className="bg-cover bg-center border-4 border-telegram-button w-full h-64 rounded-3xl transition-all duration-500 ease-in-out transform hover:scale-105 shadow-xl overflow-hidden relative"
            style={{
              backgroundImage:
                "linear-gradient(45deg, var(--tg-theme-button-color), var(--tg-theme-accent-text-color), var(--tg-theme-link-color), var(--tg-theme-destructive-text-color))",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-2xl font-bold text-telegram-button-text mb-2 animate-pulse">
                {title || "Your Awesome Title"}
              </h3>
              <p className="text-sm text-telegram-button-text animate-pulse">
                {description || "Your captivating description goes here"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-2">
            <label
              htmlFor="title"
              className="text-lg font-semibold text-telegram-accent-text"
            >
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded-lg w-full bg-telegram-bg border border-telegram-section-separator text-telegram-text placeholder-telegram-hint focus:ring-2 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Enter a catchy title"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="description"
              className="text-lg font-semibold text-telegram-accent-text"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 rounded-lg w-full bg-telegram-bg border border-telegram-section-separator text-telegram-text placeholder-telegram-hint focus:ring-2 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out h-24 resize-none"
              placeholder="Describe yourself or your project"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="telegramDetails"
              className="text-lg font-semibold text-telegram-accent-text"
            >
              Telegram Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-telegram-hint">
                @
              </span>
              <input
                id="telegramDetails"
                value={telegramDetails}
                onChange={(e) => setTelegramDetails(e.target.value)}
                className="p-3 pl-8 rounded-lg w-full bg-telegram-bg border border-telegram-section-separator text-telegram-text placeholder-telegram-hint focus:ring-2 focus:ring-telegram-button focus:border-transparent transition duration-300 ease-in-out"
                placeholder="your_username"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="tonWallet"
              className="text-lg font-semibold text-telegram-accent-text"
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
          className="mt-8 bg-telegram-button text-telegram-button-text rounded-lg py-4 px-6 font-bold text-lg cursor-pointer whitespace-nowrap hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-telegram-accent-text focus:ring-opacity-50 shadow-md"
        >
          Save and Publish
        </button>

        <p className="mt-4 text-sm text-telegram-hint text-center">
          Your site will be instantly updated with these changes. Make sure
          everything looks perfect!
        </p>
      </div>
    </div>
  );
};
