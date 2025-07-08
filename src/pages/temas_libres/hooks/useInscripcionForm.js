import { useState } from "react";

export const useInscripcionForm = () => {

    // Form Data
    const [formData, setFormData] = useState({
        titulo: "",
        areaTematica: "",
        autores: "",
        presentaPremio: true,
        lugar: "",
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