export const useProcessTL = () => {

    const listaVocales = [
        { id: "35baD7Y3sLY6GKtLSddI4b16lgb2", label: "Dra. Karina Ramirez Echarry" },
        { id: "2", label: "Dra. Carla López Baltare" },
        { id: "xFTls1l0r0PqTwG7HZJklOvb3px2", label: "Dr. Federico Labanca" },
        { id: "CRIgr4TPWTNYqzBpiV7oKiS30562", label: "Dra. Jimena Figoni" },
        { id: "R5zEhFu7QOYQzF2GJaz5tLLJTb02", label: "Dra. Alejandra Greco" },
        { id: "6", label: "Dra. Verónica Alonso" },
        { id: "7", label: "Dr. Gonzalo Frutos" },
        { id: "rCd1MjBMddRfbNNKV2PmwKimlRG2", label: "Dr. Guillermo Parisi" },
        { id: "9", label: "Dr. Javier Castillo" },
        { id: "e4PMm8E3uOUxzJ3vLDkMLCPjqRJ3", label: "Dr. Erica Mux" },
        { id: "11", label: "Dra. Ana Camporini" },
        { id: "g1hyEXFpzgFJkp0Ln2KWX3jONt1", label: "Dra. Valeria Bertaza" },
        { id: "13", label: "Dr. Gastón Gómez" },
        { id: "14", label: "Lic. Mauro Andreu" },
        { id: "v6gKF0ccfjh3vXtPVy9aKT3p0dJ3", label: "Lic. Florencia Gregorio" },
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