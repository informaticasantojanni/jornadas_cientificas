const parseHoraToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const programa = [
  {
    categoria: "inscripcion",
    dia: "19",
    mes: "10",
    hora: "08:00",
    time: parseHoraToMinutes("07:00"),
    ubicacion: "AMM",
    descripcion: "Inscripciones",
  },
  {
    categoria: "apertura",
    dia: "19",
    mes: "10",
    hora: "08:30",
    time: parseHoraToMinutes("09:00"),
    ubicacion: "2 Piso Aulas A-B",
    descripcion: "Apertura",
    linkStreaming: "",
  },
  {
    categoria: "vino_de_honor",
    dia: "19",
    mes: "10",
    hora: "12:00",
    time: parseHoraToMinutes("12:00"),
    ubicacion: "2 Piso Aulas A-B",
  },
  {
    dia: "19",
    mes: "10",
    hora: "10:00 - 10:30",
    time: parseHoraToMinutes("10:00"),
    categoria: "break",
  },
  {
    dia: "20",
    mes: "10",
    hora: "10:30 - 11:00",
    time: parseHoraToMinutes("10:30"),
    categoria: "break",
  },
  {
    dia: "21",
    mes: "10",
    hora: "10:30 - 11:00",
    time: parseHoraToMinutes("10:30"),
    categoria: "break",
  },

  {
    categoria: "conferencia",
    dia: "19",
    mes: "10",
    hora: "10:30",
    time: parseHoraToMinutes("10:30"),
    ubicacion: "2 Piso Aulas A-B",
    titulo:
      "Médicos Liderando",
    orador: "Dr. Ruben Kevorkian",
    isStreaming: false,
    linkStreaming: "Pending",
  },
  {
    categoria: "conferencia",
    dia: "20",
    mes: "10",
    hora: "09:30",
    time: parseHoraToMinutes("9:30"),
    ubicacion: "2 Piso Aulas A-B",
    titulo: "La historia nos da la razón: breve repaso de los hechos científicos",
    orador: "Dr. Juan Manuel Carballeda",
    isStreaming: false,
    linkStreaming: "",
  },
  {
    categoria: "conferencia",
    dia: "21",
    mes: "10",
    hora: "09:30",
    time: parseHoraToMinutes("9:30"),
    ubicacion: "2 Piso Aulas A-B",
    titulo:
      "Consumos problemáticos en el personal de salud",
    orador: "Dr. Carlos Damin",
    isStreaming: true,
    linkStreaming: "Pending",
  },
  {
    categoria: "conferencia",
    dia: "22",
    mes: "10",
    hora: "09:30",
    time: parseHoraToMinutes("9:30"),
    ubicacion: "2 Piso Aulas A-B",
    titulo:
      "Incorporación de la IA a la práctica médica: un desafío epistemológico serio",
    orador: "Dr. Carlos Regazzoni",
    isStreaming: true,
    linkStreaming: "Pending",
  },
  {
    categoria: "clausura",
    dia: "23",
    hora: "12:00",
    time: parseHoraToMinutes("12:00"),
    titulo: "Entrega premios cultura",
    descripcion: "",
    ubicacion: "Espacio Naon - Av. Emilio Castro 6463",
    linkStreaming: "",
  },
  {
    categoria: "clausura",
    dia: "23",
    hora: "12:00",
    time: parseHoraToMinutes("12:00"),
    titulo: "Cierre de Jornadas y entrega de premios científicos",
    descripcion: "",
    ubicacion: "Espacio Naon - Av. Emilio Castro 6463",
    linkStreaming: "",
  },
  {
    categoria: "mesa_redonda",
    dia: "20",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "3 Piso Aula C",
    titulo: "ACV agudo: de la puerta a la reperfusión Decisiones críticas y trabajo interdisciplinario",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Sabra Ahmad",
      secretario: "Rodriguez, Cristofer",
      panelistas: ["Otero, Silvia", "Santangelo, Pablo", "Manjarin, Pablo"],
    },
    serviciosList: ["Terapia Intensiva | Neurocirugía | Neurología | Dto. Urgencias | Diagnóstico por Imágenes"],
    auspiciante: { nombre: "", logo: "" },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "21",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "3 Piso Aula C",
    titulo: "Amiloidosis. Una enfermedad tratable, poco sospechada",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Katz, Marcelo",
      secretario: "Galli, Cintia",
      panelistas: ["Yufra, Analia", "Alba, Rocio", "Calandra, Cristian"],
    },
    serviciosList: ["Neurología | Cardiología | Nefrología"],
    auspiciante: { nombre: "Laboratorio  Medison Pharma", logo: `public/images/colaboradores/medison.png` },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "22",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "3 Piso Aula C",
    titulo: "Continuidad que protege: Manejo perinatal y metabólico de la persona con diabetes pregestacional y gestacional durante el embarazo y la etapa posparto. Avances tecnológicos",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Landolfi, Lucas",
      secretario: "Fiore, Eduardo",
      panelistas: ["Poli, Juana", "Gomez, Julia", "Gamarra Quispe, Ines"],
    },
    serviciosList: ["Diabetologia | Obstetricia"],
    auspiciante: { nombre: "", logo: "" },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "22",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "3 Piso Aula D",
    titulo: "Desafios del Neurodesarrollo: especificidades de cada nivel ",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Andina, Leticia",
      secretario: "Berra, Andrea",
      panelistas: ["Pasarin, Silvia", "Capo, Noelia", "Lopez, Marcela"],
    },
    serviciosList: ["Dto. Área Programática"],
    auspiciante: { nombre: "", logo: "" },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "20",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "3 Piso Aula D",
    titulo: "Efectos del uso excesivo de pantallas en niños y adolescentes",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Pasarin, Silvina",
      secretario: "Hocsman, Sheila",
      panelistas: ["Segovia, Claudia", "Casado, Daniela", ""],
    },
    serviciosList: ["Pediatría"],
    auspiciante: { nombre: "", logo: "" },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "21",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "3 Piso Aula D",
    titulo: "Interdisciplina en alergia alimentaria: Del Paradigma de la exclusión a la introducción temprana de alérgenos",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Méndez, Vanesa",
      secretario: "Lagrange, Tatiana",
      panelistas: ["Repetto, Rocio", "Giacco, Mónica", "Maone, Alicia"],
    },
    serviciosList: ["Alergia | Pediatría | Gastroenterología | Nutrición"],
    auspiciante: { nombre: "", logo: "" },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "22",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "4 Piso Aula E",
    titulo: "Nuevos Paradigmas en Climaterio. Más allá de los sofocos: Trastornos del Sueño y la Memoria",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Pesado, Analia",
      secretario: "Katz, Marcelo",
      panelistas: ["Terraza, Paula", "Mangone, Carlos", "Rolando, Candela"],
    },
    serviciosList: ["Ginecología | Neurología"],
    auspiciante: { nombre: "", logo: "public/images/colaboradores/laboratorio_4.jpg" },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "21",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "4 Piso Aula E",
    titulo: "Sepsis intrahospitalaria: reconocer, actuar y escalar. Hacia un circuito institucional de detección precoz y respuesta",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Alvarez Vilariño, Federico",
      secretario: "Citrate, Noelia",
      panelistas: ["Errea Sylvia", "Daher, Adonis", "Morici, Laura", "Facchin, Nicolás", "Prado Eduardo"],
    },
    serviciosList: ["Terapia Intensiva | Infectologia | División Clínica Médica | Enfermería | Cirugía | Neurocirugía | Ginecología | Obstetricia | Dto. Urgencias"],
    auspiciante: { nombre: "", logo: "" },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "20",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "4 Piso Aula E",
    titulo: "Tratamiento y seguimiento interdisciplinario del paciente pediátrico con tuberculosis: un desafío para todo el equipo de salud. ",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Alejandra, Greco",
      secretario: "Montenegro, Cecilia",
      panelistas: ["Caccavo, Juliana", "Lopez, María Belén", "Schwarzbach, Verónica"],
    },
    serviciosList: ["Pediatría | Infectologia | Kinesiología"],
    auspiciante: { nombre: "", logo: "" },  // logo: ruta al png
  },
  {
    categoria: "mesa_redonda",
    dia: "20",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    aula: "4 Piso Aula F",
    titulo: "UN PACIENTE, MÚLTIPLES DISPOSITIVOS: EL DESAFÍO INTERDISCIPLINARIO ANTE LA PSICOSIS Y EL CONSUMO DE SUSTANCIAS",
    aporteEsperado: "",              // url del PDF
    integrantesList: {
      presidente: "Bertazza, Valeria",
      secretario: "Torres, Mariana",
      panelistas: ["Vigorito, Giuliana", "Vasquez, Vanesa", "Garcia, Cecilia"],
    },
    serviciosList: ["Salud Mental "],
    auspiciante: { nombre: "", logo: "" },  // logo: ruta al png
  },
  {
    categoria: "temas_libres",
    dia: "20",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula E",
    presidente: "Natalizia, Romina (cirugía percutanea)",
    secretario: "Enríquez, Daniel (cirugía percutanea) ",
    temaMesa: "Urgencias quirúrgicas y trauma abdominal",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "20",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    presidente: "Isabel  Reynoso ( Hematologia)",
    secretario: "Daniela Rey ( CM)",
    temaMesa: "Paciente crítico: infecciones, tóxicos y rabdomiólisis",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "20",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula C",
    presidente: "n/a",
    secretario: "Lederhos Nicolas",
    temaMesa: "Laboratorio, inflamación e infecciones: del recién nacido al adulto",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "20",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula D",
    presidente: "Pombo, Alejandra (trabajo social)",
    secretario: "Marina bustinduy",
    temaMesa: "Salud mental y adolescencias: riesgo suicida, autolesiones y cuidados",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "20",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 5 - Aula 5to",
    presidente: "n/a",
    secretario: "Fernández Nerina",
    temaMesa: "Accesos vasculares, riesgo cardiovascular y pie diabético",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "20",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 1 - Aula Obstetricia",
    presidente: "Filoso, Julieta (tocoginecología)",
    secretario: "n/a",
    temaMesa: "Urología y endourología",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "20",
    hora: "10:30 a 11:30",
    time: parseHoraToMinutes("10:30"),
    ubicacion: "Piso 5 - Aula 5to",
    presidente: "Agustin Diosmedi (Oncologia)",
    secretario: "Mariana Colugnat (cardiologia) ",
    temaMesa: "Nutrición, vitamina D, metabolismo y anemia",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "21",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula E",
    presidente: "Tito Ramos Mejía, Luis (hematología)",
    secretario: "Glantz, Dana (infectología)",
    temaMesa: "VIH, ITS, vacunación del adulto y prevención: del hospital al primer nivel",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "21",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    presidente: "Coulomme, Gabriela  (cirugía )",
    secretario: "Ortega, Luis (cirugía percutanea)",
    temaMesa: "Hígado, vía biliar y bazo: cirugía, laparoscopía y percutáneo",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "21",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula C",
    presidente: "Saldungaray, Johann (clínica médica)",
    secretario: "n/a",
    temaMesa: "Embarazo de riesgo: obstetricia, terapia, hematología y neonato",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "21",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula D",
    presidente: "Iris Salvati (kinesiología)",
    secretario: "Gonzalo Rodríguez D'Aversa (kinesiología)",
    temaMesa: "Rehabilitación, función y dolor",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "21",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 5 - Aula 5to",
    presidente: "Folmer, Sofia (neurocirugía)",
    secretario: "n/a",
    temaMesa: "Innovación, gestión y acceso: IA, consultorios y reumatología",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "21",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 1 - Aula Obstetricia",
    presidente: "n/a",
    secretario: "n/a",
    temaMesa: "Lactancia, control prenatal y primera infancia",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "21",
    hora: "10:30 a 11:30",
    time: parseHoraToMinutes("10:30"),
    ubicacion: "Piso 5 - Aula 5to",
    presidente: "Marcelo Parra ( c. Plástica)",
    secretario: "Guendjian, Ivana (cirugía)",
    temaMesa: "Tumores digestivos y de piel: diagnóstico y cirugía",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "22",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula E",
    presidente: "Lic. Florencia Gregorio (trabajo social)",
    secretario: "Suta, Oscar (cirugía percutanea)",
    temaMesa: "Tuberculosis, infecciones respiratorias y acceso al diagnóstico",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "22",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    presidente: "n/a",
    secretario: "n/a",
    temaMesa: "Neumococo, virus respiratorios y vacunas: del niño al personal de salud",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "22",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula C",
    presidente: "Sanguinetti, Elizabeth (hematología)",
    secretario: "Croccita, Carla (cirugía)",
    temaMesa: "Riñón y sangre: calcio, gammapatía, PRES y anticoagulación",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "22",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula D",
    presidente: "Oviedo, Silvana (pediatría-Jefa de Guardia)",
    secretario: "n/a",
    temaMesa: "Pediatría: diagnósticos desafiantes, alergia y vínculo",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "22",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 5 - Aula 5to",
    presidente: "n/a",
    secretario: "n/a",
    temaMesa: "Calidad, seguridad del paciente y laboratorio",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "22",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 1 - Aula Obstetricia",
    presidente: "n/a",
    secretario: "Ferra, Andrea (cirugía percutanea)",
    temaMesa: "Salud de la mujer: urgencias, IVE, anticoncepción y oncología",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "22",
    hora: "08:00 a 09:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 5 - Aula Neuro",
    presidente: "Facchin, Nicolas (neurocirugía)",
    secretario: "Rodriguez, Juan Pablo (terapia intensiva)",
    temaMesa: "Neuro: quirófano, terapia intensiva y procuración",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "22",
    hora: "10:30 a 11:30",
    time: parseHoraToMinutes("10:30"),
    ubicacion: "Piso 5 - Aula 5to",
    presidente: "Kischinefsky, Verónica (cirugía)",
    secretario: "Ramírez, Karina (cirugía)",
    temaMesa: "Cabeza, cuello, vía aérea y tórax",
    trabajos: [],
  },
  {
    categoria: "jornadas_residentes",
    dia: "23",
    hora: "08:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    tema: "Mesa ACV",
    presidente: "",
    secretario: "",
    coordinador: "",
    colaboradores: [""],
    presentadores: [""],
  },
  {
    categoria: "jornadas_residentes",
    dia: "23",
    hora: "08:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula C",
    tema: "Abdomen Agudo",
    presidente: "",
    secretario: "",
    coordinador: "",
    colaboradores: [""],
    presentadores: [""],
  },
  {
    categoria: "jornadas_residentes",
    dia: "23",
    hora: "09:00",
    time: parseHoraToMinutes("09:00"),
    ubicacion: "Piso 2 - Aulas A-B",
    tema: "Taller manejo de politrauma",
    presidente: "",
    secretario: "",
    coordinador: "",
    colaboradores: [""],
    presentadores: [""],
  },
  {
    categoria: "jornadas_residentes",
    dia: "3",
    hora: "10:00",
    time: parseHoraToMinutes("10:00"),
    ubicacion: "Piso 2 - Aulas A-B",
    tema: "Taller de Rehabilitación Cardiopulmonar",
    presidente: "",
    secretario: "",
    coordinador: "",
    colaboradores: [""],
    presentadores: [""],
    isStreaming: true,
    linkStreaming: "",
  },
  {
    categoria: "jornadas_residentes",
    dia: "23",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "Piso 2 - Aulas C-D",
    tema: "Taller de Sutura",
    presidente: "",
    secretario: "",
    coordinador: "",
    colaboradores: [""],
    presentadores: [""],
  },
  {
    categoria: "jornadas_residentes",
    dia: "23",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "Piso 4 - Aula F",
    tema: "ETS",
    presidente: "",
    secretario: "",
    coordinador: "",
    colaboradores: [""],
    presentadores: [""],
  },
  {
    categoria: "jornadas_residentes",
    dia: "23",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "Piso 3 - Aula D",
    tema: "Insuficiencia Cardíaca",
    presidente: "",
    secretario: "",
    coordinador: "",
    colaboradores: [""],
    presentadores: [""],
  },



  // {
  //   categoria: "jornadas_residentes",
  //   dia: "3",
  //   hora: "11:00",
  //   time: parseHoraToMinutes("10:00"),
  //   ubicacion: "Piso 4 - Aula F",
  //   tema: "Anticoagulación en el paciente quirúrgico",
  //   presidente: "",
  //   coordinador: "",
  //   disertantes: [""],
  // },
  // {
  //   categoria: "jornadas_residentes",
  //   dia: "3",
  //   hora: "11:00",
  //   time: parseHoraToMinutes("10:00"),
  //   ubicacion: "Piso 3 - Aula D",
  //   tema: "SINDROME CARDIORRENAL",
  //   presidente: "",
  //   coordinador: "",
  //   disertantes: [""],
  // },

];

/**

inscripcion_card
{
categoria: "inscripcion",
dia:
hora: 
ubicacion:
descripcion:
} 

****************************
apertura
{
categoria: "apertura",
dia:
hora: 
ubicacion:
descripcion:
}

****************************
conferencia
{
categoria: "conferencia"
dia:
hora: 
ubicacion:
titulo:
orador:
}

***************************
vino_honor
{
categoria: "vino_de_honor"
dia:
hora: 
ubicacion:
}

***************************
temas_libres
{
categoria: "temas_libres"
dia:
hora: 
ubicacion: 
discutidores:
secretaria:
trabajos: [
            {titulo,
            abstract}]

}

***************************
trabajos_premio
{
}

***************************
break
{
categoria: "break"
hora: }

****************************
mesa_redonda
{
categoria: "mesa_redonda"
dia:
hora:
time: parseHoraToMinutes(hora)
aula:
titulo:
aporteEsperado: "",   // url del PDF (se descarga igual que los abstracts)
integrantesList: {
                presidente: "",
                secretario: "",
                panelistas: ["", "", ""]},
serviciosList: [""],   // se puede agrupar en un string separado por "|"
auspiciante: {
                nombre: "",
                logo: ""}   // ruta al png, ej: "/images/auspiciantes/logo.png"

}

 */
