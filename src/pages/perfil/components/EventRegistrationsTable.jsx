import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useEventRegistrations } from "../hooks/useEventRegistrations";
import { useProfile } from "../hooks/useProfile";

const EventRegistrationsTable = ({ searchDni }) => {
  const { renderUsers, handlePaymentStatusChange } =
    useEventRegistrations(searchDni);
  const { convert_category } = useProfile();

  const tableItems = [
    "Dni",
    "Nombre",
    "Apellido",
    "Categoría",
    "Estado del Pago",
    "Acciones",
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
            {console.log("renderUsers from table component; ", renderUsers)}
            {renderUsers?.length > 0 ? (
              renderUsers?.map((renderUser) => (
                <TableRow
                  key={renderUser.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:
                      renderUser.id % 2 === 0 ? "#f9f9f9" : "#fff",
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {renderUser.dni} {/* Asumiendo que hay un campo dni */}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {renderUser.name}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {renderUser.lastName}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {convert_category[renderUser.category]}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {renderUser.payment === "exento"
                      ? "Exento"
                      : renderUser.payment === "pending"
                      ? "Pendiente"
                      : renderUser.payment === "paid"
                      ? "Pagado"
                      : "Inscripción pendiente"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 18 }}>
                    {renderUser.payment === "pending" && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handlePaymentStatusChange(renderUser.id)}
                        sx={{
                          backgroundColor: "#005996",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#584ba0",
                          },
                        }}
                      >
                        Confirmar Pago
                      </Button>
                    )}
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

export default EventRegistrationsTable;
