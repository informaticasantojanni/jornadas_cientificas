import React, { useState } from "react";

const InvitadosCard = ({ invitado }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="my-10 flex justify-center">
      <div className="relative w-[250px] h-[450px] flex flex-col items-center bg-CardGrayLight py-5 overflow-hidden">
        <img
          className="rounded-full w-[150px] h-[150px]"
          src={invitado.image}
          alt=""
        />
        <div className="p-2">
          <p className="text-center font-semiBold py-5 text-xl">{invitado.name}</p>
          <p className="text-center py-2">{invitado.cv1}</p>
        </div>
        <button
          className="absolute bottom-5 w-[100px] bg-Violet text-White px-3 py-1 rounded-full z-50 self-center"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Volver" : "Ver más"}
        </button>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-CardGrayDark z-10 p-1 transition-all duration-500 ease-in-out transform ${
            showMore ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <p className="text-sm text-center text-White">{invitado.cv2}</p>
        </div>
      </div>
    </div>
  );
};

export default InvitadosCard;
