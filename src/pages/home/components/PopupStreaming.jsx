import React, { useEffect, useState } from "react";
import PlayIcon from "./conferencias/PlayIcon";
import CloseIcon from "./svgIcons/CloseIcon";

const PopupStreaming = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Obtiene la hora local actual
    const now = new Date();
    const currentHour = now.getHours();
    console.log(currentHour);
    // Verifica si la hora está entre las 09:00 y las 11:00 am
    setShowPopup(currentHour >= 9 && currentHour < 11 ? true : false);
  }, []); // Se ejecuta solo una vez al montar el componente

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
              Ahora: Streaming en Vivo
            </h2>
            <a
              href="https://youtube.com/live/GkYQ5gGNQ0Y"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
            >
              <div className="border-2 rounded-full border-Violet">
                <PlayIcon width={"70px"} height={"70px"} fill={"#584ba0"} />
              </div>

              <p className="my-5 font-bold text-2xl p-3 text-White bg-Violet">
                ¡Sumate!
              </p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupStreaming;
