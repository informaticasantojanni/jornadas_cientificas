import { useRegistration } from "../hooks/useRegistration";
import WarningIcon from "./WarningIcon";
import SuccessIcon from "./SuccessIcon";

const Registration = () => {
  const { userRegistration, handleRegistration, isSubmitting } =
    useRegistration();

  return (
    <div className="laptop1:ms-40 bg-White flex flex-col items-center pt-10 px-3">
      <div className="w-full bg-white rounded-lg shadow-lightShadowGrey max-w-[600px]">
        <div className="w-full bg-LightGreen text-White p-5 font-semiBold rounded-lg flex justify-start items-center">
          {userRegistration?.payment != "paid" && (
            <WarningIcon width={"40px"} height={"40px"} />
          )}
          {userRegistration?.payment == "paid" && (
            <SuccessIcon width={"40px"} height={"40px"} />
          )}
          <h1 className="text-xl ps-5">Jornadas 2024</h1>
        </div>
        <div className="p-5">
          {userRegistration ? (
            <div>
              <div className="flex ">
                <p className="">Inscripción:</p>
                <p className="ps-5">Registrado</p>
              </div>
              <div className="flex pt-5 items-center">
                <p className="pe-5">Arancel:</p>
                {userRegistration?.payment === "exento" ? (
                  <p>Exento</p>
                ) : userRegistration?.payment === "pending" ? (
                  <p className="bg-LightViolet text-White p-1">Pendiente - Pasar por AMM</p>
                ) : (
                  <p>Pagado</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <button
                className="text-lg font-semiBold px-5 py-2 bg-LightViolet text-White rounded-md hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
                onClick={() => handleRegistration()}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Inscribirme"}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <div className="flex flex-col items-start">
        <p>Para poner en el panel del Admin</p>
        {userRegistration?.payment == "paid" ? (
          <p>Pago del arancel: pagado</p>
        ) : (
          <button onClick={() => handlePayment(userId)}>Confirmar pago</button>
        )}
      </div> */}
    </div>
  );
};

export default Registration;
