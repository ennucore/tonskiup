import {
  ArrowRight,
  Globe,
  Lock,
  Server,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { setHasSeenOnboarding } from "../store";
import { MainButton } from "@twa-dev/sdk/react";

export const OnboardingScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Welcome to Agorata",
      description: "Your Gateway to Web3",
      isWelcome: true,
    },
    {
      title: "Welcome to Web3 Future",
      description:
        "Launch your decentralized website on TON Network in minutes",
      blocks: [
        {
          icon: <Server className="w-8 h-8 text-telegram-button" />,
          title: "Decentralized",
          description: "A peer-to-peer network that has no centralized servers",
        },
        {
          icon: <Lock className="w-8 h-8 text-telegram-button" />,
          title: "Encrypted",
          description:
            "Encryption and verification of data via built-in cryptography",
        },
        {
          icon: <Globe className="w-8 h-8 text-telegram-button" />,
          title: "No Centralized Certificates",
          description: "No need for traditional SSL certificates",
        },
      ],
    },
    {
      title: "Get Your Perfect Domain Name",
      description:
        "Your Web3-Site can be easily found in the TON network. Accept payments directly to your domain.",
      features: [
        {
          title: "Future Without Passwords",
          description:
            "No more passwords or spam - just seamless Web3 authentication",
        },
        {
          title: "Available Everywhere",
          items: [
            "Telegram Browser",
            "Tonkeeper Mobile Browser",
            "TON Proxy Desktop App",
            "MyTonWallet Extension",
          ],
        },
      ],
    },
    {
      title: "About The Open Network",
      description:
        "TON is more than blockchain - it's the future of the internet",
      content: `First of all, network protocols were created specifically for the TON blockchain so that nodes could communicate with one another and exchange data. Currently, the network houses solutions that are so powerful and universal that, together, they equate to the internet of a new generation.

TON network is interesting itself, even apart from the TON blockchain, it's fully decentralized, secure, and private computer network akin to TOR or the I2P (Invisible Internet Project).

TON network is deeply integrated with TON blockchain, the project's native Toncoin cryptocurrency and TON services — it creates a synergy, elevating the network's technology to a whole new level.

You can find a more technical explanation of the protocols on the TON network in The Open Network's white paper, in Chapter 3.`,
    },
  ];

  const currentPageData = pages[currentPage];

  const handleFinishOnboarding = () => {
    console.log("finish onboarding");
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.CloudStorage) {
      tg.CloudStorage.setItem("has_seen_onboarding", "true", (error: any) => {
        console.log("error", error);
        if (!error) {
          console.log("finish onboarding 2");
          setHasSeenOnboarding(true);
        }
      });
    }
  };

  const handleNext = () => {
    if (currentPage === pages.length - 1) {
      handleFinishOnboarding();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  console.log(currentPageData);

  return (
    <div className="flex-1 bg-telegram-bg text-telegram-text px-4">
      {currentPageData.isWelcome ? (
        <div className="text-center animate-fadeIn flex flex-col items-center justify-center min-h-[80vh]">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-telegram-button to-telegram-accent-text bg-clip-text text-transparent font-gotham animate-slideDown">
            {currentPageData.title}
          </h1>
          <p className="text-xl mb-12 text-telegram-text/90 animate-slideUp">
            {currentPageData.description}
          </p>
          <button
            onClick={() => setCurrentPage(1)}
            className="px-12 py-5 bg-gradient-to-r from-telegram-button to-telegram-accent-text text-white text-lg rounded-2xl hover:shadow-lg hover:shadow-telegram-button/20 transform hover:scale-105 transition-all duration-300 font-medium"
          >
            Start Journey
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6 pt-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: pages.length }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentPage
                      ? "bg-telegram-button w-8"
                      : "bg-telegram-secondary-bg w-2"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                className={`p-2 rounded-full transition-all duration-300 ${
                  currentPage === 0
                    ? "bg-telegram-secondary-bg text-telegram-text/50 cursor-not-allowed"
                    : "bg-telegram-button text-white hover:bg-telegram-button/90"
                }`}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 bg-telegram-button text-white rounded-full hover:bg-telegram-button/90 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-2 rounded-2xl animate-fadeIn">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-telegram-button to-telegram-accent-text bg-clip-text text-transparent font-gotham">
              {currentPageData.title}
            </h1>

            <p className="text-lg mb-8 text-telegram-text/90">
              {currentPageData.description}
            </p>

            {currentPageData.blocks && (
              <div className="space-y-4">
                {currentPageData.blocks.map((block, index) => (
                  <div
                    key={index}
                    className="bg-telegram-secondary-bg p-4 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-telegram-bg p-3 rounded-xl">
                        {block.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-telegram-button">
                          {block.title}
                        </h3>
                        <p className="text-sm text-telegram-text/80">
                          {block.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentPageData.features && (
              <div className="space-y-4">
                {currentPageData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-telegram-secondary-bg p-4 rounded-xl"
                  >
                    <h3 className="text-base font-bold text-telegram-button mb-2">
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p className="text-sm text-telegram-text/80 mb-3">
                        {feature.description}
                      </p>
                    )}
                    {feature.items && (
                      <ul className="space-y-2">
                        {feature.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm group"
                          >
                            <ArrowRight className="w-4 h-4 mr-2 text-telegram-button transform group-hover:translate-x-1 transition-transform" />
                            <span className="group-hover:text-telegram-button transition-colors">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {currentPageData.content && (
              <div className="prose text-telegram-text/80 max-w-none">
                {currentPageData.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {!currentPageData.isWelcome ? (
        <MainButton
          text={currentPage === pages.length - 1 ? "Get Started" : "Next"}
          onClick={handleNext}
          color="#0088CC"
          textColor="#FFFFFF"
        />
      ) : null}
    </div>
  );
};
