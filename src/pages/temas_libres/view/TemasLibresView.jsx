import React from 'react'
import PagesBannerView from '../../../components/pagesBanner/view/PagesBannerView'

import Spinner from '../../../components/spinner/Spinner'
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
                <div className="w-[350px] tablet:w-[700px] laptop1:w-[800px] flex flex-wrap items-center justify-between gap-3">
                    <Link
                        className="flex items-center gap-1.5 text-sm font-semiBol px-4 py-1.5 border border-LightViolet text-LightViolet rounded-full hover:bg-LightViolet hover:text-White transition duration-300 ease-in-out"
                        to={"/perfil"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M400-80 0-480l400-400 71 71-329 329h858v100H142l329 329-71 71Z" />
                        </svg>
                        Volver
                    </Link>

                    <div className="flex items-center gap-1 bg-DarkGrey rounded-full p-1">
                        <button
                            type="button"
                            onClick={() => setTemasLibresView(VISTAS_TEMAS_LIBRES.GESTIONAR_TRABAJOS)}
                            className={`text-sm font-semiBol px-4 py-1.5 rounded-full transition duration-300 ease-in-out ${temasLibresView === VISTAS_TEMAS_LIBRES.GESTIONAR_TRABAJOS
                                ? "bg-LightViolet text-White shadow"
                                : "text-Violet hover:bg-White"
                                }`}
                        >
                            Gestionar Trabajos
                        </button>
                        <button
                            type="button"
                            onClick={() => setTemasLibresView(VISTAS_TEMAS_LIBRES.PRESENTAR_TRABAJOS)}
                            className={`text-sm font-semiBol px-4 py-1.5 rounded-full transition duration-300 ease-in-out ${temasLibresView === VISTAS_TEMAS_LIBRES.PRESENTAR_TRABAJOS
                                ? "bg-LightViolet text-White shadow"
                                : "text-Violet hover:bg-White"
                                }`}
                        >
                            Presentar Trabajos
                        </button>
                    </div>
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