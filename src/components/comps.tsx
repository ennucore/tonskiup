import React, { useState } from "react";

export const Switch = ({ initialState = false, onToggle }) => {
  const [active, setActive] = useState(initialState);

  const toggleSwitch = () => {
    setActive(!active);
    if (onToggle) {
      onToggle(!active);
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
