import React, { useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const GlobalProvider = ({ children }) => {

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
                    setProcessTrabajoId
                }
            }>

            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;