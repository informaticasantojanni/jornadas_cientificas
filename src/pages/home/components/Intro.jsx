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
              ¡Hola a todas y todos!
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Con muchísima alegría les doy la bienvenida a las XL Jornadas Científicas de nuestro querido Hospital Dr. F. Santojanni.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Este año nos reunimos bajo un lema que nos inspira profundamente:
              “Ciencia que forma, transforma y cuida: 40 años de salud pública”.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Llegar a esta edición tan especial nos llena de orgullo y emoción. Son ya cuatro décadas compartiendo conocimientos, experiencias, desafíos… pero, sobre todo, sosteniendo el compromiso firme y colectivo por una salud pública de calidad.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Estas Jornadas son una invitación abierta a seguir aprendiendo, a mostrar el trabajo que hacemos día a día, a intercambiar ideas, a hacernos preguntas… y también a reencontrarnos como equipo, como comunidad.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Es una oportunidad para hacer una pausa en la vorágine cotidiana y regalarnos un momento para pensar, crecer e inspirarnos mutuamente.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Los invito a participar con entusiasmo, con curiosidad, con esa pasión que nos trajo hasta acá. Ya sea presentando un trabajo, asistiendo a una charla, o simplemente compartiendo una conversación en los pasillos… cada aporte suma y enriquece.
            </p>
            <p className="text-indent indent-6 text-justify font-poppins text-[14px] laptop1:text-[18px]">
              Gracias por ser parte de estas Jornadas. ¡Los esperamos con los brazos abiertos para celebrar juntos 40 años de ciencia, trabajo y comunidad!
            </p>


          </div>

          <div className="flex items-center justify-center tablet:justify-start flex-wrap pb-20">
            <img
              className="rounded-full w-[150px]"
              src="/images/Daniel_Coso.jpg"
              alt="Presidente Jornadas"
            />
            <div className="ps-10 flex flex-col items-center">
              {/* <img className="w-[150px]" src="/images/signature.png" alt="" /> */}
              <p className="pt-5 tablet:pt-24">Presidente XL Jornadas Científicas</p>
              <p>Dr. Daniel Coso</p>
            </div>
          </div>
          {/* 
          <div
            className="items-center flex justify-center bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out w-[250px] m-auto p-2"
            onClick={openModal}
          >
            <button className="w-full flex justify-center items-center   ">
              <CamaraIcon width="25px" height="25px" />
              <p className="text-xl font-bold ps-2">Ver video</p>
            </button>
          </div> */}
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
