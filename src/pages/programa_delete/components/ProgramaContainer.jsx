import React from "react";

import CardMesaRedonda from "./CardMesaRedonda";
import CardInscripcion from "./CardInscripcion";
import { usePrograma } from "../hooks/usePrograma";
import CardApertura from "./CardApertura";
import CardConferencia from "./CardConferencia"
import CardVinoHonor from "./CardVinoHonor"
import CardBreak from "./CardBreak";
import CardResidentes from "./CardResidentes";
import CardTemasLibres from "./CardTemasLibres";
import CardClausura from "./CardClausura";

const ProgramaContainer = () => {
  const { programaFiltrado } = usePrograma();

  return (
    <div className="w-full max-w-[350px] p-4 text-sm rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-PauGreenLight to-PauGreenDark laptop1:p-10 laptop1:max-w-[700px] mb-20">
      {programaFiltrado?.map((item, index) =>
        item.categoria == "mesa_redonda" ? (
          <CardMesaRedonda key={index} data={item} />
        ) : item.categoria == "inscripcion" ? (
          <CardInscripcion key={index} data={item} />
        ) : item.categoria == "apertura" ? (
          <CardApertura key={index} data={item} />
        ) : item.categoria == "conferencia" ? (
          <CardConferencia key={index} data={item} />
        ) : item.categoria == "vino_de_honor" ? (
          <CardVinoHonor key={index} data={item} />
        ) : item.categoria == "break" ? (
          <CardBreak key={index} data={item} />
        ) : item.categoria == "jornadas_residentes" ? (
          <CardResidentes key={index} data={item} />
        ) : item.categoria == "temas_libres" ? (
          <CardTemasLibres key={index} data={item} />
        ) : item.categoria == "clausura" ? (
          <CardClausura key={index} data={item} />
        ) : null
      )}
    </div>
  );
};

export default ProgramaContainer;
