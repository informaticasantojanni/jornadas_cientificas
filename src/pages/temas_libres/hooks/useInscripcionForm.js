import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setInscripcionTemasLibres } from "../../../services/firebase.services";

export const useInscripcionForm = () => {

    const EVENT_ID_2025 = "3lZN9Pf5Jvdgc3GX4h2e";

    // Form Data
    const [formData, setFormData] = useState({
        id: "",
        titulo: "",
        areaTematica: "",
        autores: "",
        presentaPremio: true,
        lugar: "",
        abstract: "",
        contactoNombre: "",
        contactoCelular: "",
        contactoEmail: ""
    });

    // Otros hooks
    const [captchaValue, setCaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});


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
        handleCaptchaChange
    }
}