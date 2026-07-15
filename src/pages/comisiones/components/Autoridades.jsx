import React from "react";

const Autoridades = () => {
  return (
    <div className="rounded-lg m-5 shadow-lightShadowGrey mt-16">
      <p className="rounded-lg text-center pt-3 font-semiBold text-lg bg-gradient-to-b from-PauBackground via-White to-White text-white">
        Autoridades
      </p>

      <div className="p-3">
        <p className="font-semiBold">
          Presidente: <span className="font-regular">Dr. Alvaro Otreras</span>
        </p>
        <p className="font-semiBold">
          Vicepresidenta: <span className="font-regular">Dra. Valeria Garralda</span>
        </p>
        <p className="font-semiBold">
          Secretario General:{" "}
          <span className="font-regular">Dr. Fernando Saldarini</span>
        </p>
        <p className="font-semiBold">
          Secretaria Adjunta:{" "}
          <span className="font-regular">Dra. Beatriz Lauge</span>
        </p>
        <p className="font-semiBold">
          Tesorero: <span className="font-regular">Dr. Guillermo Keller</span>
        </p>
        <p className="font-semiBold">
          Presidente AMM:{" "}
          <span className="font-regular">Dr. Lucas Landolfi</span>
        </p>
      </div>
    </div>
  );
};

export default Autoridades;
