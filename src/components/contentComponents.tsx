import React, { useState } from "react";
import { getSiteData } from "../hooks/useBackend.js";
import { Switch } from "./comps";

export const NoSiteContent = ({ onSetProxy }) => (
  <div className="p-5 rounded-lg bg-white dark:bg-telegram-bg">
    <div className="flex flex-col gap-2.5 font-normal text-telegram-text">
      <p>Don't host anything.</p>
      <button
        onClick={async () => await onSetProxy(null)}
        className="bg-telegram-button text-telegram-button-text rounded-lg py-5 px-5 font-normal cursor-pointer whitespace-nowrap"
      >
        Save
      </button>
    </div>
  </div>
);

export const SiteByTemplateContent = ({ onSave, domain }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [telegramDetails, setTelegramDetails] = useState("");
  const [tonWallet, setTonWallet] = useState(true);
  const [displayNFTs, setDisplayNFTs] = useState(false);

  if (!title && !description) {
    getSiteData(domain).then((site_data) => {
      if (site_data) {
        setTitle(site_data.title);
        setDescription(site_data.description);
      }
      console.log("SITE DATA\n\n\n", site_data);
      if (site_data.contacts) {
        console.log("Telegram Details");
        console.log(site_data.contacts.wallet);
        setTelegramDetails(site_data.contacts.telegram);
        console.log(tonWallet);
      }
    });
  }

  return (
    <div className="p-5 rounded-lg bg-white dark:bg-telegram-bg">
      <div className="flex flex-col gap-2.5 font-normal text-telegram-text">
        <div className="flex items-center justify-center">
          <div
            className="bg-cover bg-center border-3 border-[#3399ff] max-h-[150px] max-w-[150px] w-full min-h-40 min-w-48 m-4 rounded-[20px] transition-all duration-300 ease-in-out"
            style={{ backgroundImage: "url('/tem1.gif')" }}
          ></div>
        </div>
        <div className="grid gap-1.5 my-1.5">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2.5 rounded-lg w-full border border-gray-300 dark:border-gray-600 font-normal text-gray-700 dark:text-gray-300"
          />
        </div>
        <div className="grid gap-1.5 my-1.5">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2.5 rounded-lg w-full border border-gray-300 dark:border-gray-600 font-normal text-gray-700 dark:text-gray-300"
          />
        </div>
        <div className="grid gap-1.5 my-1.5">
          <label htmlFor="telegramDetails">Telegram Details</label>
          <input
            id="telegramDetails"
            value={telegramDetails}
            onChange={(e) => setTelegramDetails(e.target.value)}
            className="p-2.5 rounded-lg w-full border border-gray-300 dark:border-gray-600 font-normal text-gray-700 dark:text-gray-300"
          />
        </div>
        <div className="grid gap-1.5 my-1.5">
          <label htmlFor="tonWallet">TON Wallet</label>
          <Switch
            initialState={tonWallet}
            onToggle={(e) => setTonWallet(e.target)}
          />
        </div>
        <button
          onClick={async () =>
            await onSave({
              backgroundImage,
              title,
              description,
              picture,
              telegramDetails,
              tonWallet,
              displayNFTs,
            })
          }
          className="bg-telegram-button text-telegram-button-text rounded-lg py-5 px-5 font-normal cursor-pointer whitespace-nowrap"
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export const ProxyContent = ({
  onSetProxy,
  domainRecord,
}: {
  onSetProxy: (url: string) => Promise<void>;
  domainRecord: string;
}) => {
  let [proxyUrl, setProxyUrl] = useState("");
  if (domainRecord && !proxyUrl) {
    proxyUrl = domainRecord;
  }

  return (
    <div className="p-5 rounded-lg bg-telegram-bg">
      <div className="flex flex-col gap-2.5 font-normal text-telegram-text items-center">
        <p>
          We allow you to set an ADNL address or a usual website here (in that
          case, we will proxy it for you)
        </p>
        <label htmlFor="proxyUrl">Enter URL to Proxy</label>
        <input
          id="proxyUrl"
          value={proxyUrl}
          onChange={(e) => setProxyUrl(e.target.value)}
          className="p-2.5 rounded-lg w-full border border-gray-300 dark:border-gray-600 font-normal text-gray-700 dark:text-gray-300"
        />
        <button
          onClick={async () => await onSetProxy(proxyUrl)}
          className="bg-telegram-button text-telegram-button-text rounded-lg py-5 px-5 font-normal cursor-pointer whitespace-nowrap"
        >
          Set Proxy
        </button>
      </div>
    </div>
  );
};

export const RedirectContent = ({ onSetRedirect }) => {
  const [redirectUrl, setRedirectUrl] = useState("");

  return (
    <div className="p-5 rounded-lg bg-white dark:bg-telegram-bg">
      <div className="flex flex-col gap-2.5 font-normal text-telegram-text">
        <label htmlFor="redirectUrl">Enter URL to Redirect to</label>
        <input
          id="redirectUrl"
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
          className="p-2.5 rounded-lg w-full border border-gray-300 dark:border-gray-600 font-normal text-gray-700 dark:text-gray-300"
        />
        <button
          onClick={async () => await onSetRedirect(redirectUrl)}
          className="bg-telegram-button text-telegram-button-text rounded-lg py-5 px-5 font-normal cursor-pointer whitespace-nowrap"
        >
          Set Redirect
        </button>
      </div>
    </div>
  );
};
