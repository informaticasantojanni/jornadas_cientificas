import { useRegistration } from "../hooks/useRegistration";
import WarningIcon from "./WarningIcon";
import SuccessIcon from "./SuccessIcon";
import TemasLibresIcons from "./TemasLibresIcon";
import { Link } from "react-router-dom";

const TemasLibres = () => {
  const { userRegistration, handleRegistration, isSubmitting } =
    useRegistration();

  return (
    <div className="laptop1:ms-40 bg-White flex flex-col items-center py-10 px-3">
      <div className="w-full bg-white rounded-lg shadow-lightShadowGrey max-w-[600px]">
        <div className="w-full bg-LightGreen text-White p-5 font-semiBold rounded-lg flex justify-start items-center">
          {userRegistration?.status == "registered" ? (
            <TemasLibresIcons width={"40px"} height={"40px"} />
          ) : (
            <WarningIcon width={"40px"} height={"40px"} />
          )}
          <h1 className="text-xl ps-5">Temas Libres 2025</h1>
        </div>
        <div className="p-5">
          {userRegistration ? (
            <div className="flex justify-center">
              <Link
                className="w-[250px] text-center text-lg font-semiBol px-5 py-1 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
                to={"/temasLibres"}
              >
                Presentar Trabajos
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <p>Para presentar trabajos de Temas Libres, por favor inscríbete.</p>
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
    </div >
  );
};

export default TemasLibres;
