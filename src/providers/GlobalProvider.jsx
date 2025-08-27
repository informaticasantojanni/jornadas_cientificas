import React, { useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const GlobalProvider = ({ children }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [desktopView, setDesktopView] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)
    const [internalView, setInternalView] = useState("temasLibres");
    const [processTrabajoId, setProcessTrabajoId] = useState("");
    const [userData, setUserData] = useState({});
    const PERFILES = {
        ADMIN: "admin",
        USER: "user",
        TEMAS_LIBRES_VOCAL: "temasLibresVocal",
        TEMAS_LIBRES_PRESIDENTE: "temasLibresPresidente",
        TEMAS_LIBRES_COMITE: "temasLibresComite"
    }

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setDesktopView((windowWidth >= 1024) ? true : false)
    }, [windowWidth]);


    return (
        <GlobalContext.Provider
            value={
                {
                    desktopView,
                    showSpinner,
                    setShowSpinner,
                    internalView,
                    setInternalView,
                    processTrabajoId,
                    setProcessTrabajoId,
                    PERFILES
                }
            }>

            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;