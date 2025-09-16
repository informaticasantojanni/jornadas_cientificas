import React, { useState, useEffect, useContext } from "react";
import { programa } from "../components/programa";
import { ProgramaContext } from "../context/ProgramaContext";
import { getTemasLibres } from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";

export const usePrograma = () => {
  const eventId = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025

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
  const { setShowSpinner } = useGlobal();

  //Pull Temas libres y hacer un merge con el programa
  useEffect(() => {
    const fetchTemasLibres = async () => {
      setShowSpinner(true); // Mostrar el spinner al iniciar la carga

      try {
        const temasLibresResponse = await getTemasLibres(eventId)
        if (!temasLibresResponse.status) {
          throw new Error('Error al obtener los temas libres');
        } else {
          const temasLibres = temasLibresResponse.data;
          console.log('Temas libres obtenidos:', temasLibres);
          temasLibres.forarch((tema) => { });
        }

      } catch (error) {
        console.error('Error al obtener los temas libres:', error);
      } finally {
        setShowSpinner(false); // Ocultar el spinner al finalizar la carga
      }
    }
    fetchTemasLibres();
  }, []);


  //Update programaFilter cuando cambia el dia
  useEffect(() => {
    const programaFilter = programa
      .filter((item) => item.dia == programaDay)
      .sort((a, b) => a.time - b.time);
    setProgramaFiltrado(programaFilter);
  }, [programaDay]);


  //Update programaFilter cuando cambia el searchTerm
  useEffect(() => {
    if (searchTerm == "") {
      const programaFilter = programa
        .filter((item) => item.dia == programaDay)
        .sort((a, b) => a.time - b.time);
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
