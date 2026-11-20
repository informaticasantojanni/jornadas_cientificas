import React from "react";

const ButtonVioletSM = ({ onClick, label, type = "button", disabled = false }) => {
  return (
    <button
      type={type} // Set the button type here
      disabled={disabled}
      className="w-[150px] text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-LightViolet disabled:hover:shadow-none"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonVioletSM;
