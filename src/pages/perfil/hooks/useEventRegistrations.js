import { useEffect, useState } from "react";
import {
  getEventRegistrationsWithUserData,
  updatePayment,
  getUserById,
  getUserByDni,
  getUserRegistrationByDni,
} from "../../../services/firebase.services";
import Swal from "sweetalert2";
import { useGlobal } from "../../../hooks/useGlobal";

export const useEventRegistrations = (searchDni) => {
  /*******************************************************
   * DECLARACION DE VARIABLES
   *******************************************************/
  const [renderUsers, setRenderUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showSpinner, setShowSpinner } = useGlobal();
  const [refreshTable, setRefreshTable] = useState(true);

  //Creo este object hook state para registrar las acciones de useRegistration y generar el reporte final.
  const paymentActions = {
    setPaymentStatus: false,
    setPaymentError: null,
    sendEmailStatus: false,
    sendEmailError: null,
  };

  const eventId = "ZbclMy93Cs9jzEYAgVui";
  const urlFetchAPI =
    "https://script.google.com/macros/s/AKfycby7UEKG0qsW81lVPB8Cx7rG96bGSqW9lsS5GQdKZTXLwh-0XJCUtnUOJQB0mwJtgI4FPA/exec";
  //   Link Spreadsheet https://docs.google.com/spreadsheets/d/1i7ULoXCjNaLVKFfaDxGUTUZEXzhI9trsJPiaJYO5Ndc/edit?gid=0#gid=0
  //santojanni.jornadas@gmail.com

  //Reestablecer la página a 0 en la paginación cuando cambia el eventID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Call the service that returns userData + userRegistration
        if (searchDni) {
          setShowSpinner(true);
          const userResponse = await getUserRegistrationByDni(
            eventId,
            searchDni
          );

          if (userResponse && userResponse.status) {
            console.log(userResponse.data); // Check the retrieved data
            setRenderUsers(userResponse.data); // Update renderUsers
          } else {
            console.error(userResponse.error); // Log error if there's an issue
          }
        }
      } catch (error) {
        console.error("An error occurred while fetching user data: ", error);
      } finally {
        setShowSpinner(false);
      }
    };

    // Call the asynchronous function inside useEffect
    fetchUserData();
  }, [searchDni, refreshTable]); // Add dependencies to trigger re-fetch

  const handlePaymentStatusChange = async (userId) => {
    const result = await Swal.fire({
      title: "Confirmar Pago",
      text: "¿Deseas confirmar el pago para este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
      background: "#FAFAFA",
      color: "#025951",
      iconColor: "#025951",
      width: "36em",
      confirmButtonColor: "#038C7F",
      cancelButtonColor: "#d33",
    });

    /**
    Si el user presiona el boton confirmButtonText del Sweatalert:
    1. se actualiza el registro en la DB
    2. se actualiza el hook registrations
    3. se buscan los datos del usuario en la DB
    4. se envía un correo electrónico
     */
    if (result.isConfirmed) {
      setShowSpinner(true); //dispara el spinner

      /* 1. actualizamos el registro en la DB
      updatePayment tiene validacion retorna un objeto response
      */
      const updatePaymentResponse = await updatePayment(eventId, userId);

      if (updatePaymentResponse.status) {
        setRefreshTable(!refreshTable);

        paymentActions.setPaymentStatus = true;
        /*
        2. obtenemos los datos del usuario
        3. enviamos el mail de confirmación */
        try {
          //Llamo a la funcion getUserId de firebase.services que retorna id, data
          const userDataResponse = await getUserById(userId);
          console.log("Payment user data is_ ", userDataResponse);

          //armo el objeto para enviar el email
          const fetchData = {
            userData: userDataResponse,
            action: "payment",
          };

          // Fetch Gmail to send email
          const jsonResponse = await fetch(urlFetchAPI, {
            method: "POST",
            redirect: "follow",
            dataType: "json",
            accepts: "application/json",
            body: JSON.stringify(fetchData),
          });

          // Handle the response from the Google Apps Script endpoint
          if (jsonResponse.ok) {
            const objectResponse = await jsonResponse.json();

            // Handle the response from the Google Apps Script App
            if (objectResponse.status) {
              paymentActions.sendEmailStatus = true;
            } else {
              paymentActions.sendEmailError = objectResponse.error;
            }
          } else {
            paymentActions.sendEmailError =
              "Error al procesar el envío del email";
          }
        } catch (error) {
          paymentActions.sendEmailError = error;
        } finally {
          setShowSpinner(false);
        }
      } else {
        paymentActions.setPaymentError = updatePaymentResponse.error;
      }

      if (paymentActions.setPaymentStatus && paymentActions.sendEmailStatus) {
        Swal.fire({
          title: "¡Pago confirmado!",
          html: "<p>Pago registrado exitosamente</p><p>Se ha enviado un correo de confirmación</p>",
          icon: "success",
          background: "#FAFAFA",
          color: "#025951",
          iconColor: "#025951",
          width: "36em",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#038C7F",
        });
      } else {
        Swal.fire({
          title: `Ups, Algo ha salido mal!`,
          html: `<p>Estado de pago: ${
            paymentActions.setPaymentStatus
              ? "exitoso"
              : paymentActions.setPaymentError
          }</p>
          <p>Envío de email de confirmación: ${
            paymentActions.sendEmailStatus
              ? "exitoso"
              : paymentActions.sendEmailError
          }</p>
          `,
          icon: "error",
          background: "#FAFAFA",
          color: "#025951",
          iconColor: "#d33",
          width: "36em",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#d33",
        });
      }

      setShowSpinner(false);
    }
  };

  return {
    renderUsers,
    handlePaymentStatusChange,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  };
};
