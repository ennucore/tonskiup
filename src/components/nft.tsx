import { X } from "lucide-react";
import { useStore } from "../store";
import { useState } from "react";

export const NFT = () => {
  const store = useStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  return (
    <div>
      <img
        src={
          store.domains.find((d) => d.domain === store.selectedDomain)?.picture
        }
        alt={store.selectedDomain}
        className="w-32 h-32 rounded-lg  mb-8 transition-all duration-300  hover:scale-105 cursor-pointer"
        onClick={() => setIsFullscreen(!isFullscreen)}
      />
      {isFullscreen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-telegram-bg bg-opacity-90">
          <img
            src={
              store.domains.find((d) => d.domain === store.selectedDomain)
                ?.picture
            }
            alt={store.selectedDomain}
            className="max-w-full max-h-full object-contain"
            onClick={() => setIsFullscreen(false)}
          />
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-telegram-button text-telegram-button-text transition-all duration-300 hover:bg-telegram-accent-text"
          >
            <X size={24} />
          </button>
        </div>
      ) : null}
    </div>
  );
};
