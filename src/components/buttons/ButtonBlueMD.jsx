import React from "react";

const ButtonVioletMD = ({ onClick, label, type = "button" }) => {
  return (
    <button
      type={type} // Set the button type here
      className="w-[250px] text-xl font-bold px-5 py-3 bg-LightBlue text-White rounded-full hover:bg-Blue hover:shadow-lg transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonVioletMD;
