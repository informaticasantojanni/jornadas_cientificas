import React from "react";
import { useJornadasNumero } from "./useJornadasNumeros";

const JornadasNumeros = () => {
  const { inscriptos, trabajos, disertantes, conferencias, ref } = useJornadasNumero();

  return (
    <section ref={ref} className="bg-White pt-24 laptop1:ms-40">
      <div>
        <p className="font-bold text-xl mt-10 mb-1 px-3 text-center text-White"><span className="bg-Green p-2 rounded-sm">Las jornadas 2023 en números</span></p>
        {/* <p className="mt-10 mb-1 px-3 text-center">Las jornadas 2023 en números</p> */}
        {/* Course Hightligh */}
        <div className="w-full flex flex-wrap">
          {/* Box_1 */}
          <div className="w-full flex flex-col justify-start items-center bg-TealGreen_1 py-10 px-2 tablet:w-1/2 laptop1:w-1/4">
            <p className="text-center font-poppins font-bold text-White text-[3rem]">{inscriptos}</p>
            <p className="text-center text-White">inscriptos</p>
          </div>
          {/* Box_2 */}
          <div className="w-full flex flex-col justify-start items-center bg-TealGreen_2 py-10 px-2 tablet:w-1/2 laptop1:w-1/4">
            <p className="text-center font-poppins font-bold text-White text-[3rem]">{trabajos}</p>
            <p className="text-center text-White">trabajos científicos presentados</p>
          </div>
          {/* Box_3 */}
          <div className="w-full flex flex-col justify-start items-center bg-TealGreen_1 py-10 px-2 tablet:w-1/2 laptop1:w-1/4">
            <p className="text-center font-poppins font-bold text-White text-[3rem]">{disertantes}</p>
            <p className="text-center text-White">disertantes</p>
          </div>
          {/* Box_3 */}
          <div className="w-full flex flex-col justify-start items-center bg-TealGreen_2 py-10 px-2 tablet:w-1/2 laptop1:w-1/4">
            <p className="text-center font-poppins font-bold text-White text-[3rem]">{conferencias}</p>
            <p className="text-center text-White">conferencias centrales</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JornadasNumeros;
