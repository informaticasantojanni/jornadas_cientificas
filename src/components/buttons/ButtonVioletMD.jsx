import React from "react";
import { Link } from "react-router-dom";

const LinkToVioletMD = ({ to, label, type = "button", disable = false }) => {
  return (
    <Link
      className="w-[250px] text-center text-xl font-bold px-10 py-3 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
      to={to}
    >
      {label}
    </Link>
  );
};

export default LinkToVioletMD;
