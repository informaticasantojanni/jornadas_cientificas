const urlFetchAPI =
  "https://script.google.com/macros/s/AKfycby7UEKG0qsW81lVPB8Cx7rG96bGSqW9lsS5GQdKZTXLwh-0XJCUtnUOJQB0mwJtgI4FPA/exec";
//   Link Spreadsheet https://docs.google.com/spreadsheets/d/1i7ULoXCjNaLVKFfaDxGUTUZEXzhI9trsJPiaJYO5Ndc/edit?gid=0#gid=0
//santojanni.jornadas@gmail.com

export const sendEmailActions = {
  registration: "registration",
  payment: "payment",
  recepcion_temas_libres: "recepcion_temas_libres",
}

// Authentication Functions
export const sendEmail = async (action, userData) => {

  // Preparamos un objeto con los datos del usuario y la accion
  const fetchData = {
    userData: userData,
    action: action,
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
  const objectResponse = await jsonResponse.json();

  // Preparamos la respuesta para el componente que lo llama
  const response = {
    sendEmailStatus: false,
    sendEmailError: null,
  };

  if (objectResponse.status) {
    response.sendEmailStatus = true;
  } else {
    response.sendEmailError = objectResponse.error;
  }

  return response;

};

