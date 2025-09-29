import React from "react";
import { useNavigate } from "react-router-dom";
import { useBanner } from "../hooks/useBanner";
import ButtonVioletSM from "../../../components/buttons/ButtonVioletSM";
import ButtonBlueSM from "../../../components/buttons/ButtonBlueSM";


const Banner = () => {
  const navigate = useNavigate();
  const { timeLeft, handleClickAranceles } = useBanner();

  const handleInscripcion = () => {
    navigate("/perfil");
  };

  
  return (
    <div className="relative h-screen w-full laptop1:ps-40">
      {/* Background Video */}
      {/* <img
                className="absolute inset-0 h-full w-full object-cover"
                src="/images/image_banner.JPG" alt="imagen banner">
            </img> */}

      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/video_banner.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-Black bg-opacity-65"></div>

      {/* Titles */}
      <div className="relative flex flex-col items-center justify-center h-full">
        <div className="flex flex-col laptop1:flex-row items-center justify-center mt-[3rem]">
          {/* <img className="w-[200px]" src="images/logo_40_aniversario.svg" alt="" /> */}
          <img className="w-[160px] laptop1:w-[200px]" src="images/logo_40_aniversario_allWhite.svg" alt="" />
          <div className="w-1 h-[90%] bg-White"></div>
          <div className="flex flex-col text-3xl laptop1:text-4xl items-center justify-center ml-5">
            <h1 className="text-center text-White font-bold laptop1:text-6xl">
              JORNADAS
            </h1>
            <h1 className="text-center text-White font-bold laptop1:text-6xl">
              CIENTIFICAS
            </h1>
          </div>


        </div>
        <h1 className="text-center text-White font-semibold pb-5 laptop1:text-5xl">
          HOSPITAL SANTOJANNI
        </h1>
        <h2 className="text-White text-xl text-center  font-bold pb-4">
          29 de septiembre al 3 de octubre de 2025
        </h2>
        <h2 className="text-White text-center  font-bold laptop1:text-5xl">
          Ciencia que forma, transforma y cuida:
        </h2>
        <h2 className="text-White font-bold mb-5 laptop1:text-5xl">
          40 años de salud pública
        </h2>
        {/* Countdown box */}
        {/* <div className="flex pb-5 space-x-3">
          <div className="w-[60px] h-[60px] flex flex-col items-center justify-center rounded-full shadow-lightShadowGrey bg-White bg-opacity-30 text-White">
            <p className="text-lg">{timeLeft.dias}</p>
            <p className="text-xs">dias</p>
          </div>
          <div className="w-[60px] h-[60px] flex flex-col items-center justify-center rounded-full shadow-lightShadowGrey bg-White bg-opacity-30 text-White">
            <p className="text-lg">{timeLeft.horas}</p>
            <p className="text-xs">horas</p>
          </div>
          <div className="w-[60px] h-[60px] flex flex-col items-center justify-center rounded-full shadow-lightShadowGrey bg-White bg-opacity-30 text-White">
            <p className="text-lg">{timeLeft.minutos}</p>
            <p className="text-xs">minutos</p>
          </div>
          <div className="w-[60px] h-[60px] flex flex-col items-center justify-center rounded-full shadow-lightShadowGrey bg-White bg-opacity-30 text-White">
            <p className="text-lg">{timeLeft.segundos}</p>
            <p className="text-xs">segundos</p>
          </div>
        </div> */}

        <div className="gap-y-5 flex flex-col items-center laptop1:flex-row laptop1:justify-center laptop1:space-x-10">

          <ButtonBlueSM onClick={handleClickAranceles} label={"Aranceles"} />
          <ButtonVioletSM onClick={handleInscripcion} label={"Incribirme"} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
