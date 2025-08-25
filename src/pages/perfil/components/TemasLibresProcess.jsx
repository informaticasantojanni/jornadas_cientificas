// import { useInscripcionForm } from "../hooks/useInscripcionForm";
// import ReCAPTCHA from "react-google-recaptcha";
// import { serviciosList } from "./serviciosList"; // Assuming you have a list of services
// import AddIcon from "../svgIcons/AddIcon";
// import DeleteIcon from "../svgIcons/DeleteIcon"; // Assuming you have a delete icon
import { useTemasLibres } from "../hooks/useTemasLibres";
import { Typography, Box } from "@mui/material";

const TemasLibresProcess = () => {

  const { handleGuardarTrabajo, formData, handleChange, handleVolver, listaVocales, REVISION_ESTADOS
  } = useTemasLibres();

  return (
    <div className="w-full">
      <form onSubmit={handleGuardarTrabajo}>
        <div className="w-full laptop1-w[90%] laptop2-w[90%] desktop:w-[90%] m-auto rounded-xl p-10 bg-gradient-to-b from-LightGreen to-Green text-white">

          {/* Título */}
          <label className="text-White w-full py-2">Título:</label>
          <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'grey.50' }}>
            <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
              {formData.titulo || <Typography color="text.secondary">Sin título</Typography>}
            </Typography>
          </Box>

          {/* Servicios */}
          <label className="text-White w-full py-2">Servicios:</label>
          <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'grey.50' }}>
            <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
              {formData.serviciosList || <Typography color="text.secondary">Sin título</Typography>}
            </Typography>
          </Box>

          {/* Atores */}
          <label className="text-White w-full py-2">Autores:</label>
          <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'grey.50' }}>
            <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
              {formData.autoresList || <Typography color="text.secondary">Sin título</Typography>}
            </Typography>
          </Box>

          {/* Asignar */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full py-2">Asignar a Vocal</label>
            <select
              name="vocalAsignado"
              value={formData.vocalAsignado ?? ""}
              onChange={handleChange}
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

          {/* Revision estados */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Revisión</label>
            <select
              name="vocalRevision"
              value={formData.vocalRevision ?? ""}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            >
              {REVISION_ESTADOS.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Devolución revisión (cuerpo del email)</label>
            <textarea
              name="comentariosRevision"
              value={formData.comentariosRevision ?? ""}
              onChange={handleChange}
              rows={4} // cantidad de líneas visibles
              className="rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow resize-none"
              placeholder="Escriba sus comentarios aquí..."
            />
          </div>

        </div>

        <div className="w-full flex justify-center pt-5 gap-5">
          <button
            className="w-[150px] text-xl font-bold px-5 py-3 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
            onClick={handleVolver}
          >
            Volver
          </button>
          <button
            className="w-[150px] text-xl font-bold px-5 py-3 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>

  );
};

export default TemasLibresProcess;
