import { Hosting } from "./components/Hosting.js";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { TonConnectButton } from "@tonconnect/ui-react";

function Home() {
  const { network } = useTonConnect();
  return (
    <div className="bg-telegram-bg text-telegram-text p-4 font-gotham font-normal min-h-screen">
      <div
        className={`flex ${network ? "justify-end" : "justify-center"} ${
          network ? "w-auto" : "w-full"
        }`}
      >
        {network && network === CHAIN.TESTNET && (
          <button className="bg-[var(--tg-theme-button-color)] border-0 rounded-lg py-5 px-5 text-[var(--tg-theme-button-text-color)] font-normal font-gotham cursor-pointer whitespace-nowrap mt-[-7px]">
            "testnet"
          </button>
        )}
        <TonConnectButton />
      </div>
      <Hosting />
    </div>
  );
}

export default Home;
