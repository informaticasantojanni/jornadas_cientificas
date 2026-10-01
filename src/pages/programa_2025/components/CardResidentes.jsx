// Card.js
import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import PlayIcon from "../../home/components/conferencias/PlayIcon";
import LocationIcon from "../svgIcons/LocationIcon";
import { usePrograma } from "../hooks/usePrograma";

const CardResidentes = ({ data }) => {
  const { categorias } = usePrograma();
  const colaboradores = Array.isArray(data.colaboradores) ? data.colaboradores : [];
  const presentadores = Array.isArray(data.presentadores) ? data.presentadores : [];


  return (
    <div className="w-full bg-White rounded-xl shadow-lg p-3 mb-3">
      {/* Hora */}
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

      {/* Categoría y tema */}
      <h2 className="pb-2 font-semibold text-PauGreenDark">
        {categorias?.[data.categoria] ?? data.categoria}
      </h2>
      <h2 className="font-semibold pb-3">{data.tema}</h2>

      {/* Autoridades */}
      {data.presidente && (
        <>
          <h3 className="font-semibold pt-2 pb-1">Presidente:</h3>
          <p>{data.presidente}</p>
        </>
      )}

      {data.secretario && (
        <>
          <h3 className="font-semibold pt-2 pb-1">Secretario:</h3>
          <p>{data.secretario}</p>
        </>
      )}

      {data.coordinador && (
        <>
          <h3 className="font-semibold pt-2 pb-1">Coordinación:</h3>
          <p>{data.coordinador}</p>
        </>
      )}

      {/* Colaboradores (en tus datos venía como "colaboradores") */}
      {colaboradores.length > 0 && (
        <>
          <h3 className="font-semibold pt-2 pb-1">Colaboradores:</h3>
          <ul className="list-disc ps-5">
            {colaboradores.map((colab, i) => (
              <li key={`colab-${i}`}>{colab}</li>
            ))}
          </ul>
        </>
      )}

      {/* Presentadores */}
      {presentadores.length > 0 && (
        <>
          <h3 className="font-semibold pt-2 pb-1">Presentadores:</h3>
          <ul className="list-disc ps-5">
            {presentadores.map((pres, i) => (
              <li key={`pres-${i}`}>{pres}</li>
            ))}
          </ul>
        </>
      )}

      {/* Ubicación */}
      <div className="flex justify-center items-center py-3">
        <LocationIcon width={"25px"} height={"25px"} />
        <p className="font-bold ps-1 text-Violet">{data.ubicacion}</p>
      </div>
    </div>
  );
};

export default CardResidentes;
