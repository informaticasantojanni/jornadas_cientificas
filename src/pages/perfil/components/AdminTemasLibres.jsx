import React, { useState, useRef } from "react";
import { useProfile } from "../hooks/useProfile";
import TemasLibresTable from "./TemasLibresTable";
import TemasLibresProcess from "./TemasLibresProcess";


const AdminTemasLibres = ({ userId }) => {
  const [internalView, setInternalView] = useState("temasLibres");
  const { userData } = useProfile(userId);

  let content;
  if (internalView === "temasLibres") {
    content = <TemasLibresTable setInternalView={setInternalView} />;
  } else if (internalView === "procesarTemasLibres") {
    content = <TemasLibresProcess />;
  }

  return (
    <div className="w-auto h-full mt-3 px-3 rounded-tl-xl bg-White flex flex-col items-center laptop1:ms-40">
      <h2 className="w-full text-Black p-2 font-poppins text-lg font-semiBold">
        Bienvenido {userData?.name || "Usuario"}!
      </h2>

      {content}

    </div>
  );
};

export default AdminTemasLibres;
