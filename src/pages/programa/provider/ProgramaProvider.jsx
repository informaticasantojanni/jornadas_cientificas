import React, { useState, useEffect } from "react";
import { ProgramaContext } from "../context/ProgramaContext";

const ProgramaProvider = ({ children }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const calendario = ["29", "30", "1", "2", "3"];
  const calendarioMuestra = [
    "Lunes 29",
    "Martes 30",
    "Miércoles 1",
    "Jueves 2",
    "Viernes 3",
  ];
  const [programaDay, setProgramaDay] = useState(calendario[0]);
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
