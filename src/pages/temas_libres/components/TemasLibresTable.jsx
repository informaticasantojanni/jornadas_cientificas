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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import DownloadFile from "../components/icons/DownloadFile";
import { Box } from "@mui/material";
import FilterIcon from "../components/icons/FilterIcon";
import { useGlobal } from "../../../hooks/useGlobal";
import { useReports } from "../hooks/useReports";

const TemasLibresTable = ({ userData }) => {
  const {
    renderTemasLibres,
    handleProcesarTemaLibre,
    formatAutores,
    sliceString,
    tableItems,
    listaVocales,
    REVISION_ESTADOS,
    handleTableFilter,
    filtrarTrabajos,
    serviciosEnListaTemasLibres,
    handleResetFilter,
    generatingReportTemasLibres,
    PRESENTACION_DIAS,
    PRESENTACION_HORARIOS,
    PRESENTACION_AULAS
  } = useTemasLibres(userData);

  const { ROLES } = useGlobal();
  const { generateReportTemasLibres } = useReports();

  return (
    <div className="w-full pb-5">
      {/* Form filtrar contenido */}
      {userData.role != ROLES.USER && (
        <div className="w-full pb-10">
          <div className="w-full m-auto rounded-xl p-5 bg-gradient-to-b from-LightGreen to-Green text-white tablet:w-1/2 laptop1:w-1/2 laptop2:w-[500px]">
            <div className="flex flex-col">
              <label htmlFor="email" className="w-full text-White pb-2">
                <div className="flex items-center justify-between">
                  <p>Filtrar por contenido</p>

                  <button
                    onClick={handleResetFilter}
                    className="flex items-center gap-2"
                  >
                    <p>Reset Filtro</p>
                    <FilterIcon width={20} />
                  </button>
                </div>
              </label>
              <input
                id="query"
                placeholder="Ingrese texto a buscar"
                name="query"
                type="text"
                value={filtrarTrabajos.query}
                className="w-full px-2 py-2 mb-5  rounded-lg shadow-lightShadowGrey"
                onChange={handleTableFilter}
              />

              <label className="text-White w-full pb-2">
                Filtrar por servicio
              </label>
              <select
                name="servicio"
                value={filtrarTrabajos.servicio}
                onChange={handleTableFilter}
                className="rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-5 focus:outline-none focus:shadow-lightShadow"
              >
                <option value="">Seleccione un servicio</option>
                {serviciosEnListaTemasLibres.map((servicio, idx) => (
                  <option key={idx} value={servicio}>
                    {servicio}
                  </option>
                ))}
              </select>

              <div className="flex items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="pendientesAsignacion"
                      checked={filtrarTrabajos.pendientesAsignacion}
                      onChange={handleTableFilter}
                      sx={{ "&.Mui-checked": { color: "#FFF" } }}
                    />
                  }
                />
                <p className="text-White">Pendientes asignacion</p>
              </div>

              <div className="flex items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="pendientesRevision"
                      checked={filtrarTrabajos.pendientesRevision}
                      onChange={handleTableFilter}
                      sx={{ "&.Mui-checked": { color: "#FFF" } }}
                    />
                  }
                />
                <p className="text-White">Pendientes revisión</p>
              </div>

              <p className="text-White mt-5">
                Mostrando: {renderTemasLibres?.length} registros
              </p>
            </div>
          </div>
        </div>
      )}

      <TableContainer
        component={Paper}
        sx={{ height: "70vh", overflow: "auto", boxShadow: 3, borderRadius: 2 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableItems.map((header, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    padding: "10px 16px",
                    width: 150,
                    backgroundColor: "#005996",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(
              "renderTemasLibres from table component; ",
              renderTemasLibres
            )}
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
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.tipoTrabajo}{" "}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.titulo}{" "}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {Array.isArray(renderTemaLibre.serviciosList)
                      ? renderTemaLibre.serviciosList.join(", ")
                      : "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {Array.isArray(renderTemaLibre.autoresList)
                      ? formatAutores(renderTemaLibre.autoresList, 1)
                      : "-"}
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <a
                        href={renderTemaLibre.abstractUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DownloadFile width={20} height={20} />
                      </a>
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.presentaPremio ? "si" : "no"}
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.premioCategoria}{" "}
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <a
                        href={renderTemaLibre.trabajoPremioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {renderTemaLibre.trabajoPremioUrl ? (
                          <DownloadFile width={20} height={20} />
                        ) : (
                          "-"
                        )}
                      </a>
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.lugar}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.contactoNombre} {/* */}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.contactoApellido} {/* */}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.contactoEmail} {/* */}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {renderTemaLibre.contactoCelular} {/* */}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      fontSize: 12,
                      color: renderTemaLibre?.vocalAsignado ? "inherit" : "red",
                    }}
                  >
                    {renderTemaLibre?.vocalAsignado
                      ? listaVocales.find(
                        (vocal) => vocal.id == renderTemaLibre.vocalAsignado
                      )?.label
                      : "Pendiente"}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      fontSize: 12,
                      color:
                        renderTemaLibre?.vocalRevision === "2"
                          ? "green"
                          : renderTemaLibre?.vocalRevision === "3"
                            ? "orange"
                            : renderTemaLibre?.vocalRevision === "4"
                              ? "red"
                              : "inherit", // color por defecto
                    }}
                  >
                    {renderTemaLibre?.vocalRevision
                      ? REVISION_ESTADOS.find(
                        (estado) => estado.id == renderTemaLibre.vocalRevision
                      )?.label
                      : ""}
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {sliceString(
                      renderTemaLibre?.vocalRevisionObservaciones ?? "",
                      70
                    )}
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {Array.isArray(
                        renderTemaLibre?.abstractRevisionUrlList
                      ) &&
                        renderTemaLibre.abstractRevisionUrlList.map(
                          (abstractRevisionUrl, idx) => (
                            <a
                              key={idx}
                              href={abstractRevisionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <DownloadFile width={20} height={20} />
                            </a>
                          )
                        )}
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {/* {renderTemaLibre?.presentacionDia ?? ""} */}
                    {renderTemaLibre?.vocalAsignado
                      ? PRESENTACION_DIAS.find(
                        (dia) => dia.id == renderTemaLibre.presentacionDia
                      )?.label
                      : "Pendiente"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {/* {renderTemaLibre?.presentacionHora ?? ""} */}
                    {renderTemaLibre?.presentacionHora
                      ? PRESENTACION_HORARIOS.find(
                        (hora) => hora.id == renderTemaLibre.presentacionHora
                      )?.label
                      : "Pendiente"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {/* {renderTemaLibre?.presentacionAula ?? ""} */}
                    {renderTemaLibre?.presentacionAula
                      ? PRESENTACION_AULAS.find(
                        (aula) => aula.id == renderTemaLibre.presentacionAula
                      )?.label
                      : "Pendiente"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    {
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          handleProcesarTemaLibre(renderTemaLibre.id)
                        }
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

      {/* Boton generar reporte */}
      {/* <button
        className="py-5"
        onClick={generateReportTemasLibres}>
        {generatingReportTemasLibres ? "Generando reporte... aguarde" : "Generar reporte"}
      </button> */}

    </div>
  );
};

export default TemasLibresTable;
