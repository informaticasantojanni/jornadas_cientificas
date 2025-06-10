import React from "react";
import OradoresCarousel from "./OradoresCarousel";
const Conferencias = () => {
  return (
    <section className="laptop1:ms-40 relative">
      <div
        className="relative w-full h-[800px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), url('/images/conferencias_background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <h2 className="main-title text-center text-White py-10 relative z-20">
          Conferencias centrales
        </h2>
        <OradoresCarousel />
      </div>
    </section>
  );
};

export default Conferencias;
