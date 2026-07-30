import React, { useState } from 'react'
import AdminUserProfile from '../components/AdminUserProfile';
import AdminTemasLibres from '../components/AdminTemasLibres';
import { useAuth } from '../../../core/auth/hooks/useAuth';
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM';
import { useGlobal } from '../../../hooks/useGlobal';


const TemasLibresView = ({ userData }) => {
    const { ROLES, VISTAS_PERFIL, internalView, perfilView, setPerfilView } = useGlobal();

    return (
        <div className="laptop1:ms-40 mt-3 rounded-tl-xl bg-White flex flex-col items-center py-10 px-3 justify-center">
            {/* Boton para volver a la vista principal del perfil */}
            <div className="flex flex-col items-center">
                <ButtonVioletSM
                    onClick={() => setPerfilView(VISTAS_PERFIL.TEMAS_LIBRES)}
                    label="Volver"
                />
            </div>

            {/* Segun el perfil del usuario permitir subir y ver trabajos */}
            <div>
                {userData.role && ( // TO DO: completar la condición
                    <div className="flex flex-col items-center gap-5">
                        <ButtonVioletSM
                            onClick={() => setPerfilView(VISTAS_PERFIL.TEMAS_LIBRES_SUBIR_TRABAJO)}
                            label="Presentar Trabajo"
                        />
                        <ButtonVioletSM
                            onClick={() => setPerfilView(VISTAS_PERFIL.TEMAS_LIBRES_VER_TRABAJOS)}
                            label="Ver Trabajos"
                        />
                    </div>
                )}
            </div>

            {/* Bloque que renderiza las vistas */}
            <div className='w-full'>
                {perfilView === VISTAS_PERFIL.USUARIO && <AdminUserProfile />}
                {perfilView === VISTAS_PERFIL.TEMAS_LIBRES && <AdminTemasLibres userData={userData} />}
            </div>

        </div>



    )
}

export default TemasLibresView