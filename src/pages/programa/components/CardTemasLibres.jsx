// Card.js
import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import LocationIcon from "../svgIcons/LocationIcon";
import { usePrograma } from "../hooks/usePrograma";
import DownloadIcon from "../svgIcons/DownloadIcon";

const CardTemasLibres = ({ data }) => {
  const { categorias } = usePrograma();

  // Oculto autoridades no asignadas ("n/a") para no mostrar datos vacíos
  const autoridades = [
    { label: "Presidente", nombre: data.presidente },
    { label: "Secretario", nombre: data.secretario },
  ].filter((a) => a.nombre && a.nombre.trim().toLowerCase() !== "n/a");

  return (
    <div className="w-full bg-White rounded-xl shadow-lg p-3 mb-3">
      <div className="border-b border-CardGrayLight pb-3 mb-3">
        <div className="flex flex-wrap justify-between items-center gap-2 py-3">
          <div className="flex justify-start items-center">
            <ClockIcon with={"25px"} height={"25px"} />
            <p className="font-bold ps-3 text-PauGreenDark">{data.hora}</p>
          </div>
          <div className="flex justify-start items-center">
            <LocationIcon with={"25px"} height={"25px"} />
            <p className="font-bold ps-1 text-Violet">{data.ubicacion}</p>
          </div>
        </div>

        <h2 className="pb-1 font-semiBold text-PauGreenDark">
          {categorias[data.categoria]}
        </h2>

        <p className="text-sm font-semiBold text-CardGrayDark">Tema de mesa</p>
        <h2 className="font-semiBold text-lg">{data.temaMesa}</h2>
      </div>

      {autoridades.length > 0 && (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2 pb-3">
          {autoridades.map((a) => (
            <div key={a.label}>
              <p className="text-sm font-semiBold text-CardGrayDark">
                {a.label}
              </p>
              <p>{a.nombre}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 pt-3 pb-3">
        <h2 className="font-semiBold text-lg">Trabajos</h2>
        <span className="min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold text-White bg-PauGreenDark rounded-full leading-none">
          {data.trabajos.length}
        </span>
      </div>

      {data.trabajos.length === 0 ? (
        <p className="text-sm text-CardGrayDark italic pb-3">
          Los trabajos de esta mesa se publicarán próximamente.
        </p>
      ) : (
        <ol className="flex flex-col gap-3 pb-3">
          {data.trabajos.map((trabajo, index) => (
            <li
              key={index}
              className="flex gap-2 bg-PauGreenUltraLight border-l-4 border-PauGreenLight rounded-lg py-3 pe-3 ps-2"
            >
              <span className="flex-shrink-0 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-PauGreenDark text-White text-xs font-bold leading-none">
                {index + 1}
              </span>

              <div className="flex-1 min-w-0">
                <p className="font-semiBold leading-snug break-words">
                  {trabajo.titulo}
                </p>
                {trabajo.autor?.length > 0 && (
                  <p className="text-sm text-CardGrayDark pt-1 break-words">
                    {trabajo.autor.join(", ")}
                  </p>
                )}
                {trabajo.abstract && (
                  <a
                    href={trabajo.abstract}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-White border border-PauGreenDark text-PauGreenDark text-sm font-semiBold hover:bg-PauGreenUltraLight transition-colors"
                  >
                    <DownloadIcon width={"18px"} height={"18px"} />
                    Abstract
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default CardTemasLibres;
