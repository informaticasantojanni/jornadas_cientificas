import React from "react";
import { Link } from 'react-router-dom'


const Autoridades = () => {
  const authorities = [
    { title: "Director HDFS", name: "Dr. Federico Charabora" },
    { title: "Subdirector HDFS", name: "Dr. Carlos Falco" },
    {
      title: "President AMM Filial Santojanni",
      name: "Dr. Marcelo Struminger",
    },
    { title: "Presidenta", name: "Dra. María Vivona" },
    { title: "Vicepresidente", name: "Dr. Daniel Coso" },
    { title: "Secretario General", name: "Dr. Fernando Saldarini" },
    { title: "Secretario Adjunto", name: "Dr. José Retamozo" },
    { title: "Tesorero", name: "Dr. Lucas Landolfi" },
  ];

  return (
    <section className="bg-White pt-36 pb-10 laptop1:ms-40 relative">
      <div
        className="flex flex-col items-center px-2 pt-10 pb-24 relative"
        style={{
          backgroundImage: "url('/images/autoridades_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "right top",
        }}
      >
        {/* Transparent Layer */}
        <div className="absolute inset-0 bg-Black opacity-50"></div>
        <h2 className="main-title text-White text-center pb-10 relative z-10">
          Autoridades
        </h2>

        <div className="inner-container grid grid-cols-1 sm:grid-cols-3 gap-6 mx-auto relative z-10">
          {authorities.map((authority, index) => (
            <div
              key={index}
              className="bg-White opacity-90 rounded-lg p-5 shadow-lightShadowGrey hover:shadow-LightViolet transition-shadow duration-200 flex flex-col justify-center items-center hover:opacity-100"
            >
              <h3 className="text-xl font-semibold">{authority.title}</h3>
              <p className="text-gray-700 mt-2">{authority.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Link
      to={'/comisiones'}
        className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xl font-bold px-10 py-5 bg-LightViolet text-White rounded-full hover:bg-Violet hover:shadow-lg transition duration-300 ease-in-out"
        style={{ bottom: "40px" }} // Adjust this value if the button size or position needs tweaking
      >
        Comisiones
      </Link>
    </section>
  );
};

export default Autoridades;
