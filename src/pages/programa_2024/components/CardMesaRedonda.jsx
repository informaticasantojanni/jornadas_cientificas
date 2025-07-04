// Card.js
import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import LocationIcon from "../svgIcons/LocationIcon";
import { usePrograma } from "../hooks/usePrograma";
import PlayIcon from "../../home/components/conferencias/PlayIcon";

const CardMesaRedonda = ({ data }) => {
  const { categorias } = usePrograma();

  return (
    <div className="w-full bg-White rounded-xl shadow-lg p-3 mb-3">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <ClockIcon with={"25px"} height={"25px"} />
          <p className="font-bold ps-3 text-PauGreenDark">{data.hora}</p>
        </div>
        {data.isStreaming && (
          <div className="flex justify-center items-center bg-Violet px-3 rounded-xl">
            <a
              className="flex items-center"
              href={data.linkStreaming}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon width={"40px"} height={"40px"} fill={"#FFF"} />

              <p className="font-bold text-White">Ver en YouTube</p>
            </a>
          </div>
        )}
      </div>

      <h2 className="pb-2 font-semiBold text-PauGreenDark">
        {categorias[data.categoria]}
      </h2>

      <h2 className="font-semiBold pb-3">{data.titulo}</h2>

      <h3 className="font-semiBold pt-2 pb-1">Presidente:</h3>
      <p>
        {data.presidente.nombre} - {data.presidente.servicio}
      </p>

      <h3 className="font-semiBold pt-2 pb-1">{data.secretario.titulo}:</h3>
      <h3 className="font-semiBold pt-2 pb-1">{data.secretario.titulo}:</h3>
      {data.secretario.secretarios.map((sec, index) => (
        <p key={index}>
          {sec.nombre} - {sec.servicio}
        </p>
      ))}

      <h3 className="font-semiBold pt-2 pb-1">Disertantes:</h3>
      {data.disertantes.map((disertante, index) => (
        <div className="pb-2" key={index}>
          <p>
            {disertante.nombre} - {disertante.servicio}
          </p>
          {disertante.tema && <p>Tema: {disertante.tema}</p>}
        </div>
      ))}

      <div className="flex justify-center items-center py-3">
        <LocationIcon with={"25px"} height={"25px"} />
        <p className="font-bold ps-1 text-Violet">{data.ubicacion}</p>
      </div>
    </div>
  );
};

export default CardMesaRedonda;
