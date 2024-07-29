import "./index.css";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import Home from "./Home";

const manifestUrl = "https://agorata.io/tonconnect-manifest.json";

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      uiPreferences={{ theme: THEME.DARK }}
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/MinutesSecondsBot/demo",
      }}
    >
      <div className="bg-telegram-bg text-telegram-text p-5 font-gotham font-normal min-h-screen">
        <Home />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
