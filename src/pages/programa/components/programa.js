const parseHoraToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const programa = [
  {
    categoria: "inscripcion",
    dia: "29",
    mes: "09",
    hora: "08:00",
    time: parseHoraToMinutes("07:00"),
    ubicacion: "AMM",
    descripcion: "Inscripciones",
  },
  {
    categoria: "apertura",
    dia: "29",
    mes: "09",
    hora: "09:00",
    time: parseHoraToMinutes("07:30"),
    ubicacion: "2 Piso Aulas A-B",
    descripcion: "Apertura",
    linkStreaming: "Pending",
  },
  {
    categoria: "vino_de_honor",
    dia: "29",
    mes: "09",
    hora: "12:00",
    time: parseHoraToMinutes("12:00"),
    ubicacion: "2 Piso Aulas A-B",
  },
  {
    dia: "30",
    mes: "09",
    hora: "10:30 - 11:00",
    time: parseHoraToMinutes("10:00"),
    categoria: "break",
  },
  {
    dia: "1",
    mes: "10",
    hora: "10:30 - 11:00",
    time: parseHoraToMinutes("10:30"),
    categoria: "break",
  },
  {
    dia: "2",
    mes: "10",
    hora: "10:30 - 11:00",
    time: parseHoraToMinutes("10:30"),
    categoria: "break",
  },

  {
    categoria: "conferencia",
    dia: "29",
    mes: "09",
    hora: "10:30",
    time: parseHoraToMinutes("10:30"),
    ubicacion: "2 Piso Aulas A-B",
    titulo:
      "Rol del Dpto Quirúrgico Htal Santojanni periodo 1985-2025, utilizando la ciencia para formar, transformar y cuidar la Salud Pública.",
    orador: "Dr. Pedro Fullone",
    isStreaming: true,
    linkStreaming: "Pending",
  },
  {
    categoria: "conferencia",
    dia: "30",
    mes: "09",
    hora: "09:30",
    time: parseHoraToMinutes("9:30"),
    ubicacion: "2 Piso Aulas A-B",
    titulo: "Escenarios Actuales e Intervención en lo Social",
    orador: "Prof. Dr. Alfredo Juan Manuel Carballeda",
    isStreaming: true,
    linkStreaming: "Pending",
  },
  {
    categoria: "conferencia",
    dia: "1",
    mes: "10",
    hora: "09:30",
    time: parseHoraToMinutes("9:30"),
    ubicacion: "2 Piso Aulas A-B",
    titulo:
      "Manejo actual del ACV: desde la guardia a la prevención secundaria",
    orador: "Prof. Dr. Raúl C. Rey",
    isStreaming: true,
    linkStreaming: "Pending",
  },
  {
    categoria: "conferencia",
    dia: "2",
    mes: "10",
    hora: "09:30",
    time: parseHoraToMinutes("9:30"),
    ubicacion: "2 Piso Aulas A-B",
    titulo:
      "Impacto de herramientas informáticas en la seguridad del paciente.",
    orador: "Dr. Ricardo Barcía",
    isStreaming: true,
    linkStreaming: "Pending",
  },
  {
    categoria: "clausura",
    dia: "3",
    hora: "11:45",
    time: parseHoraToMinutes("11:45"),
    titulo: "Entrega premios cultura",
    descripcion: "",
    ubicacion: "Hall Central",
    linkStreaming: "",
  },
  {
    categoria: "clausura",
    dia: "3",
    hora: "12:30",
    time: parseHoraToMinutes("12:30"),
    titulo: "Cierre de Jornadas y entrega de premios científicos",
    descripcion: "",
    ubicacion: "Salon Espacio Naón - Av. Emilio Castro 6463",
    linkStreaming: "",
  },
  {
    categoria: "mesa_redonda",
    dia: "30",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "3 Piso Aula D",
    titulo: "Avances en el Manejo Multidisciplinario del Pie Diabético",
    presidente: {
      nombre: "Dr. Lucas Landolfi",
      servicio: "Servicio de Diabetes",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "Dra. Patricia Del Nero",
          servicio: "Departamento de Urgencias",
        },
      ],
    },
    disertantes: [
      {
        nombre: "",
        servicio: "",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "30",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "3 Piso Aula C",
    titulo:
      "Experiencias de articulación entre equipos de cesac y servicios hospitalarios",
    presidente: {
      nombre: "Dra. Leticia Andina",
      servicio: " Jefa de Servicio CESAC Nro 7",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "Lic. Andrea Berra",
          servicio: "Jefa de Servicio CESAC Nro 5",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Dra. Valeria Barrera",
        servicio: "Jefa de División Laboratorio - Hospital Santojanni",
        tema: "",
      },
      {
        nombre: "Dra. Viviana Mazur",
        servicio:
          "Referente acceso IVE ILE del programa de SSyR - Médica de CESAC Nro 7 - miembro del equipo organizador de la estrategia de rastreo HPV - Ca cervicouterino",
        tema: "",
      },
      {
        nombre: "Dr. Edgardo Bottaro",
        servicio: "Médico infectólogo - Hospital Santojanni",
        tema: "",
      },
      {
        nombre: "Lic. Carla Santomaso",
        servicio: "Socióloga - CESAC 28",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "30",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "4 Piso Aula F",
    titulo:
      "Código rojo: participación multidisciplinaria de una urgencia en sala de partos",
    presidente: {
      nombre: "Dra. Pechini, Silvia",
      servicio: "",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "Dra. Inacio, Analía",
          servicio: "",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Dr. Martinez Soler, Javier",
        servicio: "Obstetricia",
        tema: "",
      },
      {
        nombre: "Dra. Di Biasi, Nancy",
        servicio: "Hemoterapia",
        tema: "",
      },
      {
        nombre: "Dr. Alvarez Vilariño, Federico",
        servicio: "Terapia Intensiva",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "1",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "3 Piso Aula D",
    titulo: "Vapeo y Tabaco: amenazas silenciosas para la Salud Pública",
    presidente: {
      nombre: "Dra. Lucrecia Loprete",
      servicio: "Médica Neumonóloga",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "Dra. Valeria Dávila",
          servicio: "Médica Alergista",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Dra. Cristina Borrajo",
        servicio:
          "Coordinadora de Sección Tabaquismo de la Asociación Argentina de Medicina Respiratoria (AAMR) Tema: “El vapeo y sus riesgos en la población joven”",
        tema: "",
      },
      {
        nombre: "Dra. Sandra Galarza",
        servicio:
          "Coordinadora del Programa de Cesación Tabáquica del Ministerio de Salud de la Ciudad Autónoma de Buenos Aires Tema: “Programa de Cesación Tabáquica del Gobierno de la Ciudad Autónoma de Buenos Aires: nuevos desafíos”",
        tema: "",
      },
      {
        nombre: "Lic. Marta Murray",
        servicio:
          "Miembro del Equipo coordinador del Programa de Cesación Tabáquica del Hospital Santojanni “Mi Fortaleza Siempre”, Jefa de Sección Consultorios Externos, División Servicio Social Tema: “Herramientas no farmacológicas para el tratamiento del tabaquismo: experiencia en el Hospital Santojanni”",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "1",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "3 Piso Aula C",
    titulo: "Protocolo de recuperación postoperatorio optimizado - (ERAS)",
    presidente: {
      nombre: "Gabriela Coulomme",
      servicio: "Cirugía General",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "Maria Laura Morici",
          servicio: " Cirugía general",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Agostina Gentini",
        servicio: "Ginecología",
        tema: "",
      },
      {
        nombre: "Gaston Camejo",
        servicio: "Anestesiología",
        tema: "",
      },
      {
        nombre: "Hubner Escalera Sejas",
        servicio: "Depto de Urgencias",
        tema: "",
      },
      {
        nombre: "Matias Caradonti",
        servicio: "Urología",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "30",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "4 Piso Aula E",
    titulo: "Intervenciones en medicina de estilo de vida saludable",
    presidente: {
      nombre: " Dra. Noemi Susana Guerra",
      servicio: "Médica de planta de clínica médica , Hospital Santojanni",
    },
    secretario: {
      titulo: "Secretario",
      secretarios: [
        {
          nombre: "Dr Gonzalo Barbieri",
          servicio: "Medico de planta de clinica médica - Hospital santojanni",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Dra. Mariana Lozana",
        servicio: "Servicio de cardiología - Hospital Santojanni",
        tema: "",
      },
      {
        nombre: "Lic. María Paula Picarelli",
        servicio: "Servicio de alimentación, Hospital Santojanni",
        tema: "",
      },
      {
        nombre: "Lic. Karina Ogdano",
        servicio: "Servicio de kinesiología - Hospital Santojanni",
        tema: "",
      },
      {
        nombre: "Lic. Nadia Tomasello",
        servicio: "Servicio de Salud Mental, Hospital Santojanni",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "1",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "4 Piso Aula F",
    titulo:
      "Exposiciones invisibles, efectos visibles: ambiente y neurodesarrollo infantojuvenil",
    presidente: {
      nombre: "Dra. Beatriz Lauge",
      servicio: "Pediatría - Hospital de día",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "Lic. Nadia Roussilian",
          servicio: "Trabajo Social",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Dra. Susana González",
        servicio: "Pediatría - Salud Infantojuvenil y ambiente",
        tema: "",
      },
      {
        nombre: "Dra. Sheila Hocsman",
        servicio:
          "Pediatría. Esp. en Neurodesarrollo - Neurodesarrollo en riesgo: el impacto del ambiente en la infancia",
        tema: "",
      },
      {
        nombre: "Dra. Laura Nieto",
        servicio:
          " Pediatría - Consultorio de acompañamiento de infancias diversas - Mil formas de crecer: acompañamiento de niñeces diversas",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "2",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "3 Piso Aula D",
    titulo: "Manejo interdisciplinario de comunicación oroantral",
    presidente: {
      nombre: "Dra. Ayos Mariana",
      servicio: "Otorrinolaringologia",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "Dra. Dimitra Farace Tsardikos",
          servicio: "Otorrinolaringologia",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Dr. Parisi Guillermo",
        servicio: "Odontología",
        tema: "",
      },
      {
        nombre: "Dra. Tapia Lucia",
        servicio: "Otorrinolaringología",
        tema: "",
      },
      {
        nombre: "Dr. Ingratta Christian",
        servicio: "Otorrinolaringología",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "2",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "3 Piso Aula C",
    titulo:
      "Residencias hoy: aprender, cuidar y sostenerse en un sistema en tensión",
    presidente: {
      nombre: " Dra. Geronazzo Veronica",
      servicio: "CODEI",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "",
          servicio: "",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Dr. Pablo Casado",
        servicio:
          "Coordinador general de las residencia médicas con orientación. Situación actual de la residencias medicas en GCABA",
        tema: "",
      },
      {
        nombre: "Dr. Federico Picas",
        servicio:
          "Coordinador general de las residencia médicas con orientación. Situación actual de la residencias medicas en GCABA",
        tema: "",
      },
      {
        nombre: "Dr. Facundo Lombardi",
        servicio:
          "Coordinador local de las residencia médica de Cardiologia. Situación actual de la residencias medicas en Hospital Santojanni",
        tema: "",
      },
      {
        nombre: "Dra. Valeria Garralda",
        servicio:
          "Coordinador local de las residencia quirurgica de Cirugia General. Situación actual de la residencias quirurgicas en Hospital Santojanni",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "2",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "4 Piso Aula F",
    titulo:
      "Enfoque multidisciplinario del Síndrome de ovario poliquístico, para la prevención diagnóstico y tratamiento del riesgo cardiovascular",
    presidente: {
      nombre: "Nicole Alfaro Cazón",
      servicio: "",
    },
    secretario: {
      titulo: "Secretaria",
      secretarios: [
        {
          nombre: "Natalia Jiménez",
          servicio: "",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Dra. González Sandra",
        servicio: "",
        tema: "",
      },
      {
        nombre: "Dr. Cataño Fernando",
        servicio: "",
        tema: "",
      },
      {
        nombre: "Dra. Glassmann Rocio",
        servicio: "",
        tema: "",
      },
      {
        nombre: "Dra. Mendez Jesica",
        servicio: "",
        tema: "",
      },
      {
        nombre: "Dr. Castillo Javier",
        servicio: "",
        tema: "",
      },
    ],
  },
  {
    categoria: "mesa_redonda",
    dia: "2",
    hora: "11:00",
    time: parseHoraToMinutes("11:00"),
    ubicacion: "4 Piso Aula E",
    titulo:
      "Adulto mayor en la internación. desde la evaluación gerontológica hasta el sindrome confusional agudo",
    presidente: {
      nombre: "Dr. Marcelo Katz",
      servicio: "Servicio de Neurología",
    },
    secretario: {
      titulo: "Secretario",
      secretarios: [
        {
          nombre: "Lic. Nadia Tomasello",
          servicio: " Servicio de Salud Mental",
        },
      ],
    },
    disertantes: [
      {
        nombre: "Lic. Gisela Sesa",
        servicio: "Servicio Social",
        tema: "",
      },
      {
        nombre: "Lic. Vanesa Benegas",
        servicio: "Servicio Social",
        tema: "",
      },
      {
        nombre: "Lic. Nadia Bigas",
        servicio: "Servicio de Pediatría",
        tema: "",
      },
      {
        nombre: "Dra. Paula Terraza",
        servicio: "Servicio de Neurología",
        tema: "",
      },
      {
        nombre: "Dra. María Marta Giani",
        servicio: "Guardia de Emergencias (Psiquiatría)",
        tema: "",
      },
    ],
  },
  {
    categoria: "temas_libres",
    dia: "29",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    presidente: "Gustavo Lanosa",
    secretario: "Vanina Recalde",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "29",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula D",
    presidente: "Loreley Toresan",
    secretario: "GUIDO MAURO (UROLOGIA)",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "30",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula E",
    presidente: "Karina Ramirez Echarri",
    secretario: "Luis Pizarro",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "30",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    presidente: "Marina Leal",
    secretario: "Miele Ana",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "30",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula C",
    presidente: "Ana Camporini",
    secretario: "Gisela Sesa",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "30",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula D",
    presidente: "Silvia Pechini",
    secretario: "Rodriguez Yanina (Gineco)",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "1",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula E",
    presidente: "Inacio Analia",
    secretario: "Laura morisi",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "1",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    presidente: "Vendramini Agustina",
    secretario: "Mariana Lozana",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "1",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula C",
    presidente: "Florencia Gregorio",
    secretario: "Cecilia Montenegro",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "1",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula D",
    presidente: "Ochoa",
    secretario: "Fernando Garcia",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "2",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula E",
    presidente: "",
    secretario: "",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "2",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    presidente: "Améstica Guillermina",
    secretario: "Echeverz Maria",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "2",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula C",
    presidente: "Sarabia Eduardo",
    secretario: "Sonia Smodlaka",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "2",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula D",
    presidente: "Liliana Gagliardi",
    secretario: "Aldana Rondinella",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "3",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula E",
    presidente: " Marcelo Katz",
    secretario: "Correa Ruben",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "3",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 4 - Aula F",
    presidente: "Paola Villan",
    secretario: "Dafne Lopez",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "3",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula C",
    presidente: "Castro Candela",
    secretario: "Gentini Agostina",
    trabajos: [],
  },
  {
    categoria: "temas_libres",
    dia: "3",
    hora: "8:00 a 9:00",
    time: parseHoraToMinutes("08:00"),
    ubicacion: "Piso 3 - Aula D",
    presidente: "Silvina Cioccale",
    secretario: "Garcia Ines",
    trabajos: [],
  },
  {
    categoria: "jornadas_residentes",
    dia: "3",
    hora: "09:00",
    time: parseHoraToMinutes("09:00"),
    ubicacion: "Piso 4 - Aula E",
    tema: "Enfermedad de POTT",
    presidente: "Evelyn Carral (Anatomía patológica)",
    secretario: "Analía Dorrego (Infectología)",
    coordinador: "Daniela Rey / Fernanda Aseijas Rubio (Clínica Médica)",
    colaboradores: ["Clínica Médica: Johanna Saldungaray", "Carlos Chaparro, Valera", "Infectología: Alexandra Campos, Paula Menotti, Analia Dorrego", "Neurocirugía: Nicolas Facchin, Sofia Folmer", "Traumatología: Karina Mendez, Agustin Zilliotto", "Anatomía patológica: Evelyn Carral, Agustin Elizondo"],
    presentadores: ["Clínica Médica: Paredes Chaparro Carlos Manuel", "Infectología: Alexandra Campos", "Neurocirugía: Nicolas Facchin", "Traumatología: Agustin Zilliotto", "Anatomía patológica: Evelyn Carral"],
  },
  // {
  //   categoria: "jornadas_residentes",
  //   dia: "3",
  //   hora: "09:00",
  //   time: parseHoraToMinutes("09:00"),
  //   ubicacion: "Piso 4 - Aula F",
  //   tema: "Anticoagulación en situaciones especiales (SAF, TEP, trombosis seno cavernoso)",
  //   presidente: "",
  //   coordinador: "",
  //   disertantes: [""],
  // },
  // {
  //   categoria: "jornadas_residentes",
  //   dia: "3",
  //   hora: "09:00",
  //   time: parseHoraToMinutes("09:00"),
  //   ubicacion: "Piso 3 - Aula D",
  //   tema: "Mesa escaras",
  //   presidente: "",
  //   coordinador: "",
  //   disertantes: [""],
  // },
  // {
  //   categoria: "jornadas_residentes",
  //   dia: "3",
  //   hora: "10:00",
  //   time: parseHoraToMinutes("10:00"),
  //   ubicacion: "Piso 2 - Aulas A-B",
  //   tema: "Taller RCP",
  //   presidente: "",
  //   coordinador: "",
  //   disertantes: [""],
  // },
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
ubicacion:
titulo:
presidente: "",
secretario: {
    titulo: "",
    secretarios: [{
                nombre: "",
                servicio: ""}]
                },
disertantes: [{
                nombre: "",
                servicio: "",
                tema: ""}]

}

 */
