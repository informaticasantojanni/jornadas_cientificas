import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useTemasLibres } from "../hooks/useTemasLibres";

const TemasLibresTable = () => {
  const { renderTemasLibres, handleProcesarTemaLibre } = useTemasLibres();


  const tableItems = [
    "Título",
    "Servicios",
    "Autores",
    "Link Abstract",
    "Presenta a premio",
    "Link Premio",
    "Lugar de realización",
    "Contacto Nombre",
    "Contacto Apellido",
    "Contacto Cell",
    "Contacto Email",
  ];

  return (
    <div className="w-full pb-20">
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: 2, maxHeight: 900 }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#005996" }}>
              {tableItems.map((header, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    padding: "10px 16px",
                    width: 150,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("renderTemasLibres from table component; ", renderTemasLibres)}
            {renderTemasLibres?.length > 0 ? (
              renderTemasLibres?.map((renderTemaLibre) => (
                <TableRow
                  key={renderTemaLibre.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:
                      renderTemaLibre.id % 2 === 0 ? "#f9f9f9" : "#fff",
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {renderTemaLibre.titulo} {/* Asumiendo que hay un campo dni */}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {renderTemaLibre.servicios}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {Array.isArray(renderTemaLibre.autores)
                      ? renderTemaLibre.autores.join(", ")
                      : "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {renderTemaLibre.presentaPremio}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {renderTemaLibre.lugar}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {<Button
                      variant="contained"
                      size="small"
                      onClick={() => handleProcesarTemaLibre(renderUser.id)}
                      sx={{
                        backgroundColor: "#005996",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#584ba0",
                        },
                      }}
                    >
                      Procesar
                    </Button>
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ fontSize: 18 }}>
                  No se encuentran registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TemasLibresTable;
