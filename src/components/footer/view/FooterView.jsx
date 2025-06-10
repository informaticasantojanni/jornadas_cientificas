import React from "react";

const FooterView = () => {
  return (
    <div className="bg-PauBaseComponents laptop1:ms-40">
      {/* Thin line on top */}
      <div className="w-full border-t-8 border-Green mb-5" />

      {/* <div className="flex flex-col laptop1:flex-row laptop1:justify-between laptop1:items-center"> */}
      <div className="grid grid-cols-1 laptop1:grid-cols-3 gap-10 p-10">

        {/* Logo Jornadas*/}
        <div className="flex items-center justify-center laptop1:justify-start h-full ">
          <img
            className="h-[80px]"
            src="/images/logo_jornadas.png"
            alt="Logo jornadas"
          />
        </div>

        {/* Contact Information */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p>Pilar 950 CABA</p>
            <p>4630-5500</p>
            <p>
              <a
                href="mailto:santojanni.jornadas@gmail.com"
                className="text-blue-400 hover:underline"
              >
                santojanni.jornadas@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Logo Hospi*/}
        <div className="flex justify-center laptop1:justify-end">
          <img
            className="w-[150px]"
            src="/images/logo-hospi.png"
            alt="Logo jornadas"
          />
        </div>
      </div>
      <div className="bg-CardGrayLight">
        <p className="text-sm font-semiBold text-center py-2">Desarrollado por Sistemas Hospital Santojanni</p>
      </div>
    </div>
  );
};

export default FooterView;
