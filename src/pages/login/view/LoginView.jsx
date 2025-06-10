import React, { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import ForgotPassword from "../components/ForgotPassword";
import Spinner from "../../../components/spinner/Spinner";

const LoginView = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll al top de la página
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  const { isRegistered, setIsRegistered } = useLogin();
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <div>
      <PagesBannerView title="Ingresar" />
      <section className="mt-3 py-10 px-5 rounded-tl-xl bg-White flex flex-col items-center laptop1:ms-40">
        {isRegistered ? (
          <div className="w-full">
            {!forgotPassword ? <SignInForm /> : <ForgotPassword />}
            <div className="pt-5">
              {/* Switch registration */}
              <div>
                <p className="text-center">
                  ¿No tienes cuenta?
                  <button
                    className="ps-2 text-blue-500 underline"
                    onClick={() => setIsRegistered(false)}
                  >
                    Click <strong>aquí</strong> para registrarse
                  </button>
                </p>
              </div>

              {/* Switch login */}
              <div className="pt-5">
                <p className="text-center">
                  {!forgotPassword ? (
                    <>
                      ¿Olvidaste tu contraseña?
                      <button
                        className="ps-2 text-blue-500 underline"
                        onClick={() => setForgotPassword(true)}
                      >
                        Click <strong>aquí</strong> para recuperar la contraseña
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="ps-2 text-blue-500 underline"
                        onClick={() => setForgotPassword(false)}
                      >
                        Click <strong>aquí</strong> para iniciar sesión
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <SignUpForm />
            <div className="pt-5">
              <p className="text-center">
                ¿Tienes cuenta?
                <button
                  className="ps-2 text-blue-500 underline"
                  onClick={() => setIsRegistered(true)}
                >
                  Click <strong>aquí</strong> para ingresar
                </button>
              </p>
            </div>
          </div>
        )}
      </section>
      <Spinner />
    </div>
  );
};

export default LoginView;
