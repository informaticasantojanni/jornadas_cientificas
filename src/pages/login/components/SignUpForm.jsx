import React from "react";
import VisibilityOffIcon from "./VisibilityOffIcon";
import VisibilityOnIcon from "./VisibilityOnIcon";
import { useSignUpForm } from "../hooks/useSignUpForm";
import ReCAPTCHA from "react-google-recaptcha";
import { serviciosList } from "./serviciosList";

const SignUpForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleCaptchaChange,
  } = useSignUpForm();

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full m-auto rounded-xl p-10 bg-gradient-to-b from-LightGreen to-Green text-white tablet:w-1/2 laptop1:w-1/2 laptop2:w-[500px]">
          <div className="flex flex-col mb-5">
            <label className="text-White pb-2">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${
                errors.name && "focus:outline border border-Red"
              }`}
            />
            {errors.name && (
              <span className="text-sm text-Red">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-White pb-2">Apellido:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${
                errors.lastName && "focus:outline border border-Red"
              }`}
            />
            {errors.lastName && (
              <span className="text-sm text-Red">{errors.lastName}</span>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-White pb-2">DNI:</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${
                errors.dni && "focus:outline border border-Red"
              }`}
            />
            {errors.dni && (
              <span className="text-sm text-Red">{errors.dni}</span>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-White pb-2">Celular:</label>
            <input
              type="text"
              name="cell"
              value={formData.cell}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${
                errors.cell && "focus:outline border border-Red"
              }`}
            />
            {errors.cell && (
              <span className="text-sm text-Red">{errors.cell}</span>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-White pb-2">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${
                errors.email && "focus:outline border border-Red"
              }`}
            />
            {errors.email && (
              <span className="text-sm text-Red">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-White pb-2">Servicio:</label>
            <select
              name="servicio"
              value={formData.servicio} // Assuming you have state in your formData
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${
                errors.servicio && "focus:outline border border-Red"
              }`}
            >
              <option value="">Seleccione...</option> {/* Placeholder option */}
              {serviciosList.map((servicio, index) => (
                <option key={index} value={servicio}>{servicio}</option>
              ))}
            </select>
            {errors.servicio && (
              <span className="text-sm text-Red">{errors.servicio}</span>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-White pb-2">Categoría:</label>
            <select
              name="category"
              value={formData.category} // Assuming you have state in your formData
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${
                errors.category && "focus:outline border border-Red"
              }`}
            >
              <option value="">Seleccione...</option> {/* Placeholder option */}
              <option value="bioquimico">Bioquímico/a</option>
              <option value="enfermero">Enfermero/a</option>
              <option value="estudiante">Estudiante</option>
              <option value="farmaceutico">Farmacéutico/a</option>
              <option value="kinesiologo">Kinesiologo/a</option>
              <option value="medico">Médico/a</option>
              <option value="residente">Residente</option>
              <option value="trabajador_social">Trabajador/a Social</option>
              <option value="otros">Otros</option>

            </select>
            {errors.category && (
              <span className="text-sm text-Red">{errors.category}</span>
            )}
          </div>
          <div className="flex flex-col mb-5 relative">
            <label className="text-White pb-2">Contraseña:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow ${
                errors.password && "focus:outline border border-Red"
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[3.2rem] transform -translate-y-1/2 text-gray-600"
            >
              {!showPassword ? (
                <VisibilityOffIcon width={"25px"} />
              ) : (
                <VisibilityOnIcon width={"25px"} />
              )}
            </button>
            {errors.password && (
              <span className="text-sm text-Red">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center pt-5">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />
        </div>
        <div className="w-full flex justify-center pt-5">
          <button
            className="w-[150px] text-xl font-bold px-5 py-3 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
            type={"submit"}
            label={"Enviar"}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
