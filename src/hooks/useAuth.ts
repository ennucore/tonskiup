import { useEffect, useRef, useCallback, useState } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import useInterval from "./useInterval";
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants";
import { useTonConnect } from "./useTonConnect";
const PAYLOAD_TTL_MS = 1000 * 60 * 20;

export const useAuth = () => {
  const { wallet } = useTonConnect();
  const [authorizated, setAuthorizated] = useState(Boolean(wallet));
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN_KEY, "");
  const firstProofLoading = useRef<boolean>(true);
  const [tonConnectUI] = useTonConnectUI();
  const [loading, setLoading] = useState(true);
  const recreateProofPayload = useCallback(async () => {
    if (firstProofLoading.current) {
      tonConnectUI.setConnectRequestParameters({ state: "loading" });
      firstProofLoading.current = false;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/generate-ton-proof`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const value = await response.json();
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

  useInterval(recreateProofPayload, PAYLOAD_TTL_MS);

  useEffect(() => {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    setAuthorizated(Boolean(wallet));
  }, [wallet]);

  useEffect(() => {
    const handleDisconnection = () => {
      console.log("disconnected");
      setAuthorizated(false);
      setToken("");
    };

    window.addEventListener(
      "ton-connect-ui-disconnection",
      handleDisconnection
    );

    return () => {
      window.removeEventListener(
        "ton-connect-ui-disconnection",
        handleDisconnection
      );
    };
  }, []);

  useEffect(
    () =>
      tonConnectUI.onStatusChange(async (wallet) => {
        if (!wallet) {
          return;
        }

        if (
          wallet.connectItems?.tonProof &&
          "proof" in wallet.connectItems.tonProof
        ) {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND}/api/verify-ton-proof`,
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
          if (result.jwt) {
            setToken(result.jwt);
            setAuthorizated(true);
          } else {
            setAuthorizated(false);
            tonConnectUI.disconnect();
            setToken("");
          }
        }
      }),
    [tonConnectUI]
  );
  return { authorizated, loading, setAuthorizated, token, setToken };
};
