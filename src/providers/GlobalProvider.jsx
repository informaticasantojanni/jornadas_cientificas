import React, { useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const GlobalProvider = ({ children }) => {

    // Declaración de constantes
    const EVENT_ID = "hKAIOceT9XY855FSbXL2"; //eventId Jornadas 2026
    // const EVENT_ID = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025
    // const eventId = "ZbclMy93Cs9jzEYAgVui"; //eventId Jornadas 2024
    const ROLES = {
        ADMIN: "admin",
        USER: "user",
        TEMAS_LIBRES_VOCAL: "temasLibresVocal",
        TEMAS_LIBRES_PRESIDENTE: "temasLibresPresidente",
        TEMAS_LIBRES_COMITE: "temasLibresComite",
        MESAS_REDONDAS_VOCAL: "mesasRedondasVocal",
        MESAS_REDONDAS_PRESIDENTE: "mesasRedondasPresidente",
        MESAS_REDONDAS_COMITE: "mesasRedondasComite"
    }

    const VISTAS_PERFIL = {
        USUARIO: "usuario",
        TEMAS_LIBRES: "temasLibres",
        TEMAS_LIBRES_PRESENTAR_TRABAJOS: "temasLibresPresentarTrabajos",
        TEMAS_LIBRES_VER_TRABAJOS: "temasLibresVerTrabajos",
        TEMAS_LIBRES_PROCESAR_TRABAJOS: "temasLibresProcesarTrabajos",
        MESAS_REDONDAS: "mesasRedondas",
        MESAS_REDONDAS_PRESENTAR_TRABAJOS: "mesasRedondasPresentarTrabajos",
        MESAS_REDONDAS_VER_TRABAJOS: "mesasRedondasVerTrabajos",
        MESAS_REDONDAS_PROCESAR_TRABAJOS: "mesasRedondasProcesarTrabajos"
    }

    // Declaración de hook states
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [desktopView, setDesktopView] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)
    // perfilRoleView lo usamos para vista de la page perfil segun el rol del usuario
    const [perfilView, setPerfilView] = useState("");
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
                    perfilView,
                    setPerfilView,
                    internalView,
                    setInternalView,
                    processTrabajoId,
                    setProcessTrabajoId,
                    ROLES,
                    VISTAS_PERFIL,
                    EVENT_ID
                }
            }>

            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;