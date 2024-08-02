export const NoDomains = () => {
  return (
    <div className="font-gotham text-center text-telegram-text mt-4 w-full bg-telegram-secondary-bg p-8 rounded-lg ">
      <h1 className="text-3xl font-bold mb-4 text-telegram-accent-text">
        No TON DNS Domains Found
      </h1>
      <p className="text-xl text-telegram-subtitle-text mb-6">
        Unlock the power of decentralized domains!
      </p>
      <div className="bg-telegram-section-bg p-6 rounded-md border border-telegram-section-separator">
        <p className="text-lg text-telegram-text mb-4">
          Visit{" "}
          <a
            href="http://dns.ton.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-telegram-link hover:text-telegram-button transition-colors duration-300 underline"
          >
            dns.ton.org
          </a>{" "}
          to purchase and connect your domain.
        </p>
        <p className="text-lg text-telegram-text">
          Once connected, return to this app to manage and customize your new
          digital identity!
        </p>
      </div>
    </div>
  );
};
