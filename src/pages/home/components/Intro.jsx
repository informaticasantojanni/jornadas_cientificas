import React, { useState } from "react";
import "../../../App.css";
import CamaraIcon from "../../../components/navbar/components/svgIcons/CamaraIcon";
import ModalVideo from "./ModalVideo";


const Intro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className=" bg-White rounded-tl-xl mt-3 laptop1:ms-40">
      <div className="px-2 pt-10">
        <h2 className="main-title text-center py-5">
          Palabras del Presidente de las Jornadas
        </h2>

        <div className="w-full laptop1:w-3/4 m-auto">
          <div className="font-poppins space-y-4 pb-10">
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              A nuestra comunidad hospitalaria:
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Con el placer de siempre, les doy la bienvenida a las XLI Jornadas Científicas
              del Hospital Donación Francisco Santojanni. Tras haber celebrado cuatro décadas de historia,
              este año nos proyectamos hacia adelante con un lema que nos desafía: precisión,
              innovación y el poder de los equipos interdisciplinarios.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Estas Jornadas son una oportunidad para mostrar cómo nuestro hospital  se transforma hacia
              el futuro de la salud, sin perder el compromiso colectivo que nos trajo hasta acá.
              Es una invitación al intercambio de ideas, al debate científico y a fortalecer
              los lazos entre todas las áreas que hacen grande a nuestra institución.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Los invito a participar con entusiasmo y a descubrir la innovación que nace del trabajo en equipo.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              ¡Los esperamos!
            </p>


          </div>

          <div className="flex items-center justify-center tablet:justify-start flex-wrap pb-20">
            {/* <img
              className="rounded-full w-[150px]"
              src="/images/Albaro.jpg"
              alt="Presidente Jornadas"
            /> */}
            <div className="ps-10 flex flex-col items-center">
              {/* <img className="w-[150px]" src="/images/signature.png" alt="" /> */}
              <p className="pt-5 tablet:pt-24">Presidente XLI Jornadas Científicas</p>
              <p>Dr. Alvaro Otreras</p>
            </div>
          </div>
          <ModalVideo
            show={isModalOpen}
            onClose={closeModal}
          />
        </div>

      </div>
    </section>
  );
};

export default Intro;
