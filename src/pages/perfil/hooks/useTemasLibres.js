import { useState, useEffect } from "react";
import { getTemasLibres, getTemasLibresById, getUserById } from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";
import { updateTrabajo } from "../../../services/firebase.services";
import Swal from "sweetalert2";
import { useAuth } from "../../../core/auth/hooks/useAuth";

export const useTemasLibres = () => {
    const REVISION_ESTADOS = {
        PENDIENTE: "Pendiente",
        ACEPTADO: "Aceptado",
        RECHAZADO: "Rechazado"
    }

    const { user } = useAuth();
    const eventId = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025
    const [renderTemasLibres, setRenderTemasLibres] = useState([]);
    const [formData, setFormData] = useState({
        titulo: "",
        vocalAsignado: "",
        vocalRevision: "",
    });
    const [selectedValue, setSelectedValue] = useState("");
    const { setShowSpinner, internalView, setInternalView, processTrabajoId, setProcessTrabajoId } = useGlobal()

    useEffect(() => {
        const fetchTemasLibres = async () => {
            try {
                // Llamar al servicio para obtener los temas libres
                const temasLibresResponse = await getTemasLibres(eventId); // Asegúrate de definir esta función
                if (!temasLibresResponse.status) {
                    throw new Error("Error leyendo temas libres", temasLibresResponse.error);
                } else {
                    console.log("User ID: ", user.uid);
                    const userData = await getUserById(user.uid);
                    console.log("User Data: ", userData);
                    if (userData.role == "temasLibresPresidente") {
                        setRenderTemasLibres(temasLibresResponse.data);
                    } else if (userData.role == "temasLibresVocal") {
                        console.log("User Data ID: ", userData.id);
                        console.log("Temas Libres Data: ", temasLibresResponse.data);
                        setRenderTemasLibres(temasLibresResponse.data.filter(trabajo => trabajo.vocalAsignado == userData.id));
                    }


                }
            } catch (error) {
                console.error("Error: ", error);
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
                    const trabajo = trabajoResponse.data;
                    setFormData({
                        titulo: trabajo?.titulo || "",
                        vocalAsignado: trabajo?.vocalAsignado || "",
                        vocalRevision: trabajo?.vocalRevision || "",
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGuardarTrabajo = async (e) => {
        e.preventDefault();
        setShowSpinner(true);
        const response = await updateTrabajo(eventId, processTrabajoId, formData);
        if (!response.status) {
            Swal.fire({
                title: "Error",
                text: `${response.error} !`,
                background: "#FAFAFA",
                color: "#025951",
                iconColor: "#DC143C",
                icon: "error",
                allowOutsideClick: false, // No permite hacer clic fuera del modal
                allowEscapeKey: false, // No permite cerrar con la tecla Escape
                allowEnterKey: false, // No permite cerrar con la tecla Enter
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#038C7F",
            });
            return;
        } else {
            const userInput = await Swal.fire({
                title: "Cambio exitoso!",
                text: `Se han actualizado los datos del trabajo.`,
                background: "#FAFAFA",
                color: "#025951",
                iconColor: "#025951",
                icon: "success",
                allowOutsideClick: false, // No permite hacer clic fuera del modal
                allowEscapeKey: false, // No permite cerrar con la tecla Escape
                allowEnterKey: false, // No permite cerrar con la tecla Enter
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#038C7F",
            });

            // Después del clic en "Aceptar", recargar la página
            if (userInput.isConfirmed) {
                window.location.reload();
            }
        }

        console.log("Form Data Submitted: ", formData);
    };



    return {
        renderTemasLibres,
        handleProcesarTemaLibre,
        handleGuardarTrabajo,
        selectedValue,
        handleChange,
        formData,
        REVISION_ESTADOS
    }
}

