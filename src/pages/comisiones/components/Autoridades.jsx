import React from "react";

const Autoridades = () => {
  return (
    <div className="rounded-lg m-5 shadow-lightShadowGrey mt-16">
      <p className="rounded-lg text-center pt-3 font-semiBold text-lg bg-gradient-to-b from-PauBackground via-White to-White text-white">
        Autoridades
      </p>

      <div className="p-3">
        <p className="font-semiBold">
          Presidenta: <span className="font-regular">Dra. María Vivona</span>
        </p>
        <p className="font-semiBold">
          Vicepresidente: <span className="font-regular">Dr. Daniel Coso</span>
        </p>
        <p className="font-semiBold">
          Secretario General:{" "}
          <span className="font-regular">Dr. Fernando Saldarini</span>
        </p>
        <p className="font-semiBold">
          Secretario Adjunto:{" "}
          <span className="font-regular">Dr. José Retamoso</span>
        </p>
        <p className="font-semiBold">
          Tesorero: <span className="font-regular">Dr. Lucas Landolfi</span>
        </p>
        <p className="font-semiBold">
          Presidente AMM:{" "}
          <span className="font-regular">Dr. Marcelo Struminger</span>
        </p>
      </div>
    </div>
  );
};

export default Autoridades;
