import React from "react";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import Spinner from "../../../components/spinner/Spinner";
import ButtonVioletSM from "../../../components/buttons/ButtonVioletSM";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useGlobal } from "../../../hooks/useGlobal";
import { Link } from "react-router-dom";
import InscripcionForm from "../components/InscripcionForm";

const MesasRedondasView = () => {
  const { user } = useAuth();
  const { userData } = useProfile(user.uid);
  const { VISTAS_MESAS_REDONDAS } = useGlobal();
  const [mesasRedondasView, setMesasRedondasView] = React.useState(VISTAS_MESAS_REDONDAS.PRESENTAR_MESA);

  return (
    <div>
      <PagesBannerView title={"Mesas Redondas"} />

      <section className="mt-3 rounded-tl-xl bg-White flex flex-col items-center px-3 py-10 laptop1:ms-40">
        {/* <div className="w-[350px] tablet:w-[700px] laptop1:w-[800px]">
          <Link
            className="w-[250px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
            to={"/perfil"}
          >
            Volver
          </Link>
          {mesasRedondasView === VISTAS_MESAS_REDONDAS.PRESENTAR_MESA ? (
            <ButtonVioletSM
              onClick={() => setMesasRedondasView(VISTAS_MESAS_REDONDAS.GESTIONAR_MESA)}
              label="Gestionar Mesa"
            />
          ) : (
            <ButtonVioletSM
              onClick={() => setMesasRedondasView(VISTAS_MESAS_REDONDAS.PRESENTAR_MESA)}
              label="Presentar Mesa"
            />
          )}
        </div> */}

        <div className="w-[350px] tablet:w-[700px] laptop1:w-[800px] flex flex-wrap items-center justify-between gap-3 mb-5">
          <Link className="flex items-center gap-1.5 text-sm font-semiBol px-4 py-1.5 border border-LightViolet text-LightViolet rounded-full hover:bg-LightViolet hover:text-White transition duration-300 ease-in-out" to={"/perfil"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M400-80 0-480l400-400 71 71-329 329h858v100H142l329 329-71 71Z" />
            </svg>
            Volver
          </Link>

          <div className="flex items-center gap-1 bg-DarkGrey rounded-full p-1">
            <button type="button" onClick={() => setMesasRedondasView(VISTAS_MESAS_REDONDAS.PRESENTAR_MESA)} className={`text-sm font-semiBol px-4 py-1.5 rounded-full transition duration-300 ease-in-out ${mesasRedondasView === VISTAS_MESAS_REDONDAS.PRESENTAR_MESA ? "bg-LightViolet text-White shadow" : "text-Violet hover:bg-White"}`}>
              Presentar Mesa
            </button>
            <button type="button" onClick={() => setMesasRedondasView(VISTAS_MESAS_REDONDAS.GESTIONAR_MESA)} className={`text-sm font-semiBol px-4 py-1.5 rounded-full transition duration-300 ease-in-out ${mesasRedondasView === VISTAS_MESAS_REDONDAS.GESTIONAR_MESA ? "bg-LightViolet text-White shadow" : "text-Violet hover:bg-White"}`}>
              Gestionar Mesa
            </button>
          </div>
        </div>

        {/* Bloque que renderiza las vistas */}
        <div className="w-full">
          {mesasRedondasView === VISTAS_MESAS_REDONDAS.PRESENTAR_MESA && <InscripcionForm />}
          {/* {mesasRedondasView === VISTAS_PERFIL.MESAS_REDONDAS && <AdminMesasRedondas userData={userData} />}
          {mesasRedondasView === VISTAS_MESAS_REDONDAS.GESTIONAR_MESA && < AdminMesasRedondas userData={userData} />} */}
        </div>
      </section>
    </div>
  );
};

export default MesasRedondasView;
