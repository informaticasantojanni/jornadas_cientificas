import React from "react";
import ClockIcon from "../svgIcons/ClockIcon";
import LocationIcon from "../svgIcons/LocationIcon";

const CardClausura = ({ data }) => {
  return (
    <div className="w-full bg-White rounded-xl shadow-lg mb-3 overflow-hidden border-t-4 border-PauGreenDark">
      <div className="bg-gradient-to-r from-PauGreenDark to-Violet px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="bg-White rounded-full p-1 flex">
            <ClockIcon with={"20px"} height={"20px"} />
          </span>
          <p className="font-bold ps-3 text-White">{data.hora}</p>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-White bg-White/20 rounded-full px-3 py-1">
          Cierre
        </span>
      </div>

      <div className="px-4 pt-5 pb-3 text-center">
        <h2 className="text-xl font-bold text-PauGreenDark pb-2">{data.titulo}</h2>
        <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-PauGreenLight to-VioletSoft" />
        {data.descripcion && (
          <h3 className="font-semiBold text-CardGrayDark pb-2">{data.descripcion}</h3>
        )}
      </div>

      <div className="mx-4 mb-4 flex justify-center items-center py-2 rounded-lg bg-VioletUltraLight">
        <LocationIcon with={"22px"} height={"22px"} />
        <p className="font-bold ps-2 text-Violet">{data.ubicacion}</p>
      </div>
    </div>
  );
};

export default CardClausura;
