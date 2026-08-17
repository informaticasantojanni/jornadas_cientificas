import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

const TemasLibres = () => {
  return (
    <section className=" bg-White laptop1:ms-40">
        {/* <section className="bg-White pt-36 pb-10 laptop1:ms-40 relative"></section> */}
      <div className="px-2 pt-10">
        <h2 className="main-title text-center py-5">
          Trabajos Temas Libres
        </h2>

        <div className="w-full laptop1:w-3/4 m-auto">
          <div className="font-poppins space-y-4 pb-10">
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Estimados colegas:
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Los invitamos a participar activamente de las Jornadas Científicas del Hospital
              Santojanni, que se realizarán del 19 al 23 de octubre de 2026, bajo el lema:
            </p>
            <p className="text-center font-poppins text-[14px] laptop1:text-[18px] font-semibold">
              "El futuro de la salud: precisión, innovación y equipos interdisciplinarios".
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Esta será una excelente oportunidad para compartir experiencias, presentar trabajos
              científicos, difundir proyectos de investigación y mostrar el trabajo que desarrollamos
              diariamente en nuestro hospital.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Los alentamos a presentar sus trabajos y ser protagonistas de este espacio de
              intercambio, aprendizaje y crecimiento académico.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Atentamente,
            </p>
          </div>

          {/* Firmas Presidente y Secretaria */}
          <div className="flex flex-col items-center gap-10 pb-10 tablet:flex-row tablet:items-start tablet:justify-center tablet:gap-20">
            <div className="flex flex-col items-center text-center">
              {/* Espacio para firma en formato png */}
              {/* <div className="h-[80px]"></div>
              <div className="h-[80px]"></div> */}
              {/* <img className="w-[150px]" src="/images/firma_presidente.png" alt="Firma Presidente" /> */}
              <p className="pt-2">Dra. Daniela D'Alessandro</p>
              <p>Presidenta de Comité Científico</p>
            </div>
            <div className="flex flex-col items-center text-center">
              {/* Espacio para firma en formato png */}
              {/* <div className="h-[80px]"></div>
              <div className="h-[80px]"></div> */}
              {/* <img className="w-[150px]" src="/images/firma_secretaria.png" alt="Firma Secretaria" /> */}
              <p className="pt-2">Lic. Florencia Gregorio</p>
              <p>Secretaria de Comité Científico</p>
            </div>
          </div>

          <div className="gap-y-5 flex flex-col items-center pb-10 laptop1:flex-row laptop1:justify-center laptop1:space-x-10">
            <Link
              to="/descarga"
              className="text-lg font-semiBol px-10 py-1 bg-LightBlue text-White rounded-full hover:bg-Blue hover:shadow-lg transition duration-300 ease-in-out"
            >
              Ver Bases
            </Link>
            <Link
              to="/temasLibres"
              className="w-[220px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
            >
              Presentar Trabajos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemasLibres;
