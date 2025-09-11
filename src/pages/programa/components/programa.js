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
    time: parseHoraToMinutes("08:00"),
    ubicacion: "AMM",
    descripcion: "Inscripciones",
  },
  {
    categoria: "apertura",
    dia: "29",
    mes: "09",
    hora: "09:00",
    time: parseHoraToMinutes("09:00"),
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
    categoria: "break"
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
    titulo: "Impacto de herramientas informáticas en la seguridad del paciente.",
    orador: "Dr. Ricardo Barcía",
    isStreaming: true,
    linkStreaming: "Pending",
  },
  {
    categoria: "clausura",
    dia: "3",
    hora: "11:30",
    time: parseHoraToMinutes("11:30"),
    ubicacion: "2 Piso Aulas A-B",
    descripcion: "Cierre de Jornadas",
    linkStreaming: "",
  },
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
