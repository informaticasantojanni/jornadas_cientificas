import { useState, useEffect } from "react";
import {
    getTemasLibres,
    getTemasLibresById,
    getUserById,
    getAllUsers,
} from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";
import { updateTrabajo } from "../../../services/firebase.services";
import Swal from "sweetalert2";
import { useAuth } from "../../../core/auth/hooks/useAuth";

export const useTemasLibres = (userData) => {
    const {
        setShowSpinner,
        internalView,
        setInternalView,
        processTrabajoId,
        setProcessTrabajoId,
        PERFILES
    } = useGlobal();

    const eventId = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025
    const [renderTemasLibres, setRenderTemasLibres] = useState([]);
    const [listaTemasLibres, setListaTemasLibres] = useState([]);
    const [formData, setFormData] = useState({
        titulo: "",
        serviciosList: [],
        autoresList: [],
        vocalAsignado: "",
        vocalRevision: "",
        vocalRevisionObservaciones: "",
        contactoNombre: "",
        contactoApellido: "",
        contactoEmail: "",
        presentacionDia: "",
        presentacionHora: "",
        presentacionAula: "",
        trabajoEvaluacion: "",
        trabajoEvaluacionObservaciones: ""
    });
    const [selectedValue, setSelectedValue] = useState("");
    const [listaVocales, setListaVocales] = useState([]);
    const [filtrarTrabajos, setFiltrarTrabajos] = useState({
        query: "",
        pendientesAsignacion: false,
        pendientesRevision: false,
    });
    const urlFetchAPI =
        "https://script.google.com/macros/s/AKfycby_hX8CP5S-dn8JIbBe37JmL2sBKjNhH5V0p2dixtfDkSKuM6L4zXVSinWoPImhYvSNEQ/exec";

    const REVISION_ESTADOS = [
        { id: 1, label: "Pendiente" },
        { id: 2, label: "Aceptado" },
        { id: 3, label: "Observado" },
        { id: 4, label: "Rechazado" },
    ];

    useEffect(() => {
        const fetchTemasLibres = async () => {
            setShowSpinner(true);
            console.log("User Data en fetch Temas Libres: ", userData);
            try {
                // Llamar al servicio para obtener los temas libres
                const temasLibresResponse = await getTemasLibres(eventId); // Asegúrate de definir esta función
                if (!temasLibresResponse.status) {
                    throw new Error(
                        "Error leyendo temas libres: ",
                        temasLibresResponse.error
                    );
                } else {
                    if (userData?.role == "temasLibresPresidente") {
                        setRenderTemasLibres(temasLibresResponse.data);
                        setListaTemasLibres(temasLibresResponse.data);
                    } else if (userData?.role == "temasLibresVocal") {
                        console.log("Temas Libres Data: ", temasLibresResponse.data);
                        setRenderTemasLibres(
                            temasLibresResponse.data.filter(
                                (trabajo) => trabajo.vocalAsignado == userData.id
                            )
                        );
                        setListaTemasLibres(
                            temasLibresResponse.data.filter(
                                (trabajo) => trabajo.vocalAsignado == userData.id
                            )
                        );
                    }
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        const fetchVocales = async () => {
            try {
                const usersResponse = await getAllUsers();
                const usersVocales = usersResponse.filter((user) =>
                    user.role.includes("temasLibresVocal")
                );
                console.log("Vocales: ", usersVocales);
                const vocales = usersVocales.map((vocal) => {
                    return { id: vocal.id, label: vocal.name + " " + vocal.lastName };
                });

                setListaVocales(vocales);
            } catch (error) {
                console.error("Error: ", error);
            }
            finally {
                setShowSpinner(false);
            }
        };
        fetchVocales();
        fetchTemasLibres();
    }, []);

    useEffect(() => {
        const fetchTrabajo = async () => {
            if (!processTrabajoId) return;
            setShowSpinner(true);
            try {
                const trabajoResponse = await getTemasLibresById(
                    eventId,
                    processTrabajoId
                );
                if (!trabajoResponse.status) {
                    console.error(
                        "Error fetching tema libre by ID: ",
                        trabajoResponse.error
                    );
                    return;
                } else {
                    const trabajo = trabajoResponse.data;
                    setFormData({
                        titulo: trabajo?.titulo ?? "",
                        autoresList: trabajo?.autoresList ?? "",
                        serviciosList: trabajo?.serviciosList ?? "",
                        vocalAsignado: trabajo?.vocalAsignado ?? "",
                        vocalRevision: trabajo?.vocalRevision ?? "",
                        vocalRevisionObservaciones: trabajo?.vocalRevisionObservaciones ?? "",
                        contactoNombre: trabajo?.contactoNombre ?? "",
                        contactoApellido: trabajo?.contactoApellido ?? "",
                        contactoEmail: trabajo?.contactoEmail ?? "",
                        presentacionDia: trabajo?.presentacionDia ?? "",
                        presentacionHora: trabajo?.presentacionHora ?? "",
                        presentacionAula: trabajo?.presentacionAula ?? "",
                        trabajoEvaluacion: trabajo?.trabajoEvaluacion ?? "",
                        trabajoEvaluacionObservaciones: trabajo?.trabajoEvaluacionObservaciones ?? "",
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

    // Función para normalizar y eliminar tildes
    const normalizeText = (text) => {
        return text
            .normalize("NFD") // separa los caracteres base de los diacríticos
            .replace(/[\u0300-\u036f]/g, "") // elimina los diacríticos
            .toLowerCase();
    };

    useEffect(() => {
        const filterTemasLibres = () => {
            const query = normalizeText(filtrarTrabajos.query);

            const filtered = listaTemasLibres.filter((tema) =>
                normalizeText(tema.titulo).includes(query) ||
                (Array.isArray(tema.autoresList) &&
                    tema.autoresList.some((autor) => normalizeText(autor).includes(query))) ||
                (Array.isArray(tema.serviciosList) &&
                    tema.serviciosList.some((servicio) => normalizeText(servicio).includes(query))) ||
                normalizeText(tema.contactoNombre).includes(query) ||
                normalizeText(tema.contactoApellido).includes(query) ||
                normalizeText(tema.contactoEmail).includes(query) ||
                normalizeText(tema.contactoCelular).includes(query)
            );

            setRenderTemasLibres(filtered);
        };

        filterTemasLibres();
    }, [filtrarTrabajos.query, filtrarTrabajos.pendientesAsignacion]);

    const handleProcesarTemaLibre = async (id) => {
        setProcessTrabajoId(id);
    };

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
        let error = "";
        let userInput = null;

        // TO DO:
        // Antes de guardar agregar un pop de confirmación

        try {
            const updateTrabajoresponse = await updateTrabajo(
                eventId,
                processTrabajoId,
                formData
            );
            if (!updateTrabajoresponse.status) {
                error = updateTrabajoresponse.error;
                throw new Error(error);
            }

            const enviarEmailResponse = await enviarEmailRevisionTemasLibres();
            if (!enviarEmailResponse.status) {
                error = enviarEmailResponse.error;
                throw new Error(error);
            }
        } catch (e) {
            error = e;
            console.error("Error saving trabajo: ", error);
        } finally {
            setShowSpinner(false);
            // Después del clic en "Aceptar", recargar la página
            userInput = await Swal.fire({
                title: error == "" ? "Cambio exitoso!" : "Error",
                text: error == "" ? `Se han actualizado los datos del trabajo.` : error,
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
            if (userInput.isConfirmed) {
                window.location.reload();
            }
        }
    };

    const formatAutores = (arr, n = 3, maxLen = 30) => {
        if (!Array.isArray(arr)) return "-";
        // función corta para truncar texto
        const truncate = (str) =>
            str.length > maxLen ? str.slice(0, maxLen) + "…" : str;
        const sliced = arr.slice(0, n).map(truncate);
        return arr.length > n
            ? sliced.join(", ") + ` y ${arr.length - n} más`
            : arr.map(truncate).join(", ");
    };

    const handleVolver = () => {
        setInternalView("temasLibres");
        setProcessTrabajoId("");
    };

    const handleTableFilter = (e) => {
        const { name, type, checked, value } = e.target;
        console.log(name, type, checked, value);

        setFiltrarTrabajos((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const enviarEmailRevisionTemasLibres = async () => {
        console.log("Form Data desde enviar email: ", formData);
        const response = { status: true, error: "" };

        // Step 1: Create a new object to avoid modifying the original formData
        // and set the vocalRevision property correctly.
        const userDataPrep = {
            ...formData,
            vocalRevision:
                REVISION_ESTADOS.find((estado) => estado.id == formData.vocalRevision)
                    ?.label || "",
        };

        // Step 2: Create the fetchData object using the prepared data
        const fetchData = {
            userData: userDataPrep,
            action: "revision_temas_libres",
        };

        // Fetch Gmail to send email
        const jsonResponse = await fetch(urlFetchAPI, {
            method: "POST",
            redirect: "follow",
            dataType: "json",
            accepts: "application/json",
            body: JSON.stringify(fetchData),
        });

        // Handle the response from the Google Apps Script endpoint
        if (jsonResponse.ok) {
            const objectResponse = await jsonResponse.json();

            // Handle the response from the Google Apps Script App
            if (objectResponse.status) {
                response.status = true;
            } else {
                response.status = false;
                response.error = objectResponse.error;
            }
        } else {
            response.status = false;
            response.error = objectResponse.error;
        }
        return response;
    };

    const tableItems = [
        "Título",
        "Servicios",
        "Autores",
        "Link Abstract",
        "Presenta a premio",
        "Link Premio",
        "Lugar de realización",
        "Contacto Nombre",
        "Contacto Apellido",
        "Contacto Email",
        "Contacto Cell",
        "Vocal Asignado",
        "Revisión",
        "Observaciones",
        "Dia Presentación",
        "Hora Presentación",
        "Aula Presentación",
        "Procesar",
    ];

    return {
        renderTemasLibres,
        handleProcesarTemaLibre,
        handleGuardarTrabajo,
        selectedValue,
        handleChange,
        formData,
        REVISION_ESTADOS,
        formatAutores,
        handleVolver,
        tableItems,
        listaVocales,
        REVISION_ESTADOS,
        handleTableFilter,
        filtrarTrabajos,
        userData
    };
};
