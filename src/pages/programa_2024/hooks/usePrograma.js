import React, { useState, useEffect, useContext } from "react";
import { programa } from "../components/programa";
import { ProgramaContext } from "../context/ProgramaContext";

export const usePrograma = () => {
  const {
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
  } = useContext(ProgramaContext);

  useEffect(() => {
    const programaFilter = programa.filter((item) => item.dia == programaDay);
    setProgramaFiltrado(programaFilter);
  }, [programaDay]);

  useEffect(() => {
    if (searchTerm == "") {
      const programaFilter = programa.filter((item) => item.dia == programaDay);
      setProgramaFiltrado(programaFilter);
    } else {
      const programaFilterByDay = programa.filter(
        (item) => item.dia == programaDay
      );
      const programaFilterByTerm = programaFilterByDay.filter((item) =>
        searchInObject(item, searchTerm)
      );
      setProgramaFiltrado(programaFilterByTerm);
    }
  }, [searchTerm]);

  const searchInObject = (obj, term) => {
    const lowerTerm = term.toLowerCase();

    // Recursive function to search within an object
    const searchRecursive = (value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerTerm);
      } else if (Array.isArray(value)) {
        return value.some((item) => searchRecursive(item));
      } else if (typeof value === "object" && value !== null) {
        return Object.values(value).some((val) => searchRecursive(val));
      }
      return false;
    };

    return searchRecursive(obj);
  };

  const ordenarPrograma = (programa) => {
    return programa.slice().sort((a, b) => {
      // Convertir día y hora a formato comparable
      const fechaA = new Date(`2024-12-${a.dia}T${a.hora.split(" - ")[0]}`);
      const fechaB = new Date(`2024-12-${b.dia}T${b.hora.split(" - ")[0]}`);

      // Comparar fechas
      return fechaA - fechaB;
    });
  };

  return {
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
  };
};
