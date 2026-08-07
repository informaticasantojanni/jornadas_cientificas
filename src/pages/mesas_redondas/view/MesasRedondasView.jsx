import React from 'react'
import PagesBannerView from '../../../components/pagesBanner/view/PagesBannerView'
import Spinner from '../../../components/spinner/Spinner'
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM'
import { useAuth } from '../../../core/auth/hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { useGlobal } from '../../../hooks/useGlobal'
import { Link } from 'react-router-dom';
import InscripcionForm from '../components/InscripcionForm'

const MesasRedondasView = () => {
  const { user } = useAuth();
  const { userData } = useProfile(user.uid);
  const { VISTAS_MESAS_REDONDAS } = useGlobal();
  const [mesasRedondasView, setMesasRedondasView] = React.useState(VISTAS_MESAS_REDONDAS.GESTIONAR_MESA);

  return (
    <div>
      <PagesBannerView title={"Mesas Redondas"} />


      <section className="mt-3 rounded-tl-xl bg-White flex flex-col items-center px-3 py-10 laptop1:ms-40">
        <div className="w-[350px] tablet:w-[700px] laptop1:w-[800px]">
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
        </div>

        {/* Bloque que renderiza las vistas */}
        <div className='w-full'>
          {mesasRedondasView === VISTAS_MESAS_REDONDAS.PRESENTAR_MESA && < InscripcionForm />}
          {/* {mesasRedondasView === VISTAS_PERFIL.MESAS_REDONDAS && <AdminMesasRedondas userData={userData} />}
          {mesasRedondasView === VISTAS_MESAS_REDONDAS.GESTIONAR_MESA && < AdminMesasRedondas userData={userData} />} */}
        </div>
      </section>

    </div>

  )
}

export default MesasRedondasView