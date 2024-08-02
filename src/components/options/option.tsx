import { X } from "lucide-react";
import { useStore, useStoreActions } from "../../store";
import { hostingOptions } from "./config";

type OptionProps = {
  option: string | null;
  setHostingOption: (option: string | null) => void;
};

export const Option = (props: OptionProps) => {
  if (!props.option) {
    return null;
  }

  const selectedOption = hostingOptions.find(
    (option) => option.name === props.option
  );

  if (!selectedOption) return null;

  return (
    <div className="bg-telegram-secondary-bg rounded-lg">
      <div className="flex items-center justify-between p-4 bg-telegram-button text-telegram-button-text">
        <div className="flex items-center">
          {selectedOption.icon}
          <span className="text-lg font-medium ml-2">
            {selectedOption.name}
          </span>
        </div>
        <button
          onClick={() => props.setHostingOption(null)}
          className="p-2 rounded-full hover:bg-telegram-accent-text transition-all duration-300 transform hover:scale-110"
        >
          <X size={20} />
        </button>
      </div>
      <div className="border-l border-b border-r rounded-bl-xl rounded-br-xl border-telegram-section-separator">
        <div className="animate-fadeIn">{selectedOption.component}</div>
      </div>
    </div>
  );
};
