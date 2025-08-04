import React, { useState, useEffect } from "react";
import { ProgramaContext } from "../context/ProgramaContext";

const ProgramaProvider = ({ children }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(4);
  const calendario = ["8", "12", "13", "14", "15"];
  const calendarioMuestra = [
    "Viernes 8",
    "Martes 12",
    "Miércoles 13",
    "Jueves 14",
    "Viernes 15",
  ];
  const [programaDay, setProgramaDay] = useState(calendario[4]);
  const [programaFiltrado, setProgramaFiltrado] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const categorias = {
    inscripcion: "Inscripción",
    apertura: "Apertura",
    conferencia: "Conferencia",
    vino_de_honor: "Vino de Honor",
    break: "Break",
    mesa_redonda: "Mesa redonda",
    jornadas_residentes: "Jornadas Residentes",
    temas_libres: "Temas Libres",
    clausura: "Cierre de Jornadas",
  };

  return (
    <ProgramaContext.Provider
      value={{
        calendario,
        calendarioMuestra,
        programaDay,
        setProgramaDay,
        programaFiltrado,
        setProgramaFiltrado,
        categorias,
        searchTerm,
        setSearchTerm,
        currentDayIndex,
        setCurrentDayIndex,
      }}
    >
      {children}
    </ProgramaContext.Provider>
  );
};

export default ProgramaProvider;
