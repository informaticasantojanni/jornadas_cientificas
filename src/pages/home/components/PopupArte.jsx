import React, { useEffect, useState } from "react";
import PlayIcon from "./conferencias/PlayIcon";
import CloseIcon from "./svgIcons/CloseIcon";

const PopupArte = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    console.log(currentHour);
    setShowPopup(currentHour >= 9 && currentHour < 11 ? true : false);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-Black bg-opacity-70 z-50 px-5"
          onClick={handleClosePopup}
        >
          <div
            className="bg-White rounded-lg p-3 laptop1:w-96 text-center shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-end pb-5">
              <button
                onClick={handleClosePopup}
                className="text-Violet hover:text-LightViolet font-bold text-xl"
              >
                <CloseIcon width={"30px"} />
              </button>
            </div>
            <div className="rounded-lg  h-[75%] overflow-hidden border-2 border-Violet">
              {/* Imagen en lugar del ícono */}
              <img
                src="/images/afiche_arte_2025.png"
                alt="Streaming en vivo"
                className="object-cover"
              />
            </div>

            <a
              href="/pdf/Reglamento_arte_2025.pdf"                 // poné aquí la ruta real, ej: /docs/bases-2025.pdf
              download="Bases-del-Concurso.pdf" // nombre sugerido para guardar
              className="inline-flex items-center gap-2 my-5 font-bold text-lg py-1 px-3 text-White bg-Violet rounded-md hover:bg-LightViolet transition"
              aria-label="Descargar bases en PDF"
            >
              {/* Ícono de descarga opcional */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
              Descargar bases
            </a>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default PopupArte;
