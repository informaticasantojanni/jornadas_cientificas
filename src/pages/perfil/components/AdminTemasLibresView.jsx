import React, { useState } from 'react'
import AdminUserProfile from './AdminUserProfile';
import AdminTemasLibres from './AdminTemasLibres';
import { useAuth } from '../../../core/auth/hooks/useAuth';
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM';
import { useGlobal } from '../../../hooks/useGlobal';

const AdminTemasLibresView = ({userData}) => {
    const { internalView } = useGlobal();
    const [perfilTemasLibresView, setPerfilTemasLibresView] = useState("");

    return (
        <div className="laptop1:ms-40 mt-3 rounded-tl-xl bg-White flex flex-col items-center py-10 px-3 justify-center">
            <div>
                {perfilTemasLibresView === "" && (
                    <div className="flex flex-row items-center gap-5">
                        <ButtonVioletSM
                            onClick={() => setPerfilTemasLibresView("AdminUserProfile")}
                            label="Mi Perfil"
                        />
                        <ButtonVioletSM
                            onClick={() => setPerfilTemasLibresView("AdminTemasLibres")}
                            label="Temas Libres"
                        />
                    </div>
                )}

                {perfilTemasLibresView === "AdminUserProfile" && (
                    <div className="flex flex-col items-center">
                        <ButtonVioletSM
                            onClick={() => setPerfilTemasLibresView("")}
                            label="Volver"
                        />
                    </div>
                )}
                {(perfilTemasLibresView === "AdminTemasLibres"  && internalView == "temasLibres") && (
                    <div className="flex flex-col items-center">
                        <ButtonVioletSM
                            onClick={() => setPerfilTemasLibresView("")}
                            label="Volver"
                        />
                    </div>
                )}
            </div>

            <div className='w-full'>
                {perfilTemasLibresView === "AdminUserProfile" && <AdminUserProfile />}
                {perfilTemasLibresView === "AdminTemasLibres" && <AdminTemasLibres userData={userData} />}
            </div>

        </div>



    )
}

export default AdminTemasLibresView