import React, { useState, useEffect } from "react";
import { use } from "react";
import { getTemasLibres, getTemasLibresById } from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";


export const useTemasLibres = () => {
    const eventId = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025
    const [renderTemasLibres, setRenderTemasLibres] = useState([]);
    const [formData, setFormData] = useState({
        titulo: "",
    });
    const [selectedValue, setSelectedValue] = useState("");
    const { setShowSpinner, internalView, setInternalView, processTrabajoId, setProcessTrabajoId } = useGlobal()

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

    useEffect(() => {
        const fetchTrabajo = async () => {
            if (!processTrabajoId) return;
            setShowSpinner(true);
            try {
                const trabajoResponse = await getTemasLibresById(eventId, processTrabajoId);
                if (!trabajoResponse.status) {
                    console.error("Error fetching tema libre by ID: ", trabajoResponse.error);
                    return;
                } else {
                    console.log("Tema libre fetched successfully: ", trabajoResponse.data);
                    setFormData({
                        titulo: trabajoResponse.data?.titulo || "",
                        // lastName: res?.lastName || "",
                        // dni: res?.dni || "",
                        // cell: res?.cell || "",
                        // servicio: res?.servicio || "",
                        // category: res?.category || "",
                        // email: res?.email || "",
                    });
                    setInternalView("procesarTemasLibres");
                }
            } catch (error) {
                console.log("Unable to retrieve user data");
            } finally {
                setShowSpinner(false);
            }
        };
        fetchTrabajo();
    }, [processTrabajoId]);


    const handleProcesarTemaLibre = async (id) => {
        setProcessTrabajoId(id);
    }

    const handleSubmitAsignar = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario
        console.log("Formulario enviado");
    };

    return {
        renderTemasLibres,
        handleProcesarTemaLibre,
        handleSubmitAsignar,
        selectedValue,
        setSelectedValue,
        formData
    }
}

