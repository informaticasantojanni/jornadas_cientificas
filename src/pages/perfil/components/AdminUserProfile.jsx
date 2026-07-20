import React from 'react'
import UserDatos from '../components/UserDatos'
import Registration from '../components/Registration'
import TemasLibres from '../components/TemasLibres'
import Certificates from '../components/Certificates'
import Certificates2025 from '../components/Certificates2025'

const AdminUserProfile = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <UserDatos />
            <Registration />
            <TemasLibres />
            <Certificates2025 />
            <Certificates />

        </div>
    )
}

export default AdminUserProfile