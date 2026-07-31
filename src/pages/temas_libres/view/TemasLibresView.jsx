import React from 'react'
import PagesBannerView from '../../../components/pagesBanner/view/PagesBannerView'

import Spinner from '../../../components/spinner/Spinner'
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM'
import InscripcionForm from '../components/InscripcionForm'
import AdminTemasLibres from '../components/AdminTemasLibres'

import { useGlobal } from '../../../hooks/useGlobal'

const TemasLibresView = () => {
    const { user } = useAuth();
    const { userData } = useProfile(user.uid);
    const [temasLibresView, setTemasLibresView] = React.useState("");
    const { VISTAS_TEMAS_LIBRES } = useGlobal();

    return (
        <div>
            <PagesBannerView title={"Trabajos Temas Libres"} />

            <section className="mt-3 rounded-tl-xl bg-White flex flex-col items-center px-3 py-10 laptop1:ms-40">
                <div className="w-[350px] tablet:w-[700px] laptop1:w-[800px]">
                    <ButtonVioletSM
                        onClick={() => setTemasLibresView(VISTAS_TEMAS_LIBRES.PRESENTAR_TRABAJOS)}
                        label="Presentar Trabajos"
                    />
                    <ButtonVioletSM
                        onClick={() => setTemasLibresView(VISTAS_TEMAS_LIBRES.GESTIONAR_TRABAJOS)}
                        label="Gestionar Trabajos"
                    />
                </div>

                {/* Bloque que renderiza las vistas */}
                <div className='w-full'>
                    {temasLibresView === VISTAS_TEMAS_LIBRES.PRESENTAR_TRABAJOS && < InscripcionForm />}
                    {/* {temasLibresView === VISTAS_PERFIL.TEMAS_LIBRES && <AdminTemasLibres userData={userData} />} */}
                    {temasLibresView === VISTAS_TEMAS_LIBRES.GESTIONAR_TRABAJOS && < AdminTemasLibres userData={userData} />}
                </div>
            </section>
            <Spinner />
        </div>
    )
}

export default TemasLibresView