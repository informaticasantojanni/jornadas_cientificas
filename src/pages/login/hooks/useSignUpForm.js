import React, { useState } from "react";
import { useLogin } from "./useLogin";
import { signOut } from "../../../services/firebase.services";
import Swal from "sweetalert2";
import { useGlobal } from "../../../hooks/useGlobal";

export const useSignUpForm = () => {
  const {
    signUpEmail,
    isRegistered,
    setIsRegistered,
    showPassword,
    togglePasswordVisibility,
  } = useLogin();

  const { showSpinner, setShowSpinner } = useGlobal();

  // hook state declaration
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dni: "",
    cell: "",
    email: "",
    servicio: "",
    category: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formErrors = validate();
      if (Object.keys(formErrors).length != 0) {
        throw new Error("Hay campos vacios");
      }

      if (!captchaValue) {
        throw new Error("Debe completar el Captcha");
      }

      setShowSpinner(true);
      const responseSignUpEmail = await signUpEmail(formData);

      if (responseSignUpEmail.status) {
        const userInput = await Swal.fire({
          title: "Atención!",
          text: `Usuario creado exitosamente. Inicie sesión con su e-mail y contraseña para completar el registro desde su perfil`,
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

        signOut();
        window.location.href = window.location.href;
        // console.log("isRegister states is: ", isRegistered);
      } else {
        const userInput = await Swal.fire({
          title: `Ha habido un error al crear el usuario: ${responseSignUpEmail.error} !`,
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
        window.location.href = window.location.href;
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
  };

  const validate = () => {
    let formErrors = {};
    let cleanedData = { ...formData };

    // Name validation
    if (!formData.name || !formData.name.trim()) {
      formErrors.name = "Nombre es requerido";
    } else {
      cleanedData.name = formData.name.trim();
    }

    // Last name validation
    if (!formData.lastName || !formData.lastName.trim()) {
      formErrors.lastName = "Apellido es requerido";
    } else {
      cleanedData.lastName = formData.lastName.trim();
    }

    // DNI validation
    if (!formData.dni || !formData.dni.trim()) {
      formErrors.dni = "DNI es requerido";
    } else {
      const clearDni = formData.dni.replace(/[.\-\s]/g, "");
      cleanedData.dni = clearDni;
    }

    // Cell phone validation
    if (!formData.cell || !formData.cell.trim()) {
      formErrors.cell = "Celular es requerido";
    } else {
      const clearCell = formData.cell.replace(/[.\-\s]/g, "");
      cleanedData.cell = clearCell;
    }

    // Email validation
    if (!formData.email || !formData.email.trim()) {
      formErrors.email = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      formErrors.email = "Email es inválido";
    } else {
      cleanedData.email = formData.email.trim();
    }

    // Servicio validation
    if (!formData.servicio || !formData.servicio.trim()) {
      formErrors.servicio = "Servicio es requerido";
    }

    // Category validation
    if (!formData.category || !formData.category.trim()) {
      formErrors.category = "Categoría es requerido";
    }

    // Password validation
    if (!formData.password || !formData.password.trim()) {
      formErrors.password = "Contraseña es requerida";
    } else if (formData.password.length < 6) {
      formErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }else{
      cleanedData.password = formData.password.trim()
    }

    // Set errors and return them
    setErrors(formErrors);

    // If no errors, update formData with cleaned values
    if (Object.keys(formErrors).length === 0) {
      setFormData(cleanedData);
    }

    return formErrors;
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleCaptchaChange,
  };
};
