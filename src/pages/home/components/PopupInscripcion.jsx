import React, { useEffect, useState } from "react";
import PlayIcon from "./conferencias/PlayIcon";
import CloseIcon from "./svgIcons/CloseIcon";
import ButtonVioletMD from "../../../components/buttons/ButtonVioletMD";
import LinkToVioletMD from "../../../components/buttons/ButtonVioletMD";

const PopupInscripcion = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    // Clean up the timer if the component unmounts before 2 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-Black bg-opacity-70 z-50"
          onClick={handleClosePopup} // Detecta clics fuera del contenido
        >
          <div
            className="bg-White rounded-lg p-3 pb-10 w-80 laptop1:w-96 text-center shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro del contenido
          >
            <div className="w-full flex justify-end pb-5">
              <button
                onClick={handleClosePopup}
                className="text-Violet hover:text-LightViolet font-bold text-xl"
              >
                <CloseIcon width={"30px"} />
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-Violet">
              Ya podes incribirte a las Jornadas 2025!
            </h2>

            <p className="my-5 font-semiBold text-lg p-3 text-Violet">
              Inicia sesion con tu cuenta de correo, inscribite y subi el Abstract de tu Trabajo Científico.
            </p>
            <LinkToVioletMD to={"/login"} label={"Adelante!"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupInscripcion;
