import { CheckCircle, Globe, Settings, Wallet } from "lucide-react";

export const HomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-telegram-bg text-telegram-text mt-4">
      <h1 className="text-6xl font-bold mb-6 text-telegram-button font-gotham">
        Agorata
      </h1>

      <div className="max-w-3xl text-center mb-4 bg-telegram-secondary-bg p-8 rounded-lg">
        <div className="flex flex-col items-start text-left">
          <h2 className="text-2xl font-semibold mb-4 text-telegram-accent-text font-gotham">
            How to use Agorata:
          </h2>
          <div className="flex items-center mb-4">
            <Wallet className="min-w-6 min-h-6 mr-4 text-telegram-link" />
            <p className="text-lg text-telegram-text font-gotham">
              1. Connect your wallet
            </p>
          </div>
          <div className="flex items-center mb-4">
            <Globe className="min-w-6 min-h-6 mr-4 text-telegram-link" />
            <p className="text-lg text-telegram-text font-gotham">
              2. Choose a domain
            </p>
          </div>
          <div className="flex flex-row items-center mb-4">
            <Settings className="min-w-6 min-h-6 mr-4 text-telegram-link" />
            <p className="text-lg text-telegram-text font-gotham">
              3. Select one of four options: template, redirect, proxy, or no
              hosting
            </p>
          </div>
          <div className="flex items-center">
            <CheckCircle className="min-w-6 min-h-6 mr-4 text-telegram-link" />
            <p className="text-lg text-telegram-text font-gotham">
              4. Confirm the transaction and view your site
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl text-center bg-telegram-secondary-bg p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-telegram-accent-text font-gotham">
          Don't have a domain yet?
        </h2>
        <p className="text-xl text-telegram-text font-gotham">
          Purchase your domain on{" "}
          <a
            href="http://dns.ton.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-telegram-link hover:text-telegram-button transition-colors duration-300 underline"
          >
            dns.ton.org
          </a>{" "}
          to get started with Agorata.
        </p>
      </div>
    </div>
  );
};
