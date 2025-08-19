export const useProcessTL = () => {

    const listaVocales = [
        { id: "1", label: "Dra. Karina Ramirez Echarry" },
        { id: "2", label: "Dra. Carla López Baltare" },
        { id: "3", label: "Dr. Federico Labanca" },
        { id: "4", label: "Dra. Jimena Figoni" },
        { id: "5", label: "Dra. Alejandra Greco" },
        { id: "6", label: "Dra. Verónica Alonso" },
        { id: "7", label: "Dr. Gonzalo Frutos" },
        { id: "8", label: "Dr. Guillermo Parisi" },
        { id: "9", label: "Dr. Javier Castillo" },
        { id: "10", label: "Dr. Erica Mux" },
        { id: "11", label: "Dra. Ana Camporini" },
        { id: "12", label: "Dra. Valeria Bertaza" },
        { id: "13", label: "Dr. Gastón Gómez" },
        { id: "14", label: "Lic. Mauro Andreu" },
        { id: "15", label: "Lic. Florencia Gregorio" },
        { id: "16", label: "Dra. Dafne López" },
        { id: "17", label: "Lic. Débora Vílchez" },
        { id: "18", label: "Dra. Elizabeth Sanguinetti" },
        { id: "19", label: "Dra. Paola Villán" },
        { id: "0BbZc9DUYDeprIUWRKErlDF7CQu1", label: "TEST JPR" }
    ];

    const estadosRevision = [
        { id: 1, label: "Pendiente" },
        { id: 2, label: "Aceptado" },
        { id: 3, label: "Observado" },
        { id: 4, label: "Rechazado" }
    ];

    return {
        listaVocales,
        estadosRevision
    }
}