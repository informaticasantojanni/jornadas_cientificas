import { useGenerateCertificados2025 } from "../hooks/useGenerateCertificados2025";
import { useRegistration } from "../hooks/useRegistration";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import ButtonVioletSM from "../../../components/buttons/ButtonVioletSM";

const Certificates2025 = () => {
  const { user } = useAuth();
  const { userData } = useProfile(user.uid);
  const { userRegistration, isSubmitting } = useRegistration();
  const { generatePDF } = useGenerateCertificados2025();

  return (
    <div className="w-full bg-White flex flex-col items-center py-10 px-3">
      <div className="w-full bg-white rounded-lg shadow-lightShadowGrey max-w-[600px]">
        <div className="w-full bg-LightGreen text-White p-5 font-semiBold rounded-lg flex justify-start items-center">
          {/* <WarningIcon width={"40px"} height={"40px"} /> */}
          <h1 className="text-xl ps-5">Mis certificados 2025</h1>
        </div>
        <div className="flex flex-col items center p-5">
          <p>Certificado de participación: </p>
          <div className="py-5 self-center">
            <ButtonVioletSM
              onClick={() => generatePDF(userData)}
              label={"Descargar"}
              disabled={
                useRegistration?.payment == "paid" ? "disabled" : "enabled"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates2025;
