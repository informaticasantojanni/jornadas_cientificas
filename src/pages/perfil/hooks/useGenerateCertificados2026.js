import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import fontkit from "@pdf-lib/fontkit";

export const useGenerateCertificados2026 = () => {
  const fechaActual = new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  
  const generatePDF = async (userData) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 400;
    const fullName = userData.name + " " + userData.lastName;

    const text = `Por cuanto: ${fullName} ha participado como "Asistente" en las XL Jornadas Científicas del Hospital Santojanni.`;

    const textLines = splitTextIntoLines(
      text,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con nombre y apellido de la autoridad
    let currentY = 330;
    textLines.forEach((line) => {
      page.drawText(line, {
        x: 100, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 4; // Espaciado entre líneas
    });
    page.drawText("Se extiende el presente certificado el ${fechaActual}.", {
      x: 100, // Ajusta las coordenadas x
      y: currentY - 20, // Ajusta la posición vertical para cada línea
      size: textSize,
      font: timesRomanFont,
      color: color,
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
    RECEPTOR/SELECTOR DE GENERACION DE CERTIFICADOS
    */

  const generateCertificado = (certificado) => {
    let text;
    switch (certificado.tipo) {
      case "jurado_temas_libres":
        text = `Por cuanto: ${certificado.autoridad} ha participado como Jurado de Temas libres`;
        generateCertificadoPDF(text);
        break;
      case "presidente_temas_libres":
        text = `Por cuanto: ${certificado.autoridad} ha participado como Presidente de Temas libres`;
        generateCertificadoPDF(text);
        break;
      case "secretario_temas_libres":
        text = `Por cuanto: ${certificado.autoridad} ha participado como Secretario/a de Temas libres`;
        generateCertificadoPDF(text);
        break;
      case "autores_temas_libres":
        text = `Por cuanto: ${certificado.autores} han participado como Autores del trabajo "${certificado.titulo}"`;
        generateCertificadoPDF(text);
        break;
      case "presidente_mesa_redonda":
        text = `Por cuanto: ${certificado.autoridad} ha participado como "${certificado.titulo}"`;
        generateCertificadoPDF(text);
        break;
      case "secretario_mesa_redonda":
        text = `Por cuanto: ${certificado.autoridad} ha participado como "${certificado.titulo}"`;
        generateCertificadoPDF(text);
        break;
      case "disertante_mesa_redonda":
        text = `Por cuanto: ${certificado.disertante} ha participado como "${certificado.titulo}" ${certificado.tema != "" ? certificado.tema : ""}`;
        generateCertificadoPDF(text);
        break;
      case "presidente_jornada_residente":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "secretario_jornada_residente":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "coordinador_jornada_residente":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "colaborador_jornada_residente":
        text = `Por cuanto: ${certificado.autoridad} ha/han participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "presentador_jornada_residente":
        text = `Por cuanto: ${certificado.autoridad} ha/han participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "disertante_jornada_residente":
        text = `Por cuanto: ${certificado.autoridad} han participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "orador_conferencia":
        text = `Por cuanto: ${certificado.orador} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "coordinador_conferencia":
        text = `Por cuanto: ${certificado.coordinador} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "autoridades":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_cientifico":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_mesas_redondas":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_conferencias":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_temas_libres":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_relaciones_publicas":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_informatica":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_recepcion":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_cultura":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_asesor":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_area_programatica":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
      case "comite_residentes_concurrentes":
        text = `Por cuanto: ${certificado.autoridad} ha participado como ${certificado.titulo}`;
        generateCertificadoPDF(text);
        break;
    }
  };

  /*
    CERTIFICADO PRESIDENTE TEMAS LIBRES
    */
  const generateCertificadoPDF = async (text) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Fuente personalizada
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = await fetch("/fonts/Montserrat-Regular.ttf").then((res) =>
      res.arrayBuffer()
    );
    const font = await pdfDoc.embedFont(fontBytes);

    // Configuración del bloque de texto
    const textSize = 11;
    const lineHeight = textSize + 8; // Espaciado entre líneas
    const color = rgb(0, 0, 0);
    const marginX = 100; // Margen izquierdo y derecho
    const startY = 300;

    // El ancho disponible se calcula a partir del ancho real de la página
    const { width: pageWidth } = page.getSize();
    const maxWidth = pageWidth - marginX * 2;

    // Dibuja un texto con word wrapping y devuelve la Y siguiente
    const drawWrappedText = (content, y) => {
      const lines = splitTextIntoLines(content, maxWidth, font, textSize);
      lines.forEach((line) => {
        page.drawText(line, { x: marginX, y, size: textSize, font, color });
        y -= lineHeight;
      });
      return y;
    };

    let currentY = drawWrappedText(text, startY);
    drawWrappedText(
      `Se extiende el presente certificado el ${fechaActual}.`,
      currentY - 20
    );

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
   CERTIFICADO SECRETARIO TEMAS LIBRES
   */
  const generateCertificadoSecretarioTemasLibres = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 800;

    //Format autores y títulos de trabajos
    const autoridadLines = splitTextIntoLines(
      certificado.autoridad,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con nombre y apellido de la autoridad
    let currentY = 310;
    autoridadLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 4; // Espaciado entre líneas
    });

    //Completa con el cargo que ocupó
    currentY -= 15; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 20 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
    CERTIFICADO AUTORES TEMAS LIBRES
    */
  const generateCertificadoAutoresTemasLibres = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_6.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 500;

    //Format autores y títulos de trabajos
    const autoresLines = splitTextIntoLines(
      certificado.autores,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con los autores
    let currentY = 310;
    autoresLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 1; // Espaciado entre líneas
    });

    //Completa con literal "Autores"
    currentY -= 15; // Añade un espacio extra entre fullName y título
    page.drawText("Autores", {
      x: 250, // Ajusta las coordenadas x
      y: currentY,
      size: 14,
      font: timesRomanFont,
      color: color,
    });

    //Completa con el título del trabajo
    currentY -= 35; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      console.log(line);
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 15 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
    CERTIFICADO PRESIDENTE MESA REDONDA
    */
  const generateCertificadoPresidenteMesaRedonda = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 800;

    //Format autores y títulos de trabajos
    const autoridadLines = splitTextIntoLines(
      certificado.autoridad,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con nombre y apellido de la autoridad
    let currentY = 310;
    autoridadLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 4; // Espaciado entre líneas
    });

    //Completa con el cargo que ocupó
    currentY -= 15; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 20 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
   CERTIFICADO SECRETARIO MESA REDONDA
   */
  const generateCertificadoSecretarioMesaRedonda = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 800;

    //Format autores y títulos de trabajos
    const autoridadLines = splitTextIntoLines(
      certificado.autoridad,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con nombre y apellido de la autoridad
    let currentY = 310;
    autoridadLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 4; // Espaciado entre líneas
    });

    //Completa con el cargo que ocupó
    currentY -= 15; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 20 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
    CERTIFICADO DISERTANTE MESA REDONDA
    */
  const generateCertificadoDisertanteMesaRedonda = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 500;

    //Format autores y títulos de trabajos
    const disertanteLines = splitTextIntoLines(
      certificado.disertante,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const temaLines = splitTextIntoLines(
      certificado.tema,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con los autores
    let currentY = 310;
    disertanteLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 1; // Espaciado entre líneas
    });

    //Completa con el título de la mesa
    currentY -= 35; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      console.log(line);
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 15 + 4; // Espaciado entre líneas del título
    });

    //Completa con el tema del trabajo
    currentY -= 35; // Añade un espacio extra entre fullName y título
    temaLines.forEach((line) => {
      console.log(line);
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 15 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
    CERTIFICADO PRESIDENTE JORNADA RESIDENTE
    */
  const generateCertificadoPresidenteJornadaResidente = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 800;

    //Format autores y títulos de trabajos
    const autoridadLines = splitTextIntoLines(
      certificado.autoridad,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con nombre y apellido de la autoridad
    let currentY = 310;
    autoridadLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 4; // Espaciado entre líneas
    });

    //Completa con el cargo que ocupó
    currentY -= 15; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 20 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
   CERTIFICADO SECRETARIO JORNADA RESIDENTE
   */
  const generateCertificadoSecretarioJornadaResidente = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 800;

    //Format autores y títulos de trabajos
    const autoridadLines = splitTextIntoLines(
      certificado.autoridad,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con nombre y apellido de la autoridad
    let currentY = 310;
    autoridadLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 4; // Espaciado entre líneas
    });

    //Completa con el cargo que ocupó
    currentY -= 15; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 20 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
    CERTIFICADO DISERTANTE JORNADA RESIDENTE
    */
  const generateCertificadoDisertanteJornadaResidente = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 500;

    //Format autores y títulos de trabajos
    const disertanteLines = splitTextIntoLines(
      certificado.disertante,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con los autores
    let currentY = 310;
    disertanteLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 1; // Espaciado entre líneas
    });

    //Completa con el título de la mesa
    currentY -= 35; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      console.log(line);
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 15 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  /*
    CERTIFICADO ORADOR CONFERENCIA
    */
  const generateCertificadoOradorConferencia = async (certificado) => {
    // Cargar la plantilla PDF existente
    const existingPdfBytes = await fetch(
      "/pdf/template_certificado_jornadas_2026.pdf"
    ).then((res) => res.arrayBuffer());

    // Crear un nuevo documento a partir de la plantilla
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Insertar texto personalizado
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textSize = 14;
    const color = rgb(0, 0, 0);
    const maxWidth = 500;

    //Format autores y títulos de trabajos
    const oradorLines = splitTextIntoLines(
      certificado.orador,
      maxWidth,
      timesRomanFont,
      textSize
    );
    const tituloLines = splitTextIntoLines(
      certificado.titulo,
      maxWidth,
      timesRomanFont,
      textSize
    );

    //Completa con los autores
    let currentY = 310;
    oradorLines.forEach((line) => {
      page.drawText(line, {
        x: 200, // Ajusta las coordenadas x
        y: currentY, // Ajusta la posición vertical para cada línea
        size: textSize,
        font: timesRomanFont,
        color: color,
      });
      currentY -= textSize + 1; // Espaciado entre líneas
    });

    //Completa con el título de la mesa
    currentY -= 35; // Añade un espacio extra entre fullName y título
    tituloLines.forEach((line) => {
      console.log(line);
      page.drawText(line, {
        x: 250, // Ajusta las coordenadas x
        y: currentY,
        size: 14,
        font: timesRomanFont,
        color: color,
      });
      currentY -= 15 + 4; // Espaciado entre líneas del título
    });

    // Guardar el documento PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar el archivo PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "diploma.pdf");
  };

  // Función para dividir texto en varias líneas
  // - Respeta los saltos de línea explícitos (\n)
  // - Corta palabras que por sí solas superan el ancho máximo
  // - Ignora espacios múltiples
  const splitTextIntoLines = (text, maxWidth, font, size) => {
    const lines = [];
    const fits = (str) => font.widthOfTextAtSize(str, size) <= maxWidth;

    // Parte una palabra demasiado larga en fragmentos que entren en maxWidth
    const breakLongWord = (word) => {
      const chunks = [];
      let chunk = "";
      for (const char of word) {
        if (chunk && !fits(chunk + char)) {
          chunks.push(chunk);
          chunk = char;
        } else {
          chunk += char;
        }
      }
      if (chunk) chunks.push(chunk);
      return chunks;
    };

    String(text ?? "")
      .split(/\r?\n/)
      .forEach((paragraph) => {
        const words = paragraph.split(/\s+/).filter(Boolean);
        let currentLine = "";

        words.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;

          if (fits(testLine)) {
            currentLine = testLine;
            return;
          }

          if (currentLine) lines.push(currentLine);

          if (fits(word)) {
            currentLine = word;
          } else {
            const chunks = breakLongWord(word);
            currentLine = chunks.pop();
            lines.push(...chunks);
          }
        });

        // Un párrafo vacío conserva el salto de línea
        lines.push(currentLine);
      });

    return lines;
  };

  // Retutning functions and states
  return { generatePDF, generateCertificado };
};
