import React from "react";

const ComisionCard = ({ comite }) => {
  const presidente = `${
    comite.presidenteGenero == "Dra." ? "Presidenta" : "Presidente"
  } ${comite.presidenteGenero} ${comite.presidenteNombre}`;
  const secretario = `${
    comite.secretarioGenero == "Dra." ? "Secretaria" : "Secretario"
  } ${comite.secretarioGenero} ${comite.secretarioNombre}`;
  const vocales = comite.vocales;
  return (
    <div className="rounded-lg m-5 shadow-lightShadowGrey">
      <p className="rounded-lg text-center pt-3 font-semiBold text-lg bg-gradient-to-b from-PauBackground via-White to-White text-white">
        {comite.comiteNombre}
      </p>
      {comite.mostrarCargos == "true" ? (
        <div className="p-3">
          {comite.coordinadorGeneral != "" && (<p>{comite.coordinadorGeneral}</p>)}
          <p>{presidente}</p>
          <p>{secretario}</p>
          <p>Vocales:</p>
          {vocales.map((vocal, index) => (
            <p key={index} className="ps-2">{`${
              vocal.genero == "Dra." ? "Dra." : vocal.genero
            } ${vocal.nombre}`}</p>
          ))}
        </div>
      ) : (
        <div className="p-3">
          <p>Asesores:</p>
          {comite.asesores.map((asesor, index) => (
            <p key={index} className="ps-2">{`${
              asesor.genero == "Dra." ? "Dra." : asesor.genero
            } ${asesor.nombre}`}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComisionCard;
