import React from "react";
import { useStore, useStoreActions } from "../store";
import { ArrowRightCircle, FileX, LayoutTemplate, Network } from "lucide-react";
import { hostingOptions } from "./options/config";

export const ListDomains = () => {
  const { domains } = useStore();
  const { chooseDomain } = useStoreActions();

  const getHostingIcon = (domain: Domain) => {
    if (domain.site.proxy) return <Network className="w-4 h-4" />;
    if (domain.site.redirect) return <ArrowRightCircle className="w-4 h-4" />;
    if (domain.site.title) return <LayoutTemplate className="w-4 h-4" />;
    return null;
  };

  const getHostingText = (domain: Domain) => {
    if (domain.site.proxy) return "proxy";
    if (domain.site.redirect) return "redirect";
    if (domain.site.title) return "template";
    return null;
  };

  return (
    <>
      <h1 className="font-gotham text-3xl font-bold text-telegram-accent-text mb-8 text-center mt-6">
        Select Your Domain
      </h1>
      <div className="flex flex-col w-full max-w-md mx-auto bg-telegram-section-bg rounded-2xl shadow-xl overflow-hidden border border-telegram-section-separator">
        {domains.map((domain, index) => (
          <React.Fragment key={domain.domain}>
            <div
              className="rounded-xl shadow-lg transition-all duration-500 ease-in-out transform cursor-pointer bg-gradient-to-r from-telegram-bg to-telegram-secondary-bg group"
              onClick={() => chooseDomain(domain.domain, domain.address)}
            >
              <div className="flex h-32">
                <div className="relative w-32 h-full flex-shrink-0">
                  <img
                    src={domain.picture}
                    alt={domain.domain}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow flex flex-col items-end justify-between p-6">
                  <h3 className="text-md font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-telegram-text to-telegram-accent-text group-hover:from-telegram-accent-text group-hover:to-telegram-button break-all">
                    {domain.domain.replace(".ton", "")}
                  </h3>
                  {getHostingText(domain) && (
                    <div className="flex items-center mt-2 text-xs text-telegram-hint">
                      {getHostingIcon(domain)}
                      <span className="ml-1">{getHostingText(domain)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-telegram-button via-telegram-accent-text to-telegram-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
            {index < domains.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-telegram-section-separator to-transparent my-4" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-8 w-full max-w-md mx-auto bg-telegram-secondary-bg rounded-lg p-4 text-center text-telegram-hint text-sm">
        Click on a domain to manage its hosting settings
      </div>
    </>
  );
};
