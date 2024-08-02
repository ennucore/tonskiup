import { useBackendDomain } from "../../hooks/useBackendDomain";
import { Loader } from "../loader";
import { hostingOptions } from "./config";

type OptionListProps = {
  setHostingOption: (option: string) => void;
};

export const OptionsList = (props: OptionListProps) => {
  const { domain, loading } = useBackendDomain();

  if (loading || !domain) {
    return <Loader />;
  }

  const selectedOption = domain?.proxy
    ? "proxy"
    : domain?.redirect
    ? "redirect"
    : domain?.title
    ? "template"
    : null;

  const renderSelectedOption = () => {
    if (!selectedOption) {
      return null;
    }
    const option = hostingOptions.find((opt) => opt.key === selectedOption);
    if (!option) {
      return null;
    }

    return (
      <div className="w-full mb-8">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-4">
          Selected Hosting Option
        </h2>
        <button
          onClick={() => {
            props.setHostingOption(option.name);
          }}
          className="bg-gradient-to-r from-telegram-bg to-telegram-secondary-bg rounded-2xl shadow-xl overflow-hidden border border-telegram-section-separator transition-all duration-500 ease-in-out transform hover:scale-105 p-6 w-full"
        >
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-4">{option.icon}</div>
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-telegram-text to-telegram-accent-text">
              {option.name}
            </h3>
          </div>
          <p className="text-sm text-telegram-hint text-left">
            {option.description}
          </p>
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {selectedOption ? (
        <>
          {renderSelectedOption()}
          <h2 className="text-xl font-bold text-telegram-accent-text mb-4">
            Choose Another Hosting Option
          </h2>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-telegram-accent-text mb-4">
            Hosting Options
          </h1>
          <p className="text-telegram-hint mb-8">
            Choose the best hosting option for your domain
          </p>
        </>
      )}
      <div className="grid grid-cols-2 gap-4">
        {hostingOptions
          .filter((option) => option.key !== selectedOption)
          .map((option) => (
            <button
              key={option.name}
              className="bg-gradient-to-r from-telegram-bg to-telegram-secondary-bg rounded-xl p-4 cursor-pointer border border-telegram-section-separator flex flex-col items-center text-center gap-2 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group"
              onClick={() => {
                props.setHostingOption(option.name);
              }}
            >
              <div className="text-4xl group-hover:text-telegram-accent-text transition-colors duration-300">
                {option.icon}
              </div>
              <span className="text-xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-telegram-text group-hover:to-telegram-accent-text transition-all duration-300">
                {option.name}
              </span>
              <p className="text-xs text-telegram-hint group-hover:text-telegram-text transition-colors duration-300">
                {option.description}
              </p>
            </button>
          ))}
      </div>
    </div>
  );
};
