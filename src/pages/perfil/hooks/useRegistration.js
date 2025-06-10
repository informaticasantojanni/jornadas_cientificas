import { useState, useEffect } from "react";
import { useProfile } from "./useProfile";
import {
  getRegistration,
  setRegistration,
  updatePayment,
} from "../../../services/firebase.services";
import Swal from "sweetalert2";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { useGlobal } from "../../../hooks/useGlobal";

export const useRegistration = () => {
  /*******************************************************
   * DECLARACION DE VARIABLES
   *******************************************************/
  const eventId = "ZbclMy93Cs9jzEYAgVui"; //eventId Jornadas 2024
  const [userRegistration, setUserRegistration] = useState(null);
  const [reload, setReload] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { userData } = useProfile(user.uid);
  const { setShowSpinner } = useGlobal();

  //Creo este object hook state para registrar las acciones de useRegistration y generar el reporte final.
  const registrationActions = {
    setRegistrationStatus: false,
    setRegistrationError: null,
    sendEmailStatus: false,
    sendEmailError: null,
  };

  const urlFetchAPI =
    "https://script.google.com/macros/s/AKfycby7UEKG0qsW81lVPB8Cx7rG96bGSqW9lsS5GQdKZTXLwh-0XJCUtnUOJQB0mwJtgI4FPA/exec";
  //   Link Spreadsheet https://docs.google.com/spreadsheets/d/1i7ULoXCjNaLVKFfaDxGUTUZEXzhI9trsJPiaJYO5Ndc/edit?gid=0#gid=0
  //santojanni.jornadas@gmail.com

  /*******************************************************
   * USE_EFFECT
   *******************************************************/
  useEffect(() => {
    const fetchRegistration = async () => {
      if (!user.uid) return;

      try {
        const res = await getRegistration(eventId, user.uid);
        setUserRegistration(res.data);
      } catch (error) {
        console.log("Unable to retrieve user inscription");
      } finally {
      }
    };

    fetchRegistration();
  }, [user.uid, reload]);

  /*******************************************************
   * FUNCIONES
   *******************************************************/
  const handleRegistration = async () => {
    try {
      setIsSubmitting(true);
      setShowSpinner(true);

      const setRegistrationResponse = await setRegistration(eventId, userData);

      if (setRegistrationResponse.status) {
        registrationActions.setRegistrationStatus = true;

        //Si setRegistration fue exitoso, entonces enviamos el email de confirmacion
        const fetchData = {
          userData: userData,
          action: "registration",
        };
        console.log("fetchData is: ", fetchData);
        // Fetch Gmail to send email
        const jsonResponse = await fetch(urlFetchAPI, {
          method: "POST",
          redirect: "follow",
          dataType: "json",
          accepts: "application/json",
          body: JSON.stringify(fetchData),
        });

        // Handle the response from the Google Apps Script endpoint
        const objectResponse = await jsonResponse.json();

        if (objectResponse.status) {
          registrationActions.sendEmailStatus = true;
        } else {
          registrationActions.sendEmailError = objectResponse.error;
        }
      } else {
        console.log(
          "Registration failed with: ",
          setRegistrationResponse.error
        );
        registrationActions.setRegistrationError =
          setRegistrationResponse.error;
      }

      if (
        registrationActions.setRegistrationStatus &&
        registrationActions.sendEmailStatus
      ) {
        Swal.fire({
          title: `Registración exitosa!`,
          html: "<p>Te enviamos un correo electrónico con la confirmación</p><p>Si sos Médico o Residente, recordá pasar por AMM para abonar el arancel</p>",
          background: "#FAFAFA",
          color: "#025951",
          iconColor: "#025951",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#038C7F",
        });
      } else {
        Swal.fire({
          title: `Ups, Algo ha salido mal!`,
          html: `<p>Estado registración: ${
            registrationActions.setRegistrationStatus
              ? "exitoso"
              : registrationActions.setRegistrationError
          }</p>
          <p>Envío de email de confirmación: ${
            registrationActions.sendEmailStatus
              ? "exitoso"
              : registrationActions.sendEmailError
          }</p>
          `,
          background: "#FAFAFA",
          color: "#025951",
          iconColor: "#025951",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#038C7F",
        });
      }
    } catch (error) {
      Swal.fire({
        title: `Ups, Algo ha salido mal!`,
        text: { error },
        background: "#FAFAFA",
        color: "#025951",
        iconColor: "#025951",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#038C7F",
      });
    } finally {
      setIsSubmitting(false);
      setReload(!reload);
      setShowSpinner(false);
    }
  };

  // const handlePayment = async (userId) => {
  //   console.log(
  //     "Registration in progress for user: ",
  //     userId,
  //     "in event ",
  //     eventId
  //   );
  //   const res = await updatePayment(eventId, userId);
  //   res.status
  //     ? console.log("Payment status: ", res.status)
  //     : console.log("Payment failed with: ", res.error);
  //   setReload(!reload);
  // };

  return {
    userRegistration,
    handleRegistration,
    isSubmitting,
  };
};
