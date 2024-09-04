import { useBackendDomain } from "../../hooks/useBackendDomain";
import { Loader } from "../loader";
import { hostingOptions } from "./config";
import { Trash2 } from "lucide-react";
import { getSelectedOption } from "./get-selected-option";
import { useEffect, useState } from "react";

type OptionListProps = {
  setHostingOption: (option: string) => void;
};

export const OptionsList = (props: OptionListProps) => {
  const { domain, loading } = useBackendDomain();
  const [selectedOption, setSelectedOption] = useState<
    "Proxy" | "Redirect" | "Template" | null
  >(null);

  useEffect(() => {
    if (!domain) return;
    getSelectedOption(domain).then(setSelectedOption);
  }, [domain]);

  if (loading || !domain) {
    return <Loader />;
  }

  const renderSelectedOption = () => {
    if (!selectedOption) {
      return null;
    }
    const option = hostingOptions.find((opt) => opt.name === selectedOption);
    if (!option) {
      return null;
    }

    return (
      <div className="w-full mb-4">
        <h2 className="text-2xl font-bold text-telegram-accent-text mb-4">
          Selected Hosting Option
        </h2>
        <button
          onClick={() => {
            props.setHostingOption(option.name);
          }}
          className="bg-gradient-to-r from-telegram-bg to-telegram-secondary-bg rounded-2xl shadow-xl overflow-hidden border border-telegram-section-separator p-6 w-full"
        >
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-4">{option.icon}</div>
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-telegram-text to-telegram-accent-text flex flex-col justify-start items-start">
              <span>{option.name}</span>
              {option.name === "Template" ? (
                <p className="text-sm text-telegram-hint text-left">
                  (
                  {domain.template_id === "1"
                    ? "Default"
                    : "Digital Resistance"}
                  )
                </p>
              ) : null}
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
    <div className="flex flex-col items-center">
      {selectedOption ? (
        <>
          {renderSelectedOption()}
          <button
            onClick={() => {
              props.setHostingOption("Reset");
            }}
            className="flex items-center justify-center text-red-500 hover:text-red-600 transition-colors duration-300 mb-8"
          >
            <Trash2 className="mr-2" size={20} />
            <span>Reset {selectedOption} setting</span>
          </button>
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
          .filter(
            (option) =>
              option.name !== selectedOption && option.name !== "Reset"
          )
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
