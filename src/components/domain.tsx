import { ArrowLeft, Eye, X } from "lucide-react";
import { useStore, useStoreActions } from "../store";
import { useState } from "react";
import { NFT } from "./nft";
import { OptionsList } from "./options/list";
import { Option } from "./options/option";

export const Domain = () => {
  const store = useStore();
  const actions = useStoreActions();
  const [hostingOption, setHostingOption] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-telegram-bg text-telegram-text">
      <button
        onClick={actions.handleBack}
        className="absolute top-4 left-4 p-2 rounded-full bg-telegram-button text-telegram-button-text transition-all duration-300 hover:bg-telegram-accent-text"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="mt-4 mb-4 text-center">
        <h1 className="font-gotham text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-telegram-button to-telegram-accent-text">
          {store.selectedDomain.replace(".ton", "")}
        </h1>
        {hostingOption === null ? (
          <a
            href={`https://${store.selectedDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-telegram-text flex-row gap-2"
          >
            <Eye size={24} />
            <span>Open in browser</span>
          </a>
        ) : null}
      </div>

      {hostingOption ? null : (
        <div>
          <div className="w-full flex items-center justify-center">
            <NFT />
          </div>
          <OptionsList setHostingOption={setHostingOption} />
        </div>
      )}

      <div className="w-full">
        <Option option={hostingOption} setHostingOption={setHostingOption} />
      </div>
    </div>
  );
};
