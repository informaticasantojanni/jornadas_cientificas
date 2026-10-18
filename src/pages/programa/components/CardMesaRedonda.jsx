// Card.js
import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import LocationIcon from "../svgIcons/LocationIcon";
import DownloadIcon from "../svgIcons/DownloadIcon";
import { usePrograma } from "../hooks/usePrograma";
import PlayIcon from "../../home/components/conferencias/PlayIcon";

const CardMesaRedonda = ({ data }) => {
  const { categorias } = usePrograma();

  const { presidente, secretario, panelistas = [] } =
    data.integrantesList ?? {};

  // Los servicios pueden venir agrupados en un mismo string separados por "|"
  const servicios = (data.serviciosList ?? [])
    .flatMap((servicio) => servicio.split("|"))
    .map((servicio) => servicio.trim())
    .filter(Boolean);

  // Cada rol se muestra solo si tiene integrantes cargados
  const roles = [
    { label: "Presidente", nombres: presidente ? [presidente] : [] },
    { label: "Secretario", nombres: secretario ? [secretario] : [] },
    {
      label: panelistas.length > 1 ? "Panelistas" : "Panelista",
      nombres: panelistas,
    },
  ].filter((rol) => rol.nombres.length > 0);

  return (
    <div className="w-full bg-White rounded-xl shadow-lg border-t-4 border-Violet p-3 mb-3">
      <div className="border-b border-CardGrayLight pb-3 mb-3">
        <div className="flex flex-wrap justify-between items-center gap-2 py-3">
          <div className="flex justify-start items-center">
            <ClockIcon with={"25px"} height={"25px"} />
            <p className="font-bold ps-3 text-Violet">{data.hora}</p>
          </div>
          <div className="flex justify-start items-center">
            <LocationIcon with={"25px"} height={"25px"} />
            <p className="font-bold ps-1 text-Violet">{data.aula}</p>
          </div>
        </div>

        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="px-2 py-0.5 rounded-full bg-Violet text-White text-xs font-bold uppercase tracking-wide">
                Mesa redonda
              </span>
              {categorias[data.categoria] && (
                <h2 className="font-semiBold text-Violet">
                  {categorias[data.categoria]}
                </h2>
              )}
            </div>
            <h2 className="font-semiBold text-lg break-words">{data.titulo}</h2>
          </div>

          {data.auspiciante?.logo && (
            <div className="flex-shrink-0 flex flex-col items-end">
              <p className="text-xs font-semiBold text-CardGrayDark pb-1">
                Auspicia
              </p>
              <img
                src={data.auspiciante.logo}
                alt={data.auspiciante.nombre || "Auspiciante"}
                className="max-h-14 max-w-28 object-contain"
              />
            </div>
          )}
        </div>

        {(data.aporteEsperado || data.isStreaming) && (
          <div className="flex flex-wrap items-center gap-2 pt-3">
            {data.aporteEsperado && (
              <a
                href={data.aporteEsperado}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-White border border-Violet text-Violet text-sm font-semiBold hover:bg-VioletUltraLight transition-colors"
              >
                <DownloadIcon width={"18px"} height={"18px"} />
                Aporte esperado
              </a>
            )}
            {data.isStreaming && (
              <a
                className="inline-flex items-center bg-Violet pe-3 rounded-full"
                href={data.linkStreaming}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayIcon width={"30px"} height={"30px"} fill={"#FFF"} />
                <p className="text-sm font-bold text-White">Ver en YouTube</p>
              </a>
            )}
          </div>
        )}
      </div>

      {roles.length > 0 && (
        <div className="flex flex-col gap-3 pb-3">
          {roles.map((rol) => (
            <div key={rol.label}>
              <div className="flex items-center gap-2 pb-2">
                <p className="text-sm font-semiBold text-CardGrayDark">
                  {rol.label}
                </p>
                {rol.nombres.length > 1 && (
                  <span className="min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold text-White bg-Violet rounded-full leading-none">
                    {rol.nombres.length}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-2">
                {rol.nombres.map((nombre, index) => (
                  <li
                    key={index}
                    className="bg-VioletUltraLight border-l-4 border-VioletSoft rounded-lg py-2 px-3 font-semiBold break-words"
                  >
                    {nombre}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {servicios.length > 0 && (
        <>
          <h3 className="font-semiBold pb-2">Servicios participantes</h3>
          <div className="flex flex-wrap gap-2 pb-3">
            {servicios.map((servicio, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-White border border-VioletSoft text-Violet text-sm font-medium break-words"
              >
                {servicio}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardMesaRedonda;
