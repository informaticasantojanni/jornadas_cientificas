import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobal = () => {
    const {
        desktopView,
        showSpinner,
        setShowSpinner
    } = useContext(GlobalContext)

    return {
        desktopView,
        showSpinner,
        setShowSpinner
    };
}

