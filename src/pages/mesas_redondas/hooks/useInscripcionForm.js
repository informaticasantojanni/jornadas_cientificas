import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setInscripcionTemasLibres } from "../../../services/firebase.services";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { getUserById } from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";
import Swal from "sweetalert2";
import { sendEmail, sendEmailActions } from "../../../services/gmail.services";

export const ROLES_INTEGRANTE = ["Presidente", "Secretario", "Panelista"];

const FUNDAMENTACION_MAX_PALABRAS = 300;
const PANELISTAS_MIN = 2;
const PANELISTAS_MAX = 3;

export const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
};

const initialFormData = {
    id: "",
    titulo: "",
    servicio: "",
    serviciosList: [],
    fundamentacion: "",
    objetivoGeneral: "",
    aporteEsperado: "",
    integranteNombre: "",
    integranteApellido: "",
    integranteRol: "",
    integrantesList: [],
    aceptaReglamento: false,
    contactoNombre: "",
    contactoApellido: "",
    contactoCelular: "",
    contactoEmail: ""
};

export const useInscripcionForm = () => {
    const { showSpinner, setShowSpinner, EVENT_ID } = useGlobal();

    // Form Data
    const [formData, setFormData] = useState(initialFormData);

    // Otros hooks
    const [captchaValue, setCaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});
    const { user } = useAuth();


    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.uid) return;
            setShowSpinner(true);
            try {
                const res = await getUserById(user.uid);
                setFormData({
                    ...formData,
                    contactoNombre: res?.name || "",
                    contactoApellido: res?.lastName || "",
                    contactoCelular: res?.cell || "",
                    contactoEmail: res?.email || "",
                });
            } catch (error) {
                console.log("Unable to retrieve user data");
            } finally {
                setShowSpinner(false);
            }
        };

        fetchUserData();
    }, [user]);


    const resetFormData = () => {
        setFormData(initialFormData);
        setCaptchaValue(null);
    };

    // Metodo handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "aceptaReglamento") {
            setFormData({
                ...formData,
                aceptaReglamento: !formData.aceptaReglamento
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleAddService = (e) => {
        e.preventDefault();
        const newService = formData.servicio.trim();

        if (newService && !formData.serviciosList.includes(newService)) {
            setFormData({
                ...formData,
                serviciosList: [...formData.serviciosList, newService],
                servicio: "" // se resetea en el mismo setFormData
            });
        }
    };

    const handleDeleteService = (e, servicio) => {
        e.preventDefault();

        setFormData({
            ...formData,
            serviciosList: formData.serviciosList.filter(service => service !== servicio)
        });
    };

    const handleAddIntegrante = (e) => {
        e.preventDefault();

        const nombre = formData.integranteNombre.trim();
        const apellido = formData.integranteApellido.trim();
        const rol = formData.integranteRol;

        if (!nombre || !apellido || !rol) {
            alert("Complete nombre, apellido y rol del integrante.");
            return;
        }

        const panelistasCount = formData.integrantesList.filter(i => i.rol === "Panelista").length;
        if (rol === "Panelista" && panelistasCount >= PANELISTAS_MAX) {
            alert(`Ya se alcanzó el máximo de ${PANELISTAS_MAX} panelistas.`);
            return;
        }

        setFormData({
            ...formData,
            integrantesList: [...formData.integrantesList, { nombre, apellido, rol }],
            integranteNombre: "",
            integranteApellido: "",
            integranteRol: ""
        });
    };

    const handleDeleteIntegrante = (e, index) => {
        e.preventDefault();

        setFormData({
            ...formData,
            integrantesList: formData.integrantesList.filter((_, i) => i !== index)
        });
    };


    const validate = () => {
        let formErrors = {};

        // Titulo validation
        if (!formData.titulo || formData.titulo.trim() === "") {
            formErrors.titulo = "El título es obligatorio";
        }

        // Servicios validation
        if (formData.serviciosList.length === 0) {
            formErrors.servicios = "Debe agregar al menos un servicio";
        }

        // Fundamentacion validation
        if (!formData.fundamentacion || formData.fundamentacion.trim() === "") {
            formErrors.fundamentacion = "La fundamentación es obligatoria";
        } else if (countWords(formData.fundamentacion) > FUNDAMENTACION_MAX_PALABRAS) {
            formErrors.fundamentacion = `La fundamentación no puede superar las ${FUNDAMENTACION_MAX_PALABRAS} palabras`;
        }

        // Objetivo general validation
        if (!formData.objetivoGeneral || formData.objetivoGeneral.trim() === "") {
            formErrors.objetivoGeneral = "El objetivo general es obligatorio";
        }

        // Aporte esperado validation
        if (!formData.aporteEsperado || formData.aporteEsperado.trim() === "") {
            formErrors.aporteEsperado = "Debe indicar el aporte esperado para los asistentes";
        }

        // Integrantes validation
        const panelistasCount = formData.integrantesList.filter(i => i.rol === "Panelista").length;
        if (panelistasCount < PANELISTAS_MIN || panelistasCount > PANELISTAS_MAX) {
            formErrors.integrantes = `Debe agregar entre ${PANELISTAS_MIN} y ${PANELISTAS_MAX} panelistas`;
        }

        // Reglamento validation
        if (!formData.aceptaReglamento) {
            formErrors.aceptaReglamento = "Debe aceptar el reglamento para continuar";
        }

        // Set errors and return them
        setErrors(formErrors);
        console.log("Errores de validación:", formErrors);

        // If no errors, update formData with cleaned values
        if (Object.keys(formErrors).length === 0) {
            return true
        } else {
            return false;
        }

    }


    // Metodo handleCaptchaChange
    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };


    // Metodo handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault()

        setShowSpinner(true);
        try {
            // Validamos el Captcha suspendido
            if (!captchaValue) {
                throw new Error("Debe completar el Captcha");
            }

            // Validamos los campos del formulario
            const isValid = validate();
            if (!isValid) {
                throw new Error("Debe completar todos los campos obligatorios");
            }

            // Generar un ID único para la inscripción
            formData.id = uuidv4();

            // Filtrar campos que no se deben enviar y hacer el submit
            const camposExcluidos = [
                "servicio",
                "integranteNombre",
                "integranteApellido",
                "integranteRol"
            ];

            const formDataFiltrado = Object.fromEntries(
                Object.entries(formData).filter(([key]) => !camposExcluidos.includes(key))
            );

            const respuesta = await setInscripcionTemasLibres(EVENT_ID, formDataFiltrado);
            if (!respuesta.status) {
                throw new Error(respuesta.error);
            }

            // Envio exitoso
            console.log("Inscripción exitosa")

            // Enviar email de confirmación
            const sendEmailResponse = await sendEmail(sendEmailActions.recepcion_temas_libres, formDataFiltrado)
            if (!sendEmailResponse.sendEmailStatus) {
                throw new Error(sendEmailResponse.sendEmailError || "Error al enviar el email de confirmación");
            }

            resetFormData();
            const userInput = await Swal.fire({
                title: "Envío exitoso!",
                text: `Hemos recibido su inscripción. En breve nos pondremos en contacto con usted.`,
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

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `${error} !`,
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

        } finally {
            setShowSpinner(false);
        }
    }


    // Retornos
    return {
        handleChange,
        handleSubmit,
        formData,
        errors,
        handleCaptchaChange,
        handleAddService,
        handleDeleteService,
        handleAddIntegrante,
        handleDeleteIntegrante
    }
}
