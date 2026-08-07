import { useInscripcionForm, ROLES_INTEGRANTE, countWords } from "../hooks/useInscripcionForm";
import ReCAPTCHA from "react-google-recaptcha";
import { serviciosList } from "./serviciosList"; // Assuming you have a list of services
import AddIcon from "../svgIcons/AddIcon";
import DeleteIcon from "../svgIcons/DeleteIcon"; // Assuming you have a delete icon

const FUNDAMENTACION_MAX_PALABRAS = 300;

const InscripcionForm = () => {

  const {
    handleSubmit,
    handleChange,
    formData,
    errors,
    handleCaptchaChange,
    handleAddService,
    handleDeleteService,
    handleAddIntegrante,
    handleDeleteIntegrante
  } = useInscripcionForm();


  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full laptop1-w[90%] laptop2-w[90%] desktop:w-[90%] m-auto rounded-xl p-10 bg-gradient-to-b from-LightGreen to-Green text-white ">

          {/* Título de la Mesa Redonda*/}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Título de la mesa:</label>
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

          {/* Servicios que presentan*/}
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

          {/* Fundamentación */}
          <div className="flex flex-col mb-5">
            <label className="w-full text-White pb-2">Fundamentación (hasta {FUNDAMENTACION_MAX_PALABRAS} palabras):</label>
            <textarea
              name="fundamentacion"
              value={formData.fundamentacion ?? ""}
              onChange={handleChange}
              rows={5}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.fundamentacion ? "border border-Red" : ""
                }`}
            />
            <span className={`text-sm ${countWords(formData.fundamentacion ?? "") > FUNDAMENTACION_MAX_PALABRAS ? "text-Red" : "text-White"}`}>
              {countWords(formData.fundamentacion ?? "")} / {FUNDAMENTACION_MAX_PALABRAS} palabras
            </span>
            {errors.fundamentacion && (
              <span className="text-sm text-Red">{errors.fundamentacion}</span>
            )}
          </div>

          {/* Objetivo general */}
          <div className="flex flex-col mb-5">
            <label className="w-full text-White pb-2">Objetivo general:</label>
            <textarea
              name="objetivoGeneral"
              value={formData.objetivoGeneral ?? ""}
              onChange={handleChange}
              rows={3}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.objetivoGeneral ? "border border-Red" : ""
                }`}
            />
            {errors.objetivoGeneral && (
              <span className="text-sm text-Red">{errors.objetivoGeneral}</span>
            )}
          </div>

          {/* Aporte esperado */}
          <div className="flex flex-col mb-5">
            <label className="w-full text-White pb-2">¿Cuál es el aporte esperado para los asistentes?</label>
            <textarea
              name="aporteEsperado"
              value={formData.aporteEsperado ?? ""}
              onChange={handleChange}
              rows={3}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.aporteEsperado ? "border border-Red" : ""
                }`}
            />
            {errors.aporteEsperado && (
              <span className="text-sm text-Red">{errors.aporteEsperado}</span>
            )}
          </div>

          {/* Integrantes */}
          <div className="flex flex-col mb-5">
            <label className="w-full text-White pb-2">Agregar Integrantes (mínimo 2 y máximo 3 panelistas):</label>
            <div className="flex flex-col tablet:flex-row items-center gap-4 mb-1">
              <input
                name="integranteNombre"
                placeholder="Nombre"
                value={formData.integranteNombre ?? ""}
                onChange={handleChange}
                className={`w-full tablet:w-[30%] rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
              />
              <input
                name="integranteApellido"
                placeholder="Apellido"
                value={formData.integranteApellido ?? ""}
                onChange={handleChange}
                className={`w-full tablet:w-[30%] rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
              />
              <select
                name="integranteRol"
                value={formData.integranteRol ?? ""}
                onChange={handleChange}
                className={`w-full tablet:w-[25%] rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
              >
                <option value="">Rol...</option>
                {ROLES_INTEGRANTE.map((rol, index) => (
                  <option key={index} value={rol}>{rol}</option>
                ))}
              </select>

              <button
                onClick={handleAddIntegrante}><AddIcon width={35} /></button>
            </div>

            {/* Error message for integrantes */}
            {errors.integrantes && (
              <span className="text-sm text-Red">{errors.integrantes}</span>
            )}

            {/* Integrantes agregados */}
            <div className="mt-2">
              {formData.integrantesList.length > 0 && (
                <span className="text-White">Integrantes agregados:</span>
              )}

              <ul className="list-disc pl-5">
                {formData.integrantesList.map((integrante, index) => (
                  <div key={index}>
                    <li className="text-White flex items-center gap-2">
                      {integrante.nombre} {integrante.apellido} — {integrante.rol}
                      <button onClick={(e) => handleDeleteIntegrante(e, index)}><DeleteIcon width={20} /></button>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          {/* Reglamento */}
          <div className="flex flex-col mb-5">
            <button
              type="button"
              name="aceptaReglamento"
              onClick={handleChange}
              className={`text-left text-White ${errors.aceptaReglamento ? "text-Red" : ""}`}
            >
              {formData.aceptaReglamento ? "✅" : "☐"} Declaro haber leído y aceptado el{" "}
              <a
                href="/pdf/Reglamento_Mesas_Redondas_2026.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="underline hover:text-LightViolet"
              >
                Reglamento para la Presentación y Selección de Mesas Redondas
              </a>{" "}
              de las XLI Jornadas Científicas del Hospital General de Agudos D. F. Santojanni. Asimismo, acepto que la evaluación será realizada por el Comité de Mesas Redondas conforme a los criterios establecidos.
            </button>
            {errors.aceptaReglamento && (
              <span className="text-sm text-Red">{errors.aceptaReglamento}</span>
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
