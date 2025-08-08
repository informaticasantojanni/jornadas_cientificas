import React, { useState, useEffect } from "react";
import { use } from "react";
import { getTemasLibres } from "../../../services/firebase.services";


export const useTemasLibres = () => {
    const eventId = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025

    const [renderTemasLibres, setRenderTemasLibres] = useState([]);

    useEffect(() => {
        const fetchTemasLibres = async () => {
            try {
                // Llamar al servicio para obtener los temas libres
                const response = await getTemasLibres(eventId); // Asegúrate de definir esta función
                if (!response.status) {
                    throw new Error("Error fetching temas libres");
                } else {
                    setRenderTemasLibres(response.data);
                }

            } catch (error) {
                console.error("Error fetching temas libres: ", response.error);
            }
        };
        fetchTemasLibres();
    }, []);



    const handleProcesarTemaLibre = async (setInternalView, id) => {
        setInternalView("procesarTemasLibres");
        console.log("Procesando tema libre con ID: ", id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario
        console.log("Formulario enviado");
    };

    return {
        renderTemasLibres,
        handleProcesarTemaLibre,
        handleSubmit
    }
}

