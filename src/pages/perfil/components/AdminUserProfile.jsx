import React from 'react'
import UserDatos from '../components/UserDatos'
import Registration from '../components/Registration'
import TemasLibres from '../components/TemasLibres'     
import Certificates from '../components/Certificates'

const AdminUserProfile = () => {    
    return (
        <>
            <UserDatos />
            <Registration />
            <TemasLibres />
            <Certificates />
        </>
    )
}

export default AdminUserProfile