import TemasLibresTable from "./TemasLibresTable";
import TemasLibresProcess from "./TemasLibresProcess";
import { useGlobal } from "../../../hooks/useGlobal";


const AdminTemasLibres = ({ userData }) => {

  const { internalView } = useGlobal();
  let content;
  if (internalView === "temasLibres") {
    content = <TemasLibresTable userData={userData} />;
  } else if (internalView === "procesarTemasLibres") {
    content = <TemasLibresProcess userData={userData} />;
  }

  return (
    <div className="w-auto h-full mt-3 px-3 rounded-tl-xl bg-White flex flex-col items-center">
      <h2 className="w-full text-Black p-2 font-poppins text-lg font-semiBold">
        Bienvenido {userData?.name || "Usuario"}!
      </h2>

      {content}

    </div>
  );
};

export default AdminTemasLibres;
