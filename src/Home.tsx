import { Hosting } from "./components/Hosting.js";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useCallback,
} from "react";
import {
  TonConnectUIProvider,
  useTonConnectUI,
  TonConnectButton,
  useIsConnectionRestored,
  useTonWallet,
} from "@tonconnect/ui-react";
import useInterval from "./hooks/useInterval";
const localStorageKey = "agora-auth-token";
const payloadTTLMS = 1000 * 60 * 20;
function Home() {
  const { network } = useTonConnect();
  const firstProofLoading = useRef<boolean>(true);
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const recreateProofPayload = useCallback(async () => {
    if (firstProofLoading.current) {
      tonConnectUI.setConnectRequestParameters({ state: "loading" });
      firstProofLoading.current = false;
    }

    const response = await fetch(
      "http://localhost:5170/api/generate-ton-proof",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const value = await response.json();
    console.log(value);
    if (value) {
      tonConnectUI.setConnectRequestParameters({
        state: "ready",
        value: {
          tonProof: value.payload,
        },
      });
    } else {
      tonConnectUI.setConnectRequestParameters(null);
    }
  }, [tonConnectUI, firstProofLoading]);

  if (firstProofLoading.current) {
    recreateProofPayload();
  }

  useInterval(recreateProofPayload, payloadTTLMS);

  useEffect(
    () =>
      tonConnectUI.onStatusChange(async (wallet) => {
        if (!wallet) {
          return;
        }

        console.log(wallet, wallet.connectItems);

        if (
          wallet.connectItems?.tonProof &&
          "proof" in wallet.connectItems.tonProof
        ) {
          const response = await fetch(
            "http://localhost:5170/api/verify-ton-proof",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                address: wallet.account.address,
                network: wallet.account.chain,
                public_key: wallet.account.publicKey,
                proof: {
                  ...wallet.connectItems.tonProof,
                  state_init: wallet.account.walletStateInit,
                },
              }),
            }
          );
          const result = await response.json();
          console.log(result);
          if (result.jwt) {
            localStorage.setItem(localStorageKey, result.jwt);
          } else {
            tonConnectUI.disconnect();
            localStorage.removeItem(localStorageKey);
          }
        }
      }),
    [tonConnectUI]
  );
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
