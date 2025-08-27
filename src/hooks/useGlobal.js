import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobal = () => {
    const {
        desktopView,
        showSpinner,
        setShowSpinner,
        internalView,
        setInternalView,
        processTrabajoId,
        setProcessTrabajoId,
        PERFILES
    } = useContext(GlobalContext)

    return {
        desktopView,
        showSpinner,
        setShowSpinner,
        internalView,
        setInternalView,
        processTrabajoId,
        setProcessTrabajoId,
        PERFILES
    };
}

