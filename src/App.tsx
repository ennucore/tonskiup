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
import Home from "./Home";


const App = () => {
  return (
    <TonConnectUIProvider manifestUrl="https://agorata.io/tonconnect-manifest.json">
      <Home />
    </TonConnectUIProvider>
  );
};

export const MainContent = () => {
  
  return null;
};

export default App;
