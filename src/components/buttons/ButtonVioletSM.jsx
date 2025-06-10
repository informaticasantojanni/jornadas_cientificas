import React from "react";

const ButtonVioletSM = ({ onClick, label, type = "button" }) => {
  return (
    <button
      type={type} // Set the button type here
      className="w-[150px] text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonVioletSM;
