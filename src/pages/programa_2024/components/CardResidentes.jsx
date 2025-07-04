// Card.js
import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import LocationIcon from "../svgIcons/LocationIcon";
import { usePrograma } from "../hooks/usePrograma";

const CardResidentes = ({ data }) => {
  const { categorias } = usePrograma();

  return (
    <div className="w-full bg-White rounded-xl shadow-lg p-3 mb-3">
      <div className="flex justify-start items-center py-3">
        <ClockIcon with={"25px"} height={"25px"} />
        <p className="font-bold ps-3 text-PauGreenDark">{data.hora}</p>
      </div>

      <h2 className="pb-2 font-semiBold text-PauGreenDark">
        {categorias[data.categoria]}
      </h2>

      <h2 className="font-semiBold pb-3">{data.tema}</h2>

      <h3 className="font-semiBold pt-2 pb-1">Presidente:</h3>
      <p>{data.presidente}</p>

      <h3 className="font-semiBold pt-2 pb-1">Coordinador:</h3>
      <p className="pb-5">{data.coordinador}</p>

      <h3 className="font-semiBold pt-2 pb-1">Disertantes:</h3>
      {data.disertantes.map((disertante, index) => (
        <p key={index}>{disertante}</p>
      ))}

      <div className="flex justify-center items-center py-3">
        <LocationIcon with={"25px"} height={"25px"} />
        <p className="font-bold ps-1 text-Violet">{data.ubicacion}</p>
      </div>
    </div>
  );
};

export default CardResidentes;
