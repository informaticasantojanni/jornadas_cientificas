import React, { useEffect, useState } from "react";
import PlayIcon from "./conferencias/PlayIcon";
import CloseIcon from "./svgIcons/CloseIcon";
import UploadIcon from "./svgIcons/UploadIcon";

const PopupUpload = () => {
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
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4 text-Violet">
                Temas Libres y Mesas Redondas
              </h2>
              <a href="https://drive.google.com/drive/folders/1g0wAjk6wNzpl89uwyiNXRZsMhIB-cYV6?usp=sharing" target="_blank"><UploadIcon width={100} /></a>
              <a href="https://drive.google.com/drive/folders/1g0wAjk6wNzpl89uwyiNXRZsMhIB-cYV6?usp=sharing" target="_blank" className= "font-bold text-xl p-3 text-Violet">
                Hace click aquí para subir tu Presentación
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default PopupUpload;
