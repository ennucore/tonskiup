import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Home from "./Home";
import { MANIFEST_URL } from "./constants";

const App = () => {
  return (
    <div className="bg-telegram-bg min-h-screen min-w-screen">
      <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
        <Home />
      </TonConnectUIProvider>
    </div>
  );
};

export default App;
