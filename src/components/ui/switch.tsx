import { useState } from "react";

type SwitchProps = {
  initialState?: boolean;
  onToggle?: (active: boolean) => void;
};

export const Switch = (props: SwitchProps) => {
  const [active, setActive] = useState(props.initialState || false);

  const toggleSwitch = () => {
    setActive(!active);
    if (props.onToggle) {
      props.onToggle(!active);
    }
  };

  return (
    <div
      className={`w-[50px] h-[25px] ${
        active ? "bg-[#4CAF50]" : "bg-[#ccc]"
      } rounded-full cursor-pointer flex items-center ${
        active ? "justify-end" : "justify-start"
      } p-[3px] transition-all duration-300`}
      onClick={toggleSwitch}
    >
      <div className="w-[20px] h-[20px] bg-white rounded-full transition-all duration-300"></div>
    </div>
  );
};
