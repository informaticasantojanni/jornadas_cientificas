import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setInscripcionTemasLibres } from "../../../services/firebase.services";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { getUserById } from "../../../services/firebase.services";

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
        lugar: "",
        abstract: "",
        contactoNombre: "",
        contactoApellido: "",
        contactoCelular: "",
        contactoEmail: ""
    });

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


    // Metodo handleCaptchaChange
    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };


    // Metodo handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (!captchaValue) {
                throw new Error("Debe completar el Captcha");
            }
            formData.id = uuidv4(); // Generar un ID único para la inscripción
            // LLAMAR A FUNCION QUE INSERTA EN EL DOCUMENTO
            const respuesta = await setInscripcionTemasLibres(EVENT_ID_2025, formData);
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
        handleDeleteAutor
    }
}