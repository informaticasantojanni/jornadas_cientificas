import React, { useState, useRef } from "react";
import { useProfile } from "../hooks/useProfile";
import EventRegistrationsTable from "./EventRegistrationsTable";
import { useEventRegistrations } from "../hooks/useEventRegistrations";
import { useReports } from "../hooks/useReports";

const AdminProfile = ({ userId }) => {
  const { generateReport } = useReports();
  const { userData } = useProfile(userId);
  const [searchDni, setSearchDni] = useState("");
  const dniInputRef = useRef(null);

  const handleSubmitSearchUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dni = formData.get("dni");
    setSearchDni(dni);
    dniInputRef.current.value = "";
  };

  return (
    <div className="w-auto h-full mt-3 px-3 rounded-tl-xl bg-White flex flex-col items-center laptop1:ms-40">
      <h2 className="w-full text-Black p-2 font-poppins text-lg font-semiBold">
        Bienvenido {userData?.name || "Usuario"}!
      </h2>

      {/* Form search user */}
      <div className="w-full pb-10">
        <form onSubmit={handleSubmitSearchUser}>
          <div className="w-full m-auto rounded-xl p-10 bg-gradient-to-b from-LightGreen to-Green text-white tablet:w-1/2 laptop1:w-1/2 laptop2:w-[500px]">
            <div className="flex flex-col mb-5">
              <label htmlFor="email" className="w-full text-White pb-2">
                Buscar DNI
              </label>
              <input
                id="dni"
                name="dni"
                type="text"
                className="w-full px-2 py-2 mb-5 rounded-lg shadow-lightShadowGrey"
                ref={dniInputRef}
              />
            </div>
          </div>

          <div className="w-full flex justify-center pt-5">
            <button
              className="w-[150px] text-xl font-bold px-5 py-3 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
              type="submit"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      <EventRegistrationsTable searchDni={searchDni} />

      <div>
        <button onClick={generateReport}>Generar Reporte</button>
      </div>
    </div>
  );
};

export default AdminProfile;
