import {
  getAllUsers,
  getRegistration,
} from "../../../services/firebase.services";
import { useRegistration } from "./useRegistration";

export const useReports = () => {
  const generateReport = async () => {
    const urlFetchAPI =
      "https://script.google.com/macros/s/AKfycbzsxURPEfQ1XYdYWEKU9iv4xhL1PFl_NBFJVVkMiV0vQwiHxgvFarKvrqbPl9lI9Kcz4g/exec";
    const EVENT_ID = "ZbclMy93Cs9jzEYAgVui";

    try {
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
      console.log("Error generating report:", error);
    }
  };

  return {
    generateReport,
  };
};
