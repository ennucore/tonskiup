import { Suspense, useState, useEffect } from "react";
import { Hosting } from "./components/Hosting";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useAuth } from "./hooks/useAuth.js";
import { HomeScreen } from "./components/home-screen.js";
import { Loader } from "./components/loader";
import useTimeout from "./hooks/useTimeout";
import { Processing } from "./Processing";
import { setHasSeenOnboarding, useHasSeenOnboarding } from "./store";
import { OnboardingScreen } from "./components/onboarding-screen";

function Home() {
  const { authorizated, token } = useAuth();
  const { network } = useTonConnect();
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationText, setAnimationText] = useState("");
  const hasSeenOnboarding = useHasSeenOnboarding();
  useTimeout(() => {
    setShowAnimation(false);
  }, 1000);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg?.CloudStorage) {
      tg.CloudStorage.getItem("has_seen_onboarding", (error, value) => {
        if (!error && value) {
          setHasSeenOnboarding(value === "true");
        }
      });
    }
  }, []);

  useEffect(() => {
    const text = "Agorata";
    let index = 0;
    const intervalId = setInterval(() => {
      setAnimationText((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(intervalId);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  if (showAnimation) {
    return (
      <div className="bg-telegram-bg text-telegram-text p-4 font-gotham font-normal min-h-screen flex items-center justify-center">
        <div className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-telegram-button to-telegram-accent-text text-transparent bg-clip-text">
            {animationText}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-telegram-bg text-telegram-text p-4 font-gotham font-normal min-h-screen">
      {hasSeenOnboarding ? (
        <div
          className={`flex ${network ? "justify-end" : "justify-center"} ${
            network ? "w-auto" : "w-full"
          }`}
        >
          {network && network === CHAIN.TESTNET ? (
            <button className="bg-[var(--tg-theme-button-color)] border-0 rounded-lg py-5 px-5 text-[var(--tg-theme-button-text-color)] font-normal font-gotham cursor-pointer whitespace-nowrap mt-[-7px]">
              "testnet"
            </button>
          ) : null}
          <TonConnectButton />
        </div>
      ) : null}
      <div className="flex flex-col items-center gap-5">
        {authorizated && token ? (
          <Suspense fallback={<Loader />}>
            <Hosting token={token} />
            <Processing />
          </Suspense>
        ) : hasSeenOnboarding ? (
          <HomeScreen />
        ) : (
          <OnboardingScreen />
        )}
      </div>
    </div>
  );
}

export default Home;
