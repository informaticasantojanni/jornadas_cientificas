import React from "react";

const ButtonVioletSM = ({ onClick, label, type = "button", disable = false }) => {
  return (
    <button
      type={type} // Set the button type here
      className="text-lg font-semiBol px-10 py-1 bg-LightBlue text-White rounded-full hover:bg-Blue hover:shadow-lg transition duration-300 ease-in-out"
      onClick={onClick}
      disable={disable}
    >
      {label}
    </button>
  );
};

export default ButtonVioletSM;
