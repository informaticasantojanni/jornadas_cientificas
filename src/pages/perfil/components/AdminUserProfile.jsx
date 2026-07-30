import React from 'react'
import UserDatos from '../components/UserDatos'
import Registration from '../components/Registration'
import TemasLibres from '../components/TemasLibres'
import Certificates from '../components/Certificates'
import Certificates2025 from '../components/Certificates2025'
import { useGlobal } from '../../../hooks/useGlobal'
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM'

const AdminUserProfile = () => {

    const { perfilView, setPerfilView } = useGlobal();

    return (
        <div className='w-full flex flex-col items-center'>
            {/* {perfilView !== "AdminUserProfile" && ( */}
            <div className="flex flex-col items-center">
                <ButtonVioletSM
                    onClick={() => setPerfilView("")}
                    label="Volver"
                />
            </div>
            {/* )} */}
            <UserDatos />
            <Registration />
            <TemasLibres />
            <Certificates2025 />
            <Certificates />

        </div>
    )
}

export default AdminUserProfile