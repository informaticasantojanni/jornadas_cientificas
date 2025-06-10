import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export const useBanner = () => {
  const COUNTDOWN_TARGET = new Date("2024-11-08T08:00:00");

  const getTimeLeft = () => {
    const totalTimeLeft = COUNTDOWN_TARGET - new Date();
    const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((totalTimeLeft / 1000) % 60);
    return {
      dias: days > 0 ? days : 0,
      horas: hours > 0 ? hours : 0,
      minutos: minutes > 0 ? minutes : 0,
      segundos: seconds > 0 ? seconds : 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClickAranceles = () => {
    Swal.fire({
      title: `Aranceles`,
      html: `
      <div class="flex flex-col items-start ps-10">
        <p class="pe-5 pb-3">Médicos: <span></span>12.000 pesos</p>
        <p class="pe-5 pb-3">Residentes: <span></span>6.000 pesos</p>
        <p class="pe-5">Estudiantes: <span></span>sin costo</p>
      </div>
    `,
      background: "#FAFAFA",
      color: "#025951",
      width: "36rem",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#038C7F",
    });
  };

  return {
    timeLeft,
    handleClickAranceles,
  };
};
