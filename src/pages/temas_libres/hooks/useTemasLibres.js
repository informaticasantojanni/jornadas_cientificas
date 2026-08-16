import { useState, useEffect } from "react";
import {
  getTemasLibres,
  getTemasLibresById,
  getUserById,
  getAllUsers,
} from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";
import { updateTrabajo } from "../../../services/firebase.services";
import Swal from "sweetalert2";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { uploadPdf } from "../../../services/firebase.services";

export const useTemasLibres = (userData) => {
  const {
    setShowSpinner,
    internalView,
    setInternalView,
    processTrabajoId,
    setProcessTrabajoId,
    ROLES,
    EVENT_ID
  } = useGlobal();

  //const eventId = "3lZN9Pf5Jvdgc3GX4h2e"; //eventId Jornadas 2025
  const [renderTemasLibres, setRenderTemasLibres] = useState([]);
  const [listaTemasLibres, setListaTemasLibres] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    serviciosList: [],
    autoresList: [],
    abstractUrl: "",
    abstractRevisionUrlList: [],
    vocalAsignado: "",
    vocalRevision: "",
    vocalRevisionObservaciones: "",
    contactoNombre: "",
    contactoApellido: "",
    contactoEmail: "",
    presentacionDia: "",
    presentacionHora: "",
    presentacionAula: "",
    trabajoEvaluacion: "",
    trabajoEvaluacionObservaciones: "",
  });
  const [selectedValue, setSelectedValue] = useState("");
  const [listaVocales, setListaVocales] = useState([]);
  const [serviciosEnListaTemasLibres, setServiciosEnListaTemasLibres] =
    useState([]);
  const [filtrarTrabajos, setFiltrarTrabajos] = useState({
    query: "",
    servicio: "",
    pendientesAsignacion: false,
    pendientesRevision: false,
  });
  const [abstractFile, setAbstractFile] = useState(null);
  const [generatingReportTemasLibres, setGeneratingReportTemasLibres] = useState(false);
  const urlFetchAPI =
    "https://script.google.com/macros/s/AKfycby7UEKG0qsW81lVPB8Cx7rG96bGSqW9lsS5GQdKZTXLwh-0XJCUtnUOJQB0mwJtgI4FPA/exec";
    
  const REVISION_ESTADOS = [
    { id: 1, label: "Pendiente" },
    { id: 2, label: "Aceptado" },
    { id: 3, label: "Observado" },
    { id: 4, label: "Rechazado" },
  ];

  // const EVENT_ID_2025 = "3lZN9Pf5Jvdgc3GX4h2e";

  useEffect(() => {
    const fetchVocales = async () => {
      try {
        const usersResponse = await getAllUsers();
        const usersVocales = usersResponse.filter((user) =>
          user.role.includes("temasLibresVocal")
        );
        const vocales = usersVocales.map((vocal) => {
          return {
            id: vocal.id,
            label: toTitleCase(vocal.name) + " " + toTitleCase(vocal.lastName),
          };
        });
        vocales.sort((a, b) => a.label.localeCompare(b.label));
        setListaVocales(vocales);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchVocales();
  }, []);

  useEffect(() => {
    // userData todavía no terminó de cargar (useProfile es async)
    if (!userData?.role) return;

    const fetchTemasLibres = async () => {
      setShowSpinner(true);
      try {
        // Llamar al servicio para obtener los temas libres
        const temasLibresResponse = await getTemasLibres(EVENT_ID); // Asegúrate de definir esta función
        if (!temasLibresResponse.status) {
          throw new Error(
            "Error leyendo temas libres: ",
            temasLibresResponse.error
          );
        } else {
          if (
            userData?.role == "temasLibresPresidente" ||
            userData?.role == "temasLibresComite"
          ) {
            setRenderTemasLibres(temasLibresResponse.data);
            setListaTemasLibres(temasLibresResponse.data);
          } else if (userData?.role == "temasLibresVocal") {
            setRenderTemasLibres(
              temasLibresResponse.data.filter(
                (trabajo) => trabajo.vocalAsignado == userData.id
              )
            );
          } else if (userData?.role == "user") {
            temasLibresResponse.data.forEach(async (trabajo) => {
              trabajo.vocalAsignado = "-";
            });
            setRenderTemasLibres(
              temasLibresResponse.data.filter(
                (trabajo) => trabajo.contactoEmail === userData.email
              )
            );
          }
          const allServicios = temasLibresResponse.data.flatMap(
            (trabajo) => trabajo.serviciosList || []
          );
          setServiciosEnListaTemasLibres(
            Array.from(new Set(allServicios)).sort((a, b) => a.localeCompare(b))
          );
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setShowSpinner(false);
      }
    };

    fetchTemasLibres();
  }, [userData?.role, userData?.id, userData?.email, EVENT_ID]);

  useEffect(() => {
    const fetchTrabajo = async () => {
      if (!processTrabajoId) return;
      setShowSpinner(true);
      try {
        const trabajoResponse = await getTemasLibresById(
          EVENT_ID,
          processTrabajoId
        );
        if (!trabajoResponse.status) {
          console.error(
            "Error fetching tema libre by ID: ",
            trabajoResponse.error
          );
          return;
        } else {
          const trabajo = trabajoResponse.data;
          setFormData({
            titulo: trabajo?.titulo ?? "",
            autoresList: trabajo?.autoresList ?? "",
            serviciosList: trabajo?.serviciosList ?? "",
            abstractUrl: trabajo?.abstractUrl ?? "",
            abstractRevisionUrlList: trabajo?.abstractRevisionUrlList ?? [],
            vocalAsignado: trabajo?.vocalAsignado ?? "",
            vocalRevision: trabajo?.vocalRevision ?? "",
            vocalRevisionObservaciones:
              trabajo?.vocalRevisionObservaciones ?? "",
            contactoNombre: trabajo?.contactoNombre ?? "",
            contactoApellido: trabajo?.contactoApellido ?? "",
            contactoEmail: trabajo?.contactoEmail ?? "",
            presentacionDia: trabajo?.presentacionDia ?? "",
            presentacionHora: trabajo?.presentacionHora ?? "",
            presentacionAula: trabajo?.presentacionAula ?? "",
            trabajoEvaluacion: trabajo?.trabajoEvaluacion ?? "",
            trabajoEvaluacionObservaciones:
              trabajo?.trabajoEvaluacionObservaciones ?? "",
          });
          setInternalView("procesarTemasLibres");
        }
      } catch (error) {
        console.log("Unable to retrieve user data");
      } finally {
        setShowSpinner(false);
      }
    };
    fetchTrabajo();
  }, [processTrabajoId]);

  // Función para normalizar y eliminar tildes
  const normalizeText = (text) => {
    return text
      .normalize("NFD") // separa los caracteres base de los diacríticos
      .replace(/[\u0300-\u036f]/g, "") // elimina los diacríticos
      .toLowerCase();
  };

  useEffect(() => {
    const filterTemasLibres = () => {
      const query = normalizeText(filtrarTrabajos.query);

      let filtered = listaTemasLibres.filter(
        (tema) =>
          normalizeText(tema.titulo).includes(query) ||
          (Array.isArray(tema.autoresList) &&
            tema.autoresList.some((autor) =>
              normalizeText(autor).includes(query)
            )) ||
          (Array.isArray(tema.serviciosList) &&
            tema.serviciosList.some((servicio) =>
              normalizeText(servicio).includes(query)
            )) ||
          normalizeText(tema.contactoNombre).includes(query) ||
          normalizeText(tema.contactoApellido).includes(query) ||
          normalizeText(tema.contactoEmail).includes(query) ||
          normalizeText(tema.contactoCelular).includes(query)
      );

      filtered = filtered.filter(
        (tema) =>
          Array.isArray(tema.serviciosList) &&
          tema.serviciosList.some((servicio) =>
            servicio.includes(filtrarTrabajos.servicio)
          )
      );

      if (filtrarTrabajos.pendientesAsignacion) {
        filtered = filtered.filter(
          (tema) => !tema.vocalAsignado || tema.vocalAsignado === ""
        );
      }

      if (filtrarTrabajos.pendientesRevision) {
        filtered = filtered.filter(
          (tema) => !tema.vocalRevision || tema.vocalRevision === ""
        );
      }

      setRenderTemasLibres(filtered);
    };

    filterTemasLibres();
  }, [
    filtrarTrabajos.query,
    filtrarTrabajos.pendientesAsignacion,
    filtrarTrabajos.pendientesRevision,
    filtrarTrabajos.servicio,
  ]);

  const handleProcesarTemaLibre = async (id) => {
    setProcessTrabajoId(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGuardarTrabajo = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    let error = "";
    let userInput = null;
    let formDataProcesado = {
      ...formData,
    };
    console.log("Form Data: ", formDataProcesado);

    // TO DO:
    // Antes de guardar agregar un pop de confirmación

    try {
      //Si adjuntaron Abstract Revision guardarlo en el Storage
      if (abstractFile) {
        const resUploadAbstract = await handleUpload(abstractFile);
        if (resUploadAbstract.status) {
          formDataProcesado = {
            ...formDataProcesado,
            abstractRevisionUrlList: [
              ...(Array.isArray(formDataProcesado.abstractRevisionUrlList)
                ? formDataProcesado.abstractRevisionUrlList
                : []),
              resUploadAbstract.data, // 👉 nueva URL
            ],
          };
        } else {
          throw new Error(resUploadAbstract.error);
        }
      }

      const updateTrabajoresponse = await updateTrabajo(
        EVENT_ID,
        processTrabajoId,
        formDataProcesado
      );
      if (!updateTrabajoresponse.status) {
        error = updateTrabajoresponse.error;
        throw new Error(error);
      }

      // const enviarEmailResponse = await enviarEmailRevisionTemasLibres();
      // if (!enviarEmailResponse.status) {
      //   error = enviarEmailResponse.error;
      //   throw new Error(error);
      // }
    } catch (e) {
      error = e;
      console.error("Error saving trabajo: ", error);
    } finally {
      setShowSpinner(false);
      // Después del clic en "Aceptar", recargar la página
      userInput = await Swal.fire({
        title: error == "" ? "Cambio exitoso!" : "Error",
        text: error == "" ? `Se han actualizado los datos del trabajo.` : error,
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
      if (userInput.isConfirmed) {
        window.location.reload();
      }
    }
  };

  const formatAutores = (arr, n = 3, maxLen = 30) => {
    if (!Array.isArray(arr)) return "-";
    // función corta para truncar texto
    const truncate = (str) =>
      str.length > maxLen ? str.slice(0, maxLen) + "…" : str;
    const sliced = arr.slice(0, n).map(truncate);
    return arr.length > n
      ? sliced.join(", ") + ` y ${arr.length - n} más`
      : arr.map(truncate).join(", ");
  };

  const sliceString = (str, n = 30) => {
    if (typeof str !== "string") return "-";
    return str.length > n ? str.slice(0, n) + "…" : str;
  };

  const handleVolver = () => {
    setInternalView("temasLibres");
    setProcessTrabajoId("");
  };

  const handleTableFilter = (e) => {
    const { name, type, checked, value } = e.target;
    setFiltrarTrabajos((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleResetFilter = (e) => {
    console.log("Reset")
    setFiltrarTrabajos((prev) => ({
      ...prev,
      query: "",
      servicio: "",
      pendientesAsignacion: false,
      pendientesRevision: false,
    }));
  };

  const enviarEmailRevisionTemasLibres = async () => {
    console.log("Form Data desde enviar email: ", formData);
    const response = { status: true, error: "" };

    // Step 1: Create a new object to avoid modifying the original formData
    // and set the vocalRevision property correctly.
    // formateamos tambien 
    const userDataPrep = {
      ...formData,
      vocalRevision:
        REVISION_ESTADOS.find((estado) => estado.id == formData.vocalRevision)
          ?.label || "",
      presentacionDia:
        PRESENTACION_DIAS.find((item) => item.id == formData.presentacionDia)
          ?.label || "",
      presentacionHora:
        PRESENTACION_HORARIOS.find((item) => item.id == formData.presentacionHora)
          ?.label || "",
      presentacionAula:
        PRESENTACION_AULAS.find((item) => item.id == formData.presentacionAula)
          ?.label || "",
    };

    // Step 2: Create the fetchData object using the prepared data
    const fetchData = {
      userData: userDataPrep,
      action: "revision_temas_libres",
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
        response.status = true;
      } else {
        response.status = false;
        response.error = objectResponse.error;
      }
    } else {
      response.status = false;
      response.error = objectResponse.error;
    }
    return response;
  };

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  /*
      Metodo para actualizar el estado del archivo seleccionado
      */
  const handleAbstractFileChange = (e) => {
    setAbstractFile(e.target.files[0]);
    console.log("Archivo seleccionado:", e.target.files[0]);
  };

  /*
      Metodo para subir un archivo PDF a la carpete asociada al Evento
      Por eso paso como argumento path = EVENT_ID_2025
      */
  const handleUpload = async (uploadFile) => {
    const respuesta = {
      status: false,
      data: null,
      error: null,
    };
    try {
      if (!uploadFile) throw new Error("No se proporcionó ningún archivo");

      const pdfUrl = await uploadPdf(uploadFile, EVENT_ID);
      respuesta.status = true;
      respuesta.data = pdfUrl;
    } catch (error) {
      console.error("Error al subir el PDF:", error);
      respuesta.error = error.message;
    } finally {
      return respuesta;
    }
  };

  const tableItems = [
    "Tipo de trabajo",
    "Título",
    "Servicios",
    "Autores",
    "Link Abstract",
    "Presenta a premio",
    "Link Premio",
    "Lugar de realización",
    "Contacto Nombre",
    "Contacto Apellido",
    "Contacto Email",
    "Contacto Cell",
    "Vocal Asignado",
    "Revisión",
    "Observaciones",
    "Abstracts corregidos",
    "Dia Presentación",
    "Hora Presentación",
    "Aula Presentación",
    "Procesar",
  ];

  const PRESENTACION_DIAS = [
    { id: 1, label: "Lunes - 19/10/2026" },
    { id: 2, label: "Martes - 30/09/2026" },
    { id: 3, label: "Miércoles - 1/10/2026" },
    { id: 4, label: "Jueves - 2/10/2026" },
    { id: 5, label: "Viernes - 3/10/2026" },
  ];

  const PRESENTACION_HORARIOS = [
    { id: 1, label: "08:00 - 09:00" }
  ];

  const PRESENTACION_AULAS = [
    { id: 1, label: "Piso 1 - Aula Obstetricia" },
    { id: 2, label: "Piso 3 - Aula C" },
    { id: 3, label: "Piso 3 - Aula D" },
    { id: 4, label: "Piso 4 - Aula E" },
    { id: 5, label: "Piso 4 - Aula F" },
  ];

  return {
    renderTemasLibres,
    handleProcesarTemaLibre,
    handleGuardarTrabajo,
    selectedValue,
    handleChange,
    formData,
    REVISION_ESTADOS,
    formatAutores,
    sliceString,
    handleVolver,
    tableItems,
    listaVocales,
    REVISION_ESTADOS,
    handleTableFilter,
    filtrarTrabajos,
    userData,
    PRESENTACION_DIAS,
    PRESENTACION_HORARIOS,
    PRESENTACION_AULAS,
    handleAbstractFileChange,
    serviciosEnListaTemasLibres,
    handleResetFilter,
    generatingReportTemasLibres,
    setGeneratingReportTemasLibres
  };
};
