import React, { useState } from 'react'
import AdminUserProfile from '../components/AdminUserProfile';
import TemasLibresView from './TemasLibresView';
import { useAuth } from '../../../core/auth/hooks/useAuth';
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM';
import { useGlobal } from '../../../hooks/useGlobal';
import { Link } from 'react-router-dom';

const PerfilRoleView = ({ userData }) => {
    const { ROLES, VISTAS_PERFIL, internalView, perfilView, setPerfilView } = useGlobal();

    return (
        <div className="laptop1:ms-40 mt-3 rounded-tl-xl bg-White flex flex-col items-center py-10 px-3 justify-center">
            <div>
                {perfilView === "" && (
                    <div className="flex flex-col items-center gap-5">
                        <Link
                            className="w-[250px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
                            to={"/misDatos"}
                        >
                            Mis Datos
                        </Link>
                        <Link
                            className="w-[250px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
                            to={"/temasLibres"}
                        >
                            Temas Libres
                        </Link>
                        <Link
                            className="w-[250px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
                            to={"/mesasRedondas"}
                        >
                            Mesas Redondas
                        </Link>

                        {/* <ButtonVioletSM
                            onClick={() => setPerfilView(VISTAS_PERFIL.USUARIO)}
                            label="Mi datos"
                        /> */}
                        {/* <ButtonVioletSM
                            onClick={() => setPerfilView(VISTAS_PERFIL.TEMAS_LIBRES)}
                            label="Temas Libres"
                        /> */}
                        {/* <ButtonVioletSM
                            onClick={() => setPerfilView(VISTAS_PERFIL.MESAS_REDONDAS)}
                            label="Mesas Redondas"
                        /> */}
                    </div>
                )}

                {/* {perfilRoleView !== "AdminUserProfile" && (
                    <div className="flex flex-col items-center">
                        <ButtonVioletSM
                            onClick={() => setPerfilRoleView("")}
                            label="Volver"
                        />
                    </div>
                )} */}
                {/* {(perfilRoleView === "AdminTemasLibres" && internalView == "temasLibres") && (
                    <div className="flex flex-col items-center">
                        <ButtonVioletSM
                            onClick={() => setPerfilRoleView("")}
                            label="Volver"
                        />
                    </div>
                )} */}
            </div>

            {/* Bloque que renderiza las vistas */}
            <div className='w-full'>
                {perfilView === VISTAS_PERFIL.USUARIO && <AdminUserProfile />}
                {/* {perfilView === VISTAS_PERFIL.TEMAS_LIBRES && <AdminTemasLibres userData={userData} />} */}
                {perfilView === VISTAS_PERFIL.TEMAS_LIBRES && <TemasLibresView userData={userData} />}
            </div>

        </div>



    )
}

export default PerfilRoleView