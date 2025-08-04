import React from "react";

const ButtonVioletMD = ({ onClick, label, type = "button", disable = false}) => {
  return (
    <button
      type={type} // Set the button type here
      className="w-[250px] text-xl font-bold px-10 py-3 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
      onClick={onClick}
      disable={disable}
    >
      {label}
    </button>
  );
};

export default ButtonVioletMD;
