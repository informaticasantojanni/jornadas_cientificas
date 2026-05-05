import React, { useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const GlobalProvider = ({ children }) => {

    // Declaración de constantes
    const EVENT_ID = "hKAIOceT9XY855FSbXL2"; //eventId Jornadas 2026
    // const EVENT_ID = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025
    // const eventId = "ZbclMy93Cs9jzEYAgVui"; //eventId Jornadas 2024
    const PERFILES = {
        ADMIN: "admin",
        USER: "user",
        TEMAS_LIBRES_VOCAL: "temasLibresVocal",
        TEMAS_LIBRES_PRESIDENTE: "temasLibresPresidente",
        TEMAS_LIBRES_COMITE: "temasLibresComite"
    }

    // Declaración de hook states
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [desktopView, setDesktopView] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)
    const [internalView, setInternalView] = useState("temasLibres");
    const [processTrabajoId, setProcessTrabajoId] = useState("");


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
                    PERFILES,
                    EVENT_ID
                }
            }>

            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;