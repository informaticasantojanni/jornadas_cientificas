import React, { useEffect, useState } from "react";
import PlayIcon from "./conferencias/PlayIcon";
import CloseIcon from "./svgIcons/CloseIcon";

const PopupCertificados = () => {
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
            className="bg-White rounded-lg p-3 w-80 laptop1:w-96 text-center shadow-lg relative"
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
              Ya podes descargar tus certificados!
            </h2>

            <p className="my-5 font-bold text-xl p-3 text-Violet">
              El de asistencia lo encontrás en tu perfil y los certificados de
              trabajos y comisiones en la zona de descargas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupCertificados;
