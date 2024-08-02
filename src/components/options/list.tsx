import { hostingOptions } from "./config";

type OptionListProps = {
  setHostingOption: (option: string) => void;
};

export const OptionsList = (props: OptionListProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {hostingOptions.map((option) => (
        <button
          key={option.name}
          className="bg-telegram-secondary-bg rounded-xl p-4 cursor-pointer border border-telegram-button flex flex-col items-center text-center gap-2 w-full"
          onClick={() => {
            props.setHostingOption(option.name);
          }}
        >
          <div className="text-4xl">{option.icon}</div>
          <span className="text-xl font-bold">{option.name}</span>
          <p className="text-xs text-telegram-hint">{option.description}</p>
        </button>
      ))}
    </div>
  );
};
