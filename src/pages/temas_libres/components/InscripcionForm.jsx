import { useInscripcionForm } from "../hooks/useInscripcionForm";
import ReCAPTCHA from "react-google-recaptcha";
import { serviciosList } from "./serviciosList"; // Assuming you have a list of services
import AddIcon from "../svgIcons/AddIcon";
import DeleteIcon from "../svgIcons/DeleteIcon"; // Assuming you have a delete icon


const InscripcionForm = () => {

  const {
    handleSubmit,
    handleChange,
    formData,
    errors,
    handleCaptchaChange,
    handleAddService,
    handleDeleteService,
    handleAddAutor,
    handleDeleteAutor,
    handleAbstractFileChange,
    handleTrabajoPremioFileChange
  } = useInscripcionForm();


  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full laptop1-w[90%] laptop2-w[90%] desktop:w-[90%] m-auto rounded-xl p-10 bg-gradient-to-b from-LightGreen to-Green text-white ">

          {/* Título */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Título del trabajo:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo ?? ""}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.titulo ? "border border-Red" : ""}`}

            />
            {errors.titulo && (
              <span className="text-sm text-Red">{errors.titulo}</span>
            )}
          </div>

          {/* Servicios */}
          <div className="flex flex-col mb-5">
            <label className="w-full text-White pb-2">Agregar Servicios:</label>

            <div className="flex items-center gap-4 mb-1">
              <select
                name="servicio"
                value={formData.servicio} // Assuming you have state in your formData
                onChange={handleChange}
                className={`w-[80%] rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.servicio && "focus:outline border border-Red"
                  }`}
              >
                <option value="">Seleccione...</option> {/* Placeholder option */}
                {serviciosList.map((servicio, index) => (
                  <option key={index} value={servicio}>{servicio}</option>
                ))}
              </select>

              <button
                onClick={handleAddService}><AddIcon width={35} /></button>
            </div>

            {/* Error message for servicios */}
            {errors.servicios && (
              <span className="text-sm text-Red">{errors.servicios}</span>
            )}

            {/* Servicios seleecionados */}
            <div className="mt-2">
              {formData.serviciosList.length > 0 && (
                <span className="text-White">Servicios seleccionados:</span>
              )}

              <ul className="list-disc pl-5">
                {formData.serviciosList.map((servicio, index) => (
                  <div key={index}>
                    <li key={index} className="text-White flex items-center gap-2">{servicio} <button onClick={(e) => handleDeleteService(e, servicio)}><DeleteIcon width={20} /></button></li>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          {/* Autores */}
          <div className="flex flex-col mb-5">
            <label className="w-full text-White pb-2">Agregar Autores:</label>
            <div className="flex items-center gap-4 mb-1">
              <input
                name="autor"
                value={formData.autor ?? ""}
                onChange={handleChange}
                rows={3}
                className={`w-[80%] rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.autores && "focus:outline border border-Red"
                  }`}
              />
              <button
                onClick={handleAddAutor}><AddIcon width={35} /></button>
            </div>

            {/* Error message for autores */}
            {errors.autores && (
              <span className="text-sm text-Red">{errors.autores}</span>
            )}

            {/* Seleccionados */}
            <div className="mt-2">
              {formData.autoresList.length > 0 && (
                <span className="text-White">Autores agregados:</span>
              )}
              <ul className="list-disc pl-5">
                {formData.autoresList.map((autor, index) => (
                  <div key={index}>
                    <li key={index} className="text-White flex items-center gap-2">{autor} <button onClick={(e) => handleDeleteAutor(e, autor)}><DeleteIcon width={20} /></button></li>
                  </div>
                ))}
              </ul>
            </div>
          </div>


          {/* Abstract */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Subir PDF del Abstract:</label>
            <input
              type="file"
              name="abstract"
              accept=".pdf"
              onChange={handleAbstractFileChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.abstract && "focus:outline border border-Red"
                }`}
            />
            {errors.abstract && (
              <span className="text-sm text-Red">{errors.abstract}</span>
            )}
          </div>


          {/* Presenta a premio */}
          <div className="flex items-center gap-4 mb-5">
            <button
              type="button"
              name="presentaPremio"
              onClick={handleChange}
              className="text-White"
            >
              {formData.presentaPremio ? "✅ Presenta a premio" : "☐ Presenta a premio"}
            </button>
          </div>


          {/* Trabajo completo (si presenta a premio) */}
          {formData.presentaPremio && (
            <div className="flex flex-col mb-5">
              <label className="text-White w-full pb-2">Subir PDF Trabajo:</label>
              <input
                type="file"
                name="trabajoCompleto"
                accept=".pdf"
                onChange={handleTrabajoPremioFileChange}
                className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.trabajoPremio ? "border border-Red" : ""
                  }`}
              />
              {errors.trabajoPremio && (
                <span className="text-sm text-Red">{errors.trabajoPremio}</span>
              )}
            </div>
          )}

          {/* Lugar de realización */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Lugar donde fue realizado:</label>
            <input
              type="text"
              name="lugar"
              value={formData.lugar ?? ""}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.lugar && "focus:outline border border-Red"
                }`}
            />
            {errors.lugar && (
              <span className="text-sm text-Red">{errors.lugar}</span>
            )}
          </div>

          {/* Contacto */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Responsable/Contacto:</label>
            <input
              type="text"
              name="contactoNombre"
              placeholder="Nombre"
              value={formData.contactoNombre ?? ""}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
            />
            <input
              type="text"
              name="contactoApellido"
              placeholder="Apellido"
              value={formData.contactoApellido}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow `}
            />
            <input
              type="text"
              name="contactoCelular"
              placeholder="Celular"
              value={formData.contactoCelular ?? ""}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow `}
            />
            <input
              type="text"
              name="contactoEmail"
              placeholder="Email"
              value={formData.contactoEmail ?? ""}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow `}
            />
          </div>
        </div>

        {/* CAPTCHA y botón */}
        <div className="w-full flex justify-center pt-5">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />
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

export default InscripcionForm;
