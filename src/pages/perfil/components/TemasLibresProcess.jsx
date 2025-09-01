// import { useInscripcionForm } from "../hooks/useInscripcionForm";
// import ReCAPTCHA from "react-google-recaptcha";
// import { serviciosList } from "./serviciosList"; // Assuming you have a list of services
// import AddIcon from "../svgIcons/AddIcon";
// import DeleteIcon from "../svgIcons/DeleteIcon"; // Assuming you have a delete icon
import { useTemasLibres } from "../hooks/useTemasLibres";
import { Typography, Box } from "@mui/material";
import { useGlobal } from "../../../hooks/useGlobal";
import DownloadFile from "./icons/DownloadFile";

const TemasLibresProcess = ({ userData }) => {
  const { PERFILES } = useGlobal();
  const {
    handleGuardarTrabajo,
    formData,
    handleChange,
    handleVolver,
    listaVocales,
    REVISION_ESTADOS,
    PRESENTACION_DIAS,
    PRESENTACION_HORARIOS,
    PRESENTACION_AULAS,
    handleAbstractFileChange,
  } = useTemasLibres();

  return (
    <div className="w-full">
      <form onSubmit={handleGuardarTrabajo}>
        <div className="w-full laptop1-w[90%] laptop2-w[90%] desktop:w-[90%] m-auto rounded-xl p-10 bg-gradient-to-b from-LightGreen to-Green text-white">
          {/* Título */}
          <label className="text-White w-full py-2">Título:</label>
          <Box
            sx={{
              p: 1,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "grey.50",
            }}
          >
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
              {formData.titulo || (
                <Typography color="text.secondary">Sin título</Typography>
              )}
            </Typography>
          </Box>

          {/* Servicios */}
          <label className="text-White w-full py-2">Servicios:</label>
          <Box
            sx={{
              p: 1,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "grey.50",
            }}
          >
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
              {formData.serviciosList || (
                <Typography color="text.secondary">Sin título</Typography>
              )}
            </Typography>
          </Box>

          {/* Autores */}
          <label className="text-White w-full py-2">Autores:</label>
          <Box
            sx={{
              p: 1,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "grey.50",
            }}
          >
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
              {formData.autoresList || (
                <Typography color="text.secondary">Sin título</Typography>
              )}
            </Typography>
          </Box>

          {/* Abstracts */}
          <label className="text-White py-2">Abstracts:</label>
          <div className="w-auto flex flex-row pb-5">
            <a
              href={formData.abstractUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadFile width={20} height={20} />
            </a>
            {Array.isArray(formData?.abstractRevisionUrlList) &&
              formData.abstractRevisionUrlList.map(
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
          </div>

          {/* Subir Abstract */}
          {(userData.role == PERFILES.USER || userData.role == PERFILES.TEMAS_LIBRES_PRESIDENTE) && (
            <div className="flex flex-col mb-5">
              <label className="text-White w-full pb-2">
                Subir PDF del Abstract corregido:
              </label>
              <input
                type="file"
                name="abstract"
                accept=".pdf"
                onChange={handleAbstractFileChange}
                className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow"
            }`}
              />
            </div>
          )}

          {/* Asignar Vocal */}
          {userData.role != PERFILES.USER && (
            <div className="flex flex-col mb-5">
              <label className="text-White w-full py-2">Asignar a Vocal</label>
              <select
                name="vocalAsignado"
                value={formData.vocalAsignado ?? ""}
                onChange={handleChange}
                disabled={
                  ![PERFILES.TEMAS_LIBRES_PRESIDENTE].includes(userData.role)
                }
                className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
              >
                <option value="">Seleccione una opción</option>
                {listaVocales.map((vocal) => (
                  <option key={vocal.id} value={vocal.id}>
                    {vocal.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Revision estados */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">
              Revisión del trabajo
            </label>
            <select
              name="vocalRevision"
              value={formData.vocalRevision ?? ""}
              onChange={handleChange}
              disabled={
                ![
                  PERFILES.TEMAS_LIBRES_PRESIDENTE,
                  PERFILES.TEMAS_LIBRES_VOCAL,
                ].includes(userData.role)
              }
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            >
              {REVISION_ESTADOS.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>

          {/* Revision Comentarios */}
          <div className="flex flex-col mb-10">
            <label className="text-White w-full pb-2">
              Revisión observaciones
            </label>
            <textarea
              name="vocalRevisionObservaciones"
              value={formData.vocalRevisionObservaciones ?? ""}
              onChange={handleChange}
              disabled={
                ![
                  PERFILES.TEMAS_LIBRES_PRESIDENTE,
                  PERFILES.TEMAS_LIBRES_VOCAL,
                ].includes(userData.role)
              }
              rows={4} // cantidad de líneas visibles
              className="rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow resize-none"
              placeholder="Escriba sus comentarios aquí..."
            />
          </div>

          <div className="w-full border-t border-White my-5"></div>

          {/* Asignar Dia Presentacion */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full py-2">Asignar Dia</label>
            <select
              name="presentacionDia"
              value={formData.presentacionDia ?? ""}
              onChange={handleChange}
              disabled={
                ![
                  PERFILES.TEMAS_LIBRES_PRESIDENTE,
                  PERFILES.TEMAS_LIBRES_COMITE,
                ].includes(userData.role)
              }
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            >
              <option value="">Seleccione una opción</option>
              {PRESENTACION_DIAS.map((dia) => (
                <option key={dia.id} value={dia.id}>
                  {dia.label}
                </option>
              ))}
            </select>
          </div>

          {/* Asignar Horario Presentacion */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full py-2">Asignar Horario</label>
            <select
              name="presentacionHora"
              value={formData.presentacionHora ?? ""}
              onChange={handleChange}
              disabled={
                ![
                  PERFILES.TEMAS_LIBRES_PRESIDENTE,
                  PERFILES.TEMAS_LIBRES_COMITE,
                ].includes(userData.role)
              }
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            >
              <option value="">Seleccione una opción</option>
              {PRESENTACION_HORARIOS.map((hora) => (
                <option key={hora.id} value={hora.id}>
                  {hora.label}
                </option>
              ))}
            </select>
          </div>

          {/* Asignar Aula Presentacion */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full py-2">Asignar Aula</label>
            <select
              name="presentacionAula"
              value={formData.presentacionAula ?? ""}
              onChange={handleChange}
              disabled={
                ![
                  PERFILES.TEMAS_LIBRES_PRESIDENTE,
                  PERFILES.TEMAS_LIBRES_COMITE,
                ].includes(userData.role)
              }
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            >
              <option value="">Seleccione una opción</option>
              {PRESENTACION_AULAS.map((aula) => (
                <option key={aula.id} value={aula.id}>
                  {aula.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex justify-center pt-5 gap-5">
          <button
            className="w-[150px] text-xl font-bold px-5 py-3 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
            onClick={handleVolver}
          >
            Cancelar
          </button>
          <button
            className="w-[150px] text-xl font-bold px-5 py-3 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemasLibresProcess;
