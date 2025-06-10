import React from "react";
import { useLogin } from "../hooks/useLogin";
import VisibilityOffIcon from "./VisibilityOffIcon";
import VisibilityOnIcon from "./VisibilityOnIcon";

const SignInForm = () => {
  const { signInEmail, showPassword, togglePasswordVisibility } = useLogin();

  return (
    <div className="w-full">
      <form onSubmit={signInEmail}>
        <div className="w-full m-auto rounded-xl p-10 bg-gradient-to-b from-LightGreen to-Green text-white tablet:w-1/2 laptop1:w-1/2 laptop2:w-[500px]">
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="w-full text-White pb-2">Correo electrónico:</label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-2 py-2 mb-5 rounded-lg shadow-lightShadowGrey"
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-White pb-2">Contraseña:</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-2 py-2 mb-5 rounded-lg shadow-lightShadowGrey"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {!showPassword ? <VisibilityOffIcon width={"25px"} /> : <VisibilityOnIcon width={"25px"} />}
            </button>
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

export default SignInForm;
