// Card.js
import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import PlayIcon from "../../home/components/conferencias/PlayIcon";
import LocationIcon from "../svgIcons/LocationIcon";
import { usePrograma } from "../hooks/usePrograma";

// Descarta valores vacíos o "n/a" que vienen como placeholder en los datos
const limpiar = (lista) =>
  (Array.isArray(lista) ? lista : [lista])
    .filter((v) => typeof v === "string")
    .map((v) => v.trim())
    .filter((v) => v && v.toLowerCase() !== "n/a");

const CardResidentes = ({ data }) => {
  const { categorias } = usePrograma();

  const autoridades = [
    { label: "Presidente", nombres: limpiar(data.presidente) },
    { label: "Secretario", nombres: limpiar(data.secretario) },
    { label: "Coordinación", nombres: limpiar(data.coordinador) },
  ].filter((a) => a.nombres.length > 0);

  const grupos = [
    { label: "Colaboradores", nombres: limpiar(data.colaboradores) },
    { label: "Presentadores", nombres: limpiar(data.presentadores) },
  ].filter((g) => g.nombres.length > 0);

  return (
    <div className="w-full bg-White rounded-xl shadow-lg border-t-4 border-Blue p-3 mb-3">
      <div className="border-b border-CardGrayLight pb-3 mb-3">
        <div className="flex flex-wrap justify-between items-center gap-2 py-3">
          <div className="flex justify-start items-center">
            <ClockIcon with={"25px"} height={"25px"} />
            <p className="font-bold ps-3 text-Blue">{data.hora}</p>
          </div>
          <div className="flex justify-start items-center">
            <LocationIcon width={"25px"} height={"25px"} />
            <p className="font-bold ps-1 text-Violet">{data.ubicacion}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-1">
          <span className="px-2 py-0.5 rounded-full bg-Blue text-White text-xs font-bold uppercase tracking-wide">
            Residentes
          </span>
          {(categorias?.[data.categoria] ?? data.categoria) && (
            <h2 className="font-semiBold text-Blue">
              {categorias?.[data.categoria] ?? data.categoria}
            </h2>
          )}
        </div>
        {data.tema && (
          <h2 className="font-semiBold text-lg break-words">{data.tema}</h2>
        )}

        {data.isStreaming && (
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <a
              className="inline-flex items-center bg-Violet pe-3 rounded-full"
              href={data.linkStreaming}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon width={"30px"} height={"30px"} fill={"#FFF"} />
              <p className="text-sm font-bold text-White">Ver en YouTube</p>
            </a>
          </div>
        )}
      </div>

      {autoridades.length > 0 && (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2 pb-3">
          {autoridades.map((a) => (
            <div key={a.label}>
              <p className="text-sm font-semiBold text-CardGrayDark">
                {a.label}
              </p>
              <p>{a.nombres.join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      {grupos.length > 0 && (
        <div className="flex flex-col gap-3 pb-3">
          {grupos.map((grupo) => (
            <div key={grupo.label}>
              <div className="flex items-center gap-2 pb-2">
                <p className="text-sm font-semiBold text-CardGrayDark">
                  {grupo.label}
                </p>
                {grupo.nombres.length > 1 && (
                  <span className="min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold text-White bg-Blue rounded-full leading-none">
                    {grupo.nombres.length}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-2">
                {grupo.nombres.map((nombre, index) => (
                  <li
                    key={index}
                    className="bg-DarkGrey border-l-4 border-LightBlue rounded-lg py-2 px-3 font-semiBold break-words"
                  >
                    {nombre}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardResidentes;
