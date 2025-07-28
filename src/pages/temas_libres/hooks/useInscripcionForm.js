import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setInscripcionTemasLibres } from "../../../services/firebase.services";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { getUserById } from "../../../services/firebase.services";
import { uploadPdf } from "../../../services/firebase.services";

export const useInscripcionForm = () => {

    const EVENT_ID_2025 = "3lZN9Pf5Jvdgc3GX4h2e";

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
    const [file, setFile] = useState(null);

    // Otros hooks
    const [captchaValue, setCaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});
    const { user } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.uid) return;
            // setShowSpinner(true);
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



    // Metodo handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "presentaPremio") {
            setFormData({
                ...formData,
                [name]: !formData.presentaPremio,
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
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
            if (!file) throw new Error("No se proporcionó ningún archivo");

            const pdfUrl = await uploadPdf(file, EVENT_ID_2025);
            respuesta.status = true;
            respuesta.data = pdfUrl;
        } catch (error) {
            console.error("Error al subir el PDF:", error);
            respuesta.error = error.message;
        } finally {
            return respuesta;
        }
    };


    // Metodo handleCaptchaChange
    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };


    // Metodo handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            // Validamos el Captcha suspendido
            // if (!captchaValue) {
            //     throw new Error("Debe completar el Captcha");
            // }

            //Upload Abstract PDF
            if (file) {
                const resUpdloadAbstract = await handleUpload();

                if (resUpdloadAbstract.status) {
                    const abstractUrl = resUpdloadAbstract.data
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
            console.log("Inscripción exitosa")
        } catch (error) {
            console.log(`ERROR: Submit ${error}`)
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
        handleFileChange
    }
}