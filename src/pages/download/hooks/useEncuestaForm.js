import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { useGlobal } from "../../../hooks/useGlobal";
import { setEncuestaJornadas } from "../../../services/firebase.services";

export const OPCIONES_CALIFICACION = [
    "Excelente",
    "Muy bueno",
    "Bueno",
    "Regular",
    "Malo",
    "No asistió",
];

export const PREGUNTAS_SELECCION = [
    {
        name: "participacion",
        label: "Participó como",
        opciones: {
            asistente: "Asistente",
            expositor: "Expositor",
        },
    },
    {
        name: "categoria",
        label: "¿A qué categoría pertenece?",
        opciones: {
            bioquimico: "Bioquímico/a",
            estudiante: "Estudiante",
            enfermero: "Enfermero/a",
            farmaceutico: "Farmacéutico/a",
            kinesiologo: "Kinesiologo/a",
            medico: "Médico/a",
            residente: "Residente",
            trabajador_social: "Trabajador/a Social",
            otros: "Otros profesionales",
        },
    },
];

export const PREGUNTAS_CALIFICACION = [
    { name: "temasLibres", label: "Opinión con respecto a la actividad Temas Libres" },
    { name: "conferencias", label: "Opinión con respecto a Conferencias" },
    { name: "mesasRedondas", label: "Opinión con respecto a Mesas Redondas" },
    { name: "actoCierre", label: "Opinión con respecto al acto de cierre / entrega de premios" },
    { name: "residentesTalleres", label: "Opinión sobre las actividades de residentes / talleres" },
];

export const PREGUNTAS_ABIERTAS = [
    { name: "loMejor", label: "Lo mejor de las jornadas" },
    { name: "loPeor", label: "Lo peor de las jornadas" },
    { name: "sugerencias", label: "¿Qué modificaría o incorporaría como actividad en las Jornadas Científicas?" },
];

const TEXTO_MAX_CARACTERES = 1000;

const initialFormData = {
    participacion: "",
    categoria: "",
    temasLibres: "",
    conferencias: "",
    mesasRedondas: "",
    actoCierre: "",
    residentesTalleres: "",
    loMejor: "",
    loPeor: "",
    sugerencias: "",
};

const swalBase = {
    background: "#FAFAFA",
    color: "#025951",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#038C7F",
};

export const useEncuestaForm = ({ onSuccess }) => {
    const { setShowSpinner, EVENT_ID } = useGlobal();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validate = () => {
        const formErrors = {};

        PREGUNTAS_SELECCION.forEach(({ name, opciones }) => {
            if (!Object.keys(opciones).includes(formData[name])) {
                formErrors[name] = "Seleccione una opción";
            }
        });

        PREGUNTAS_CALIFICACION.forEach(({ name }) => {
            if (!OPCIONES_CALIFICACION.includes(formData[name])) {
                formErrors[name] = "Seleccione una opción";
            }
        });

        PREGUNTAS_ABIERTAS.forEach(({ name }) => {
            if (formData[name].length > TEXTO_MAX_CARACTERES) {
                formErrors[name] = `Máximo ${TEXTO_MAX_CARACTERES} caracteres`;
            }
        });

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            Swal.fire({
                ...swalBase,
                title: "Atención",
                text: "Debe responder todas las preguntas obligatorias.",
                icon: "warning",
                iconColor: "#FFC107",
            });
            return;
        }

        setShowSpinner(true);
        try {
            const encuesta = {
                id: uuidv4(),
                ...Object.fromEntries(
                    Object.entries(formData).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
                ),
                fecha: new Date().toISOString(),
            };

            const respuesta = await setEncuestaJornadas(EVENT_ID, encuesta);
            if (!respuesta.status) {
                throw new Error("No se pudo guardar la encuesta: " + respuesta.error);
            }

            setFormData(initialFormData);
            await Swal.fire({
                ...swalBase,
                title: "¡Gracias!",
                text: "Su encuesta fue enviada. Ya puede descargar su certificado.",
                icon: "success",
                iconColor: "#025951",
            });
            onSuccess?.();
        } catch (error) {
            Swal.fire({
                ...swalBase,
                title: "Error",
                text: `${error.message || error}`,
                icon: "error",
                iconColor: "#DC143C",
            });
        } finally {
            setShowSpinner(false);
        }
    };

    return { formData, errors, handleChange, handleSubmit, TEXTO_MAX_CARACTERES };
};
