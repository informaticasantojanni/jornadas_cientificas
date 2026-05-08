import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmail,
  signUpWithEmail,
  saveUserInDB,
  recoverPassword
} from "../../../services/firebase.services";
import Swal from "sweetalert2";
import { getUserById } from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";

import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../../core/config/firebase.config.js";


const functions = getFunctions(app);
const recoverPasswordByDni = httpsCallable(functions, "recoverPasswordByDni");


export const useLogin = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  /**
   * signUpEmail recibo el formData y ejecuta dos acciones:
   * 1. crea el user en firebase
   * 2. crea el user en firestore
   */
  const signUpEmail = async (formData) => {
    const response = {
      status: null,
      error: null,
      data: null,
    };

    try {
      //Creamos el user en Firebase
      const responseSignUp = await signUpWithEmail(
        formData.email,
        formData.password
      );
      // console.log("Registration response: ", responseSignUp.user);

      const user = { ...formData, role: "user" };
      const responseSaveUserInDB = await saveUserInDB(
        responseSignUp.user.uid,
        user
      );
      // console.log("Save user in DB response: ", responseSaveUserInDB);
      if (responseSaveUserInDB.status) {
        response.status = true;
        response.data = responseSignUp.user.email;
      } else {
        response.status = false;
        response.error = responseSaveUserInDB.error;
      }
    } catch (error) {
      // console.log("Registration error: ", error);
      response.status = false;
      response.error = error;
    }
    return response;
  };

  const signInEmail = async (event) => {
    event.preventDefault();

    try {
      const form = new FormData(event.target);
      const { email, password } = Object.fromEntries(form.entries());
      const response = await signInWithEmail(email, password);

      Swal.fire({
        title: `Bienvenido ${response.user.email} !`,
        background: "#FAFAFA",
        color: "#025951",
        iconColor: "#025951",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#038C7F",
      });
      navigate("/perfil");
    } catch (error) {
      console.log(error.code);
      let customMessage;
      switch (error.code) {
        case "auth/invalid-credential":
          customMessage =
            "Las credenciales son incorrectas. Por favor revise email y contraseña.";
          break;
        case "auth/user-not-found":
          customMessage =
            "No se ha encontrado ninguna cuenta con este email. Por favor revise el email o registrese.";
          break;
        case "auth/wrong-password":
          customMessage =
            "La contraseña es incorrecta. Por favor revisela e intente nuevamente.";
          break;
        default:
          customMessage =
            "Ha ocurrido un error. Por favor intentelo más tarde nuevamente.";
      }
      Swal.fire({
        title: `${customMessage}`,
        background: "#FAFAFA",
        color: "#025951",
        iconColor: "#DC143C",
        icon: "error",
        width: "36em",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#038C7F",
      });
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const form = new FormData(event.target);
      const { dni } = Object.fromEntries(form.entries());
      // Aqui incluimos el codigo para recuperar el email a partir del dni, y luego ejecutar la función recoverPassword con el email recuperado

      const res = await recoverPasswordByDni({
        dni: dni
      });

      if (res.data.ok) {
        await Swal.fire({
          title: `Email enviado`,
          text: res.data.message,
          background: "#FAFAFA",
          color: "#025951",
          iconColor: "#DC143C",
          icon: "success",
          width: "36em",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#038C7F",
        });

        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: `Ups, algo salió mail`,
        text: { error },
        background: "#FAFAFA",
        color: "#025951",
        iconColor: "#DC143C",
        icon: "error",
        width: "36em",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#038C7F",
      });

    } finally {
      setLoading(false);
    }
  }

  return {
    isRegistered,
    setIsRegistered,
    signUpEmail,
    signInEmail,
    showPassword,
    togglePasswordVisibility,
    resetPassword,
    loading
  };
};
