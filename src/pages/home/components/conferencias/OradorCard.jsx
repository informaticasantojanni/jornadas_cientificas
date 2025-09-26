import React, { useState } from "react";
import PlayIcon from "./PlayIcon";
import ButtonVioletSM from "../../../../components/buttons/ButtonVioletSM";

const OradorCard = ({ orador }) => {
  const [cvFullHeight, setCvFullHeight] = useState(false);

  return (
    <div className="w-[300px] h-[660px] p-2 rounded-xl">
      <div className="relative bg-White opacity-90 h-full py-5 px-2 hover:opacity-100">
        <div className="flex items-center justify-between">
          <p className="text-lg text-start font-semiBold text-Green">
            {orador.date}
          </p>
          <a
            href={orador.linkStreaming ? orador.linkStreaming : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-50 inline-flex items-center text-lg bg-Green rounded-full p-1 text-White">
            <PlayIcon width="30px" height="30px" />
          </a>
        </div>

        <div className="h-[150px]">
          <p className="text-lg font-bold text-CardGrayDark font-poppins text-start pt-5">
            {orador.conference}
          </p>
        </div>

        <p className="mt-5 px-2 py-1 text-sm text-White rounded-xl bg-LightViolet text-center">
          Aulas A-B 2 Piso
        </p>
        <div className="flex items-end w-full pt-10 ps-5">
          <img
            className="w-[80px] rounded-full"
            src={orador.image}
            alt="Foto Orador"
          />
          <p className="text-lg font-semiBold text-CardGrayDark ps-5">
            {orador.name}
          </p>
        </div>

        <div className="flex justify-center">
        </div>


        {/* Box CV */}
        <div className="absolute bottom-[60px] left-0 h-full w-full flex items-end pl-2">
          <div
            className={
              cvFullHeight
                ? " h-[90%] overflow-hidden  bg-White ps-1 pt-5 pe-3 text-justify transition-all duration-500 ease-in-out border-t-PauGreenDark "
                : " h-[25%] overflow-hidden  bg-White ps-1 pe-3 text-justify transition-all duration-500 ease-in-out border-t-PauGreenDark "
            }
          >
            <p className="py-2 text-sm h-[200px]">{orador.cv}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="absolute bottom-[20px] w-[50%] text-sm py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
          onClick={() => setCvFullHeight(!cvFullHeight)}>
          {cvFullHeight ? "Leer menos  ▼" : "Leer más  ▲"}
        </button>
      </div>


    </div>
  );
};

export default OradorCard;
