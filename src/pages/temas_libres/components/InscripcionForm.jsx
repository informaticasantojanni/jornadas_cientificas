import { useInscripcionForm } from "../hooks/useInscripcionForm";
import ReCAPTCHA from "react-google-recaptcha";

const InscripcionForm = () => {
  const {
    handleSubmit,
    handleChange,
    formData,
    errors,
    handleCaptchaChange
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
              value={formData.titulo}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                }`}
            />
          </div>

          {/* Área temática */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Área temática:</label>
            <input
              type="text"
              name="areaTematica"
              value={formData.areaTematica}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                }`}
            />
          </div>

          {/* Autores */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Autor/autores:</label>
            <textarea
              name="autores"
              value={formData.autores}
              onChange={handleChange}
              rows={3}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                }`}
            />
          </div>

          {/* Abstract */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Subir PDF del Abstract:</label>
            <input
              type="file"
              name="abstract"
              accept=".pdf"
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                }`}
            />
          </div>


          {/* Presenta a premio */}
          <div className="flex items-center gap-4 mb-5">
            <button
              type="button"
              name="presentaPremio"
              value = {formData.presentaPremio}
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
                onChange={handleChange}
                className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                  }`}
              />
            </div>
          )}

          {/* Lugar de realización */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Lugar donde fue realizado:</label>
            <input
              type="text"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                }`}
            />
          </div>

          {/* Contacto */}
          <div className="flex flex-col mb-5">
            <label className="text-White w-full pb-2">Responsable/Contacto:</label>
            <input
              type="text"
              name="contactoNombre"
              placeholder="Nombre y apellido"
              value={formData.contactoNombre}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                }`}
            />
            <input
              type="text"
              name="contactoCelular"
              placeholder="Celular"
              value={formData.contactoCelular}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                }`}
            />
            <input
              type="text"
              name="contactoEmail"
              placeholder="Email"
              value={formData.contactoEmail}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${errors.name && "focus:outline border border-Red"
                }`}
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
