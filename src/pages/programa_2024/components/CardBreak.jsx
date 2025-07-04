// Card.js
import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import { usePrograma } from "../hooks/usePrograma";
import BreakIcon from "../svgIcons/BreakIcon";

const CardBreak = ({ data }) => {
  const { categorias } = usePrograma();

  return (
    <div className="w-full bg-White rounded-xl shadow-lg p-3 mb-3">
      <div className="flex justify-start items-center py-3">
        <ClockIcon with={"25px"} height={"25px"} />
        <p className="font-bold ps-3 text-PauGreenDark">{data.hora}</p>
      </div>

      <div className="flex justify-center items-center py-3">
        <BreakIcon with={"25px"} height={"25px"} />
        <h2 className="ps-2 font-semiBold text-PauGreenDark">
          {categorias[data.categoria]}
        </h2>
      </div>
    </div>
  );
};

export default CardBreak;
