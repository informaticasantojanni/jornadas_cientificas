import React, { useState } from "react";
import { useLogin } from "./useLogin";
import { signOut } from "../../../services/firebase.services";
import Swal from "sweetalert2";

export const useSignUpForm = () => {
  const {
    signUpEmail,
    isRegistered,
    setIsRegistered,
    showPassword,
    togglePasswordVisibility,
  } = useLogin();

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
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      if (captchaValue) {
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
      } else {
        Swal.fire({
          title: `Debe completar el captcha!`,
          background: "#FAFAFA",
          color: "#025951",
          iconColor: "#DC143C",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#038C7F",
        });
      }
    } else {
      setErrors(formErrors);
      console.log("Errors");
    }
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.name) {
      formErrors.name = "Nombre es requerido";
    }
    if (!formData.lastName) {
      formErrors.lastName = "Apellido es requerido";
    }
    if (!formData.cell) {
      formErrors.dni = "DNI es requerido";
    }
    if (!formData.cell) {
      formErrors.cell = "Celular es requerido";
    }

    if (!formData.email) {
      formErrors.email = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }

    if (!formData.servicio) {
      formErrors.servicio = "Servicio es requerido";
    }

    if (!formData.category) {
      formErrors.category = "Categoría es requerido";
    }

    if (!formData.password) {
      formErrors.password = "Contraseña es requerida";
    } else if (formData.password.length < 6) {
      formErrors.password = "La contraseña debe tener al menos 6 caracteres";
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
