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
        VISTAS_TEMAS_LIBRES,
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
        VISTAS_TEMAS_LIBRES,
        ROLES,
        EVENT_ID
    };
}

