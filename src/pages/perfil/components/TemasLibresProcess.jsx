// import { useInscripcionForm } from "../hooks/useInscripcionForm";
// import ReCAPTCHA from "react-google-recaptcha";
// import { serviciosList } from "./serviciosList"; // Assuming you have a list of services
// import AddIcon from "../svgIcons/AddIcon";
// import DeleteIcon from "../svgIcons/DeleteIcon"; // Assuming you have a delete icon
import { useTemasLibres } from "../hooks/useTemasLibres";

const TemasLibresProcess = () => {

  const { handleGuardarTrabajo, formData, handleChange, REVISION_ESTADOS
  } = useTemasLibres();


  return (
    <div className="w-full">
      <form onSubmit={handleGuardarTrabajo}>
        <div className="w-full laptop1-w[90%] laptop2-w[90%] desktop:w-[90%] m-auto rounded-xl p-10 bg-gradient-to-b from-LightGreen to-Green text-white">

          {/* Título */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Título del trabajo:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo ?? ""}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            />
          </div>

          {/* Asignar */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Asignar a Vocal</label>
                <select
              name="vocalAsignado"
              value={formData.vocalAsignado ?? ""}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            >
              {formData.vocalAsignado ? (<option value="">{formData.vocalAsignado}</option>) : (<option value="">Seleccione una opción</option>)}
              <option value="Dra. Karina Ramirez Echarry">Dra. Karina Ramirez Echarry</option>
              <option value="Dra. Carla López Baltare">Dra. Carla López Baltare</option>
              <option value="Dr. Federico Labanca">Dr. Federico Labanca</option>
              <option value="Dra. Jimena Figoni">Dra. Jimena Figoni</option>
              <option value="Dra. Alejandra Greco">Dra. Alejandra Greco</option>
              <option value="Dra. Verónica Alonso">Dra. Verónica Alonso</option>
              <option value="Dr. Gonzalo Frutos">Dr. Gonzalo Frutos</option>
              <option value="Dr. Guillermo Parisi">Dr. Guillermo Parisi</option>
              <option value="Dr. Javier Castillo">Dr. Javier Castillo</option>
              <option value="Dr. Erica Mux">Dr. Erica Mux</option>
              <option value="Dra. Ana Camporini">Dra. Ana Camporini</option>
              <option value="Dra. Valeria Bertaza">Dra. Valeria Bertaza</option>
              <option value="Dr. Gastón Gómez">Dr. Gastón Gómez</option>
              <option value="Lic. Mauro Andreu">Lic. Mauro Andreu</option>
              <option value="Lic. Florencia Gregorio">Lic. Florencia Gregorio</option>
              <option value="Dra. Dafne López">Dra. Dafne López</option>
              <option value="Lic. Débora Vílchez">Lic. Débora Vílchez</option>
              <option value="Dra. Elizabeth Sanguinetti">Dra. Elizabeth Sanguinetti</option>
              <option value="Dra. Paola Villán">Dra. Paola Villán</option>
              <option value="0BbZc9DUYDeprIUWRKErlDF7CQu1">TEST JPR</option>
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
              {formData.vocalRevision ? (<option value="">{formData.vocalRevision}</option>) : (<option value="">Seleccione una opción</option>)}
              <option value={REVISION_ESTADOS.ACEPTADO}>{REVISION_ESTADOS.ACEPTADO}</option>
              <option value={REVISION_ESTADOS.RECHAZADO}>{REVISION_ESTADOS.RECHAZADO}</option>
            </select>
          </div>


        </div>

        <div className="w-full flex justify-center pt-5">
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
