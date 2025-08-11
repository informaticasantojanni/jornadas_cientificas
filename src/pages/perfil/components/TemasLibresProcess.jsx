// import { useInscripcionForm } from "../hooks/useInscripcionForm";
// import ReCAPTCHA from "react-google-recaptcha";
// import { serviciosList } from "./serviciosList"; // Assuming you have a list of services
// import AddIcon from "../svgIcons/AddIcon";
// import DeleteIcon from "../svgIcons/DeleteIcon"; // Assuming you have a delete icon
import { useTemasLibres } from "../hooks/useTemasLibres";

const TemasLibresProcess = () => {

  const { handleSubmitAsignar, processTemasLibres, formData, setSelectedValue
  } = useTemasLibres();


  return (
    <div className="w-full">
      <form onSubmit={handleSubmitAsignar}>
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
              name="titulo"
              value={""}
              onChange={(e) => setSelectedValue(e.target.value)}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
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
