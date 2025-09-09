import {
  getAllUsers,
  getRegistration,
} from "../../../services/firebase.services";
import { useRegistration } from "./useRegistration";
import { getTemasLibres } from "../../../services/firebase.services";
import { useTemasLibres } from "./useTemasLibres";

export const useReports = () => {
  const EVENT_ID = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025
const {setGeneratingReportTemasLibres} = useTemasLibres();

  // Hook de registro para obtener la función getRegistration
  const generateReport = async () => {
    const urlFetchAPI =
      "https://script.google.com/macros/s/AKfycbzsxURPEfQ1XYdYWEKU9iv4xhL1PFl_NBFJVVkMiV0vQwiHxgvFarKvrqbPl9lI9Kcz4g/exec";

    try {
      console.log("Generating report...");
      const users = await getAllUsers();
      const usersRegistration = [];
      for (const user of users) {
        const registrationResponse = await getRegistration(EVENT_ID, user.id);
        if (registrationResponse.data) {
          usersRegistration.push({
            ...user,
            registro: "inscripto",
            pago: registrationResponse.data.payment, // Adds the payment data
          });
        } else {
          usersRegistration.push({
            ...user,
            registro: "pending",
            pago: "pending", // Adds the payment data
          });
        }
      }

      console.log(usersRegistration);

      // Send data to Google Script
      const response = await fetch(urlFetchAPI, {
        method: "POST",
        redirect: "follow",
        dataType: "json",
        accepts: "application/json",
        body: JSON.stringify(usersRegistration),
      });

      // Handle the response from the Google Apps Script endpoint
      const responseObject = await response.json();
      console.log("Response status: ", responseObject);
    } catch (error) {
      console.log("Error generando reporte de Registracion/Pago:", error);
    }
  };

  const generateReportTemasLibres = async () => {
    const urlFetchAPI =
      "https://script.google.com/macros/s/AKfycbyNRWWt61kwoedc9600F67w1JfYDeqqCSvdWGpSuZ72nzMnm-05A-OkBfHwNJhy0t2EyA/exec";

    setGeneratingReportTemasLibres(true);
    try {
      console.log("Leyendo Temas Libres de Firebase...");
      // Llamar al servicio para obtener los temas libres
      const temasLibresResponse = await getTemasLibres(EVENT_ID); // Asegúrate de definir esta función
      if (!temasLibresResponse.status) {
        throw new Error(
          "Error leyendo temas libres: ",
          temasLibresResponse.error
        );
      } else {
        console.log("Enviando datos a Google Scripts...", temasLibresResponse.data);
        // Send data to Google Script
        const response = await fetch(urlFetchAPI, {
          method: "POST",
          redirect: "follow",
          dataType: "json",
          accepts: "application/json",
          body: JSON.stringify(temasLibresResponse.data),
        });

        // Handle the response from the Google Apps Script endpoint
        const responseObject = await response.json();
        console.log("Respuesta de Google Scripts: ", responseObject);

      }
    } catch (error) {
      console.error("Error generando Reportes de Temas Libres: ", error);
    } finally {
      setGeneratingReportTemasLibres(false);
    }
  };

  return {
    generateReport,
    generateReportTemasLibres
  };
};
