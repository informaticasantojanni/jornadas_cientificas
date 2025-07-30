import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setInscripcionTemasLibres } from "../../../services/firebase.services";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { getUserById } from "../../../services/firebase.services";
import { uploadPdf } from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";
import Swal from "sweetalert2";

export const useInscripcionForm = () => {

    const EVENT_ID_2025 = "3lZN9Pf5Jvdgc3GX4h2e";

    const { showSpinner, setShowSpinner } = useGlobal();

    // Form Data
    const [formData, setFormData] = useState({
        id: "",
        titulo: "",
        servicio: "",
        serviciosList: [],
        autor: "",
        autoresList: [],
        presentaPremio: true,
        contactoNombre: "",
        contactoApellido: "",
        contactoCelular: "",
        contactoEmail: ""
    });

    // Hooks para manejar el archivo PDF
    const [abstractFile, setAbstractFile] = useState(null);
    const [trabajoPremioFile, setTrabajoPremioFile] = useState(null);

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
        setFormData({
            id: "",
            titulo: "",
            servicio: "",
            serviciosList: [],
            autor: "",
            autoresList: [],
            presentaPremio: true,
            lugar: "",
            contactoNombre: "",
            contactoApellido: "",
            contactoCelular: "",
            contactoEmail: ""
        });
        setAbstractFile(null);
        setTrabajoPremioFile(null);
        setCaptchaValue(null);
    };

    // Metodo handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "presentaPremio") {
            setFormData({
                ...formData,
                [name]: !formData.presentaPremio,
            });
            setAbstractFile(null); // Resetea el archivo si cambia la opción de premio
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

    const handleAddAutor = (e) => {
        e.preventDefault();
        const newAutor = formData.autor.trim();

        if (newAutor && !formData.autoresList.includes(newAutor)) {
            setFormData({
                ...formData,
                autoresList: [...formData.autoresList, newAutor],
                autor: "" // se resetea en el mismo setFormData
            });
        }
    };

    const handleDeleteAutor = (e, autorDelete) => {
        e.preventDefault();

        setFormData({
            ...formData,
            autoresList: formData.autoresList.filter(autor => autor !== autorDelete)
        });
    };


    /*
    Metodo para actualizar el estado del archivo seleccionado
    */
    const handleAbstractFileChange = (e) => {
        setAbstractFile(e.target.files[0]);
        console.log("Archivo seleccionado:", e.target.files[0]);
    };

    /*
    Metodo para actualizar el estado del archivo seleccionado
    */
    const handleTrabajoPremioFileChange = (e) => {
        setTrabajoPremioFile(e.target.files[0]);
        console.log("Archivo seleccionado:", e.target.files[0]);
    };

    /*
    Metodo para subir un archivo PDF a la carpete asociada al Evento
    Por eso paso como argumento path = EVENT_ID_2025
    */
    const handleUpload = async () => {
        const respuesta = {
            status: false,
            data: null,
            error: null
        }
        try {
            if (!abstractFilefile) throw new Error("No se proporcionó ningún archivo");

            const pdfUrl = await uploadPdf(abstractFile, EVENT_ID_2025);
            respuesta.status = true;
            respuesta.data = pdfUrl;
        } catch (error) {
            console.error("Error al subir el PDF:", error);
            respuesta.error = error.message;
        } finally {
            return respuesta;
        }
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

        // Autores validation
        if (formData.autoresList.length === 0) {
            formErrors.autores = "Debe agregar al menos un autor";
        }

        // Abstract validation
        if (!abstractFile) {
            formErrors.abstract = "Debe subir un archivo PDF del Abstract";
        }

        // Trabajo a premio validation
        if (formData.presentaPremio && !trabajoPremioFile) {
            formErrors.trabajoPremio = "Debe subir un archivo PDF del Trabajo a Premio";
        }

        // Lugar vallidation
        if (!formData.lugar || formData.lugar.trim() === "") {
            formErrors.lugar = "El lugar es obligatorio";
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

        let abstractUrl = null;
        setShowSpinner(true);
        try {
            // Validamos el Captcha suspendido
            // if (!captchaValue) {
            //     throw new Error("Debe completar el Captcha");
            // }

            // Validamos los campos del formulario
            const isValid = validate();
            if (!isValid) {
                throw new Error("Debe completar todos los campos obligatorios");
            }

            //Upload Abstract PDF
            if (abstractFile) {
                const resUpdloadAbstract = await handleUpload();

                if (resUpdloadAbstract.status) {
                    abstractUrl = resUpdloadAbstract.data
                    console.log("Abstract subido, URL retornada:", abstractUrl);
                } else {
                    throw new Error(resUpdloadAbstract.error);
                }
            } else {
                throw new Error("Debe subir un archivo PDF del Abstract");
            }

            // Generar un ID único para la inscripción
            formData.id = uuidv4();

            // Filtrar campos que no se deben enviar y hacer el submit
            const camposExcluidos = [
                "servicio",
                "autor"
            ];
            const formDataFiltrado = {
                ...Object.fromEntries(
                    Object.entries(formData).filter(([key]) => !camposExcluidos.includes(key))
                ),
                abstractUrl: abstractUrl // o el valor que tengas
            };
            const respuesta = await setInscripcionTemasLibres(EVENT_ID_2025, formDataFiltrado);
            if (!respuesta.status) {
                throw new Error(respuesta.error);
            }

            // Envio exitoso
            console.log("Inscripción exitosa")
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
        handleAddAutor,
        handleDeleteAutor,
        handleAbstractFileChange,
        handleTrabajoPremioFileChange
    }
}