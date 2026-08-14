import React, { useEffect } from "react";
import UserDatos from '../../perfil/components/UserDatos'
import Registration from '../../perfil/components/Registration'
import Certificates from '../../perfil/components/Certificates'
import Certificates2025 from '../../perfil/components/Certificates2025'
import { useGlobal } from '../../../hooks/useGlobal'
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM'
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import Spinner from "../../../components/spinner/Spinner";
import { Link } from 'react-router-dom';

const MisDatosView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PagesBannerView title="Mi perfil" />
            <div className="laptop1:ms-40 mt-3 rounded-tl-xl bg-White flex flex-col items-center py-10 px-3 justify-center">
                <Link
                    className="w-[250px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
                    to={"/perfil"}
                >
                    Volver
                </Link>
                <UserDatos />
                <Registration />
                <Certificates2025 />
                <Certificates />
            </div>
            <Spinner />
        </>

    )
}

export default MisDatosView