import React from "react";
import PlayIcon from "./PlayIcon";

const OradorCard = ({ orador }) => {
  return (
    <div className="w-[300px] h-[660px] p-2 rounded-xl">
      <div className="bg-White opacity-90 h-full py-5 px-2 hover:opacity-100">
        <p className="text-lg text-start font-semiBold text-Green text-center">
          {orador.date}
        </p>
        <div className="h-[150px]">
          <p className="text-xl font-bold text-CardGrayDark font-poppins text-start pt-5">
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
        <p className="py-10 text-sm h-[200px]">{orador.cv}</p>
        <div className="flex justify-center">
          <a
            href={orador.linkStreaming ? orador.linkStreaming : "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex items-center text-lg bg-Violet rounded-full px-5 py-1 text-White">
              Stream
              <PlayIcon width="30px" height="30px" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OradorCard;
