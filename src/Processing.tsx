import { useStore, useStoreActions } from "./store";
import { Loader } from "./components/loader";
import { Eye, Loader2, X } from "lucide-react";
import { NFT } from "./components/nft";

export const Processing = () => {
  const { proccessingTransaction, selectedDomain } = useStore();
  const { stopProcessingTransaction } = useStoreActions();

  if (!proccessingTransaction) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-telegram-bg to-telegram-secondary-bg flex items-center justify-center">
      {proccessingTransaction === "processing" && (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="w-3/4 flex flex-col items-center">
            <Loader2 className="animate-spin h-10 w-10 text-telegram-accent-text" />
            <p className="mt-6 text-telegram-text text-center text-lg">
              We are processing the transaction and setting up the application.
            </p>
          </div>
        </div>
      )}
      {proccessingTransaction === "finished" && (
        <div className="flex flex-col items-center relative w-full h-full">
          <button
            onClick={stopProcessingTransaction}
            className="absolute top-4 right-4 text-telegram-hint hover:text-telegram-text transition-colors duration-300"
          >
            <X size={32} />
          </button>
          <div className="flex flex-col items-center justify-center h-full">
            <NFT />
            <h1 className="font-gotham text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-telegram-button to-telegram-accent-text">
              {selectedDomain.replace(".ton", "")}
            </h1>
            <a
              href={`https://${selectedDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center bg-gradient-to-r from-telegram-button to-telegram-accent-text text-telegram-button-text px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Eye className="mr-3" size={24} />
              <span className="text-lg font-bold">Open site in browser</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
