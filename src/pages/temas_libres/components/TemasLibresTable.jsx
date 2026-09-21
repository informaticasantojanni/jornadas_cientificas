import React, { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useTemasLibres } from "../hooks/useTemasLibres";
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
    handleResetFilter,
    generatingReportTemasLibres,
    PRESENTACION_DIAS,
    PRESENTACION_HORARIOS,
    PRESENTACION_AULAS,
    TIPOS_TRABAJO
  } = useTemasLibres(userData);

  const { ROLES } = useGlobal();
  const { generateReportTemasLibres } = useReports();

  // Accessor por columna para poder ordenar. `null` = columna no ordenable.
  const columnAccessors = [
    (row) => row.tipoTrabajo,
    (row) => row.titulo,
    (row) =>
      Array.isArray(row.serviciosList) ? row.serviciosList.join(", ") : "",
    (row) => (Array.isArray(row.autoresList) ? formatAutores(row.autoresList, 1) : ""),
    null, // Link Abstract
    (row) => (row.presentaPremio ? 1 : 0),
    (row) => row.premioCategoria,
    null, // Link Premio
    (row) => row.lugar,
    (row) => row.contactoNombre,
    (row) => row.contactoApellido,
    (row) => row.contactoEmail,
    (row) => row.contactoCelular,
    (row) =>
      row?.vocalAsignado
        ? listaVocales.find((vocal) => vocal.id == row.vocalAsignado)?.label
        : "",
    (row) =>
      row?.vocalRevision
        ? REVISION_ESTADOS.find((estado) => estado.id == row.vocalRevision)?.label
        : "",
    (row) => row?.vocalRevisionObservaciones,
    null, // Abstracts corregidos
    (row) =>
      row?.vocalAsignado
        ? PRESENTACION_DIAS.find((dia) => dia.id == row.presentacionDia)?.label
        : "",
    (row) =>
      row?.presentacionHora
        ? PRESENTACION_HORARIOS.find((hora) => hora.id == row.presentacionHora)?.label
        : "",
    (row) =>
      row?.presentacionAula
        ? PRESENTACION_AULAS.find((aula) => aula.id == row.presentacionAula)?.label
        : "",
    null, // Procesar
  ];

  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");

  const handleRequestSort = (columnIndex) => {
    if (!columnAccessors[columnIndex]) return;

    if (orderBy === columnIndex) {
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(columnIndex);
      setOrder("asc");
    }
  };

  const sortedTemasLibres = useMemo(() => {
    if (orderBy === null || !renderTemasLibres) return renderTemasLibres;

    const accessor = columnAccessors[orderBy];
    if (!accessor) return renderTemasLibres;

    return [...renderTemasLibres].sort((a, b) => {
      const valueA = accessor(a) ?? "";
      const valueB = accessor(b) ?? "";

      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderTemasLibres, orderBy, order]);

  return (
    <div className="w-full pb-5">
      {/* Form filtrar contenido */}
      {userData.role != ROLES.USER && (
        <div className="w-full pb-10">
          <div className="w-full m-auto rounded-xl p-6 shadow-lg bg-gradient-to-b from-LightGreen to-Green text-white tablet:w-2/3 laptop1:w-2/3 laptop2:w-[640px]">
            <div className="flex items-center justify-between pb-4 border-b border-white/30">
              <p className="text-lg text-White font-semibold">Filtrar trabajos</p>
              <button
                onClick={handleResetFilter}
                className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-1.5"
              >
                <p>Reset filtro</p>
                <FilterIcon width={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col">
                <label htmlFor="query" className="text-White text-sm pb-1 w-full">
                  Buscar por contenido
                </label>
                <input
                  id="query"
                  placeholder="Título, autor, contacto..."
                  name="query"
                  type="text"
                  value={filtrarTrabajos.query}
                  className="w-full px-3 py-2 rounded-lg shadow-lightShadowGrey focus:outline-none focus:shadow-lightShadow text-black"
                  onChange={handleTableFilter}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-White text-sm pb-1 w-full">
                  Tipo de trabajo
                </label>
                <select
                  name="tipoTrabajo"
                  value={filtrarTrabajos.tipoTrabajo}
                  onChange={handleTableFilter}
                  className="w-full rounded-lg shadow-lightShadowGrey appearance-none px-3 py-2 focus:outline-none focus:shadow-lightShadow text-black"
                >
                  <option value="">Todos</option>
                  {TIPOS_TRABAJO.map((tipo, idx) => (
                    <option key={idx} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-White text-sm pb-1 w-full">
                  Presenta a premio
                </label>
                <select
                  name="presentaPremio"
                  value={filtrarTrabajos.presentaPremio}
                  onChange={handleTableFilter}
                  className="w-full rounded-lg shadow-lightShadowGrey appearance-none px-3 py-2 focus:outline-none focus:shadow-lightShadow text-black"
                >
                  <option value="">Todos</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="flex flex-row gap-20 pt-1]">
                {[
                  { name: "pendientesAsignacion", label: "Pendientes asignación" },
                  { name: "pendientesRevision", label: "Pendientes revisión" },
                ].map(({ name, label }) => {
                  const active = filtrarTrabajos[name];

                  return (
                    <button
                      key={name}
                      type="button"
                      role="switch"
                      aria-checked={active}
                      onClick={() =>
                        handleTableFilter({
                          target: {
                            name,
                            type: "checkbox",
                            checked: !active,
                          },
                        })
                      }
                      className="flex items-center gap-3 text-sm font-medium text-White w-[100px]"
                    >
                      {/* Switch */}
                      <span
                        className={`
            relative inline-flex
            w-10 h-5
            shrink-0
            rounded-full
            transition-colors duration-200
            ${active
                            ? "bg-White"
                            : "bg-CardGrayLight"
                          }
          `}
                      >
                        {/* Círculo desplazable */}
                        <span
                          className={`
              absolute top-0.5
              w-4 h-4
              rounded-full
              transition-all duration-200
              ${active
                              ? "left-[22px] bg-LightGreen"
                              : "left-0.5 bg-PauGreenDark"
                            }
            `}
                        />
                      </span>

                      <span
                        className={
                          active
                            ? "text-White"
                            : "text-CardGrayLight"
                        }
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-White text-sm pt-2 border-t border-white/30">
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
                  {columnAccessors[index] ? (
                    <TableSortLabel
                      active={orderBy === index}
                      direction={orderBy === index ? order : "asc"}
                      onClick={() => handleRequestSort(index)}
                      sx={{
                        color: "#fff !important",
                        "& .MuiTableSortLabel-icon": {
                          color: "#fff !important",
                        },
                      }}
                    >
                      {header}
                    </TableSortLabel>
                  ) : (
                    header
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTemasLibres?.length > 0 ? (
              sortedTemasLibres?.map((renderTemaLibre) => (
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
