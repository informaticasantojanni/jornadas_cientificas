import React, { useState, useRef } from "react";
import { useProfile } from "../hooks/useProfile";
import TemasLibresTable from "./TemasLibresTable";
import { useEventRegistrations } from "../hooks/useEventRegistrations";
import { useReports } from "../hooks/useReports";

const AdminTemasLibres = ({ userId }) => {
  const { userData } = useProfile(userId);
  const update = true
  return (
    <div className="w-auto h-full mt-3 px-3 rounded-tl-xl bg-White flex flex-col items-center laptop1:ms-40">
      <h2 className="w-full text-Black p-2 font-poppins text-lg font-semiBold">
        Bienvenido {userData?.name || "Usuario"}!
      </h2>

      <h3>Tabla envíos de temas libres</h3>

      <TemasLibresTable update={update}/>

    </div>
  );
};

export default AdminTemasLibres;
