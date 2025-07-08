import React, { useState } from "react";

export const useInscripcionForm = () => {

    // hook state declaration
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

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    const [errors, setErrors] = useState({});

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    return {
        handleChange,
        handleSubmit,
        formData,
        errors,
        handleCaptchaChange
    }
}