import React from 'react'
import PagesBannerView from '../../../components/pagesBanner/view/PagesBannerView'

import Spinner from '../../../components/spinner/Spinner'
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM'
import InscripcionForm from '../components/InscripcionForm'
import AdminTemasLibres from '../components/AdminTemasLibres'
import { useAuth } from '../../../core/auth/hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { useGlobal } from '../../../hooks/useGlobal'
import { Link } from 'react-router-dom';

const TemasLibresView = () => {
    const { user } = useAuth();
    const { userData } = useProfile(user.uid);
    const { VISTAS_TEMAS_LIBRES } = useGlobal();
    const [temasLibresView, setTemasLibresView] = React.useState(VISTAS_TEMAS_LIBRES.GESTIONAR_TRABAJOS);


    return (
        <div>
            <PagesBannerView title={"Trabajos Temas Libres"} />

            <section className="mt-3 rounded-tl-xl bg-White flex flex-col items-center px-3 py-10 laptop1:ms-40">
                <div className="w-[350px] tablet:w-[700px] laptop1:w-[800px]">
                    <Link
                        className="w-[250px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
                        to={"/perfil"}
                    >
                        Volver
                    </Link>
                    {temasLibresView === VISTAS_TEMAS_LIBRES.PRESENTAR_TRABAJOS ? (
                        <ButtonVioletSM
                            onClick={() => setTemasLibresView(VISTAS_TEMAS_LIBRES.GESTIONAR_TRABAJOS)}
                            label="Gestionar Trabajos"
                        />
                    ) : (
                        <ButtonVioletSM
                            onClick={() => setTemasLibresView(VISTAS_TEMAS_LIBRES.PRESENTAR_TRABAJOS)}
                            label="Presentar Trabajos"
                        />
                    )}
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