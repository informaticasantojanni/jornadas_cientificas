// Card.js
import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import LocationIcon from "../svgIcons/LocationIcon";
import { usePrograma } from "../hooks/usePrograma";
import DownloadIcon from "../svgIcons/DownloadIcon";

const CardTemasLibres = ({ data }) => {
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

      <h3 className="font-semiBold pt-2 pb-1">Presidente:</h3>
      <p>{data.presidente}</p>

      <h3 className="font-semiBold pt-2 pb-1">Secretario:</h3>
      <p>{data.secretario}</p>

      <h2 className="font-semiBold pt-5 pb-1">Trabajos</h2>

      {data.trabajos.map((trabajo, index) => (
        <div key={index}>
          <p className="pb-1 font-semiBold">{trabajo.titulo}</p>
          <p className="pb-2 ps-5">{trabajo.autor}</p>
          <div className="flex items-center pb-4 ps-5">
            <DownloadIcon width={"25px"} height={"25px"} />
            <a href={trabajo.abstract}>Abstract</a>
          </div>
        </div>
      ))}

      <div className="flex justify-center items-center py-3">
        <LocationIcon with={"25px"} height={"25px"} />
        <p className="font-bold ps-1 text-Violet">{data.ubicacion}</p>
      </div>
    </div>
  );
};

export default CardTemasLibres;
