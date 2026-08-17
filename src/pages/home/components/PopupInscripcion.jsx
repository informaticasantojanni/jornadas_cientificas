import React, { useEffect, useState } from "react";
import PlayIcon from "./conferencias/PlayIcon";
import CloseIcon from "./svgIcons/CloseIcon";
import ButtonVioletMD from "../../../components/buttons/ButtonVioletMD";
import LinkToVioletMD from "../../../components/buttons/ButtonVioletMD";
import { Link } from "react-router-dom";

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
              <button onClick={handleClosePopup} className="text-Violet hover:text-LightViolet font-bold text-xl">
                <CloseIcon width={"30px"} />
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-Violet">Trabajos Temas Libres</h2>
            <h3 className="text-xl font-bold mb-4 text-Violet">Ya está abierta la inscripción!</h3>

            <div className="flex flex-col items-center justify-center gap-5">
              <p className="mt-5 font-semiBold text-lg px-3 text-Violet">Palabras del Comité Científico:</p>
              <a href="https://drive.google.com/uc?id=1y4sCX2k3EDiE7NhjUHn20AOItocOCDM7&export=download" className="px-5 py-2 bg-LightBlue text-White rounded-full">
                Ver aquí
              </a>
              <p className="mt-5 font-semiBold text-lg px-3 text-Violet">Te invitamos a ver las bases y presentar trabajos:</p>
              <Link to="/descarga" className="w-[220px] text-center text-lg font-semiBol px-5 py-1 bg-LightBlue text-White rounded-full hover:bg-Blue hover:shadow-lg transition duration-300 ease-in-out">
                Ver Bases
              </Link>

              <Link to="/temasLibres" className="w-[220px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out">
                Presentar Trabajos
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupInscripcion;
