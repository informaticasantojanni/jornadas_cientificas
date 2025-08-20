import React, {useState} from 'react'
import AdminUserProfile from './AdminUserProfile';
import AdminTemasLibres from './AdminTemasLibres';
import { useAuth } from '../../../core/auth/hooks/useAuth';

const AdminTemasLibresView = () => {
    const { user } = useAuth();
    const [perfilTemasLibresView, setPerfilTemasLibresView] = useState("");

    return (
        <div className="w-full pb-20">
            <div>
                <button
                    onClick={() => setPerfilTemasLibresView("AdminUserProfile")}>
                    Mi Perfil
                </button>
                <button
                    onClick={() => setPerfilTemasLibresView("AdminTemasLibres")}>
                    Temas Libres
                </button>
            </div>

            <div>
                {perfilTemasLibresView === "AdminUserProfile" && <AdminUserProfile />}
                {perfilTemasLibresView === "AdminTemasLibres" && <AdminTemasLibres userId={user.uid}/>}
            </div>

        </div>



    )
}

export default AdminTemasLibresView