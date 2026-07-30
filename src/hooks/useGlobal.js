import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobal = () => {
    const {
        desktopView,
        showSpinner,
        setShowSpinner,
        perfilView,
        setPerfilView,
        internalView,
        setInternalView,
        processTrabajoId,
        setProcessTrabajoId,
        ROLES,
        VISTAS_PERFIL,
        EVENT_ID
    } = useContext(GlobalContext)

    return {
        desktopView,
        showSpinner,
        setShowSpinner,
        perfilView,
        setPerfilView,
        internalView,
        setInternalView,
        processTrabajoId,
        setProcessTrabajoId,
        VISTAS_PERFIL,
        ROLES,
        EVENT_ID
    };
}

