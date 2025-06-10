import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Intro from "../components/Intro";
import Autoridades from "../components/Autoridades";
import Invitados from "../components/invitados/Invitados";
import Conferencias from "../components/conferencias/Conferencias";
import Colaboran from "../components/Colaboran";
import JornadasNumeros from "../components/jorndasNumeros/JornadasNumeros";
import PopupStreaming from "../components/PopupStreaming";
import PopupCertificados from "../components/PopupCertificados";

const HomeView = () => {

  useEffect(() => {
    // Scroll al top de la página al cargar
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <PopupCertificados />
      {/* Contenido de la página */}
      <Banner />
      <Intro />
      <JornadasNumeros />
      <Autoridades />
      <Invitados />
      <Conferencias />
      <Colaboran />
    </div>
  );
};

export default HomeView;
