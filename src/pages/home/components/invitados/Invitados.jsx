import React from "react";
import InvitadosCarousel from "./InvitadosCarousel";

const Invitados = () => {
  return (
    <section className="bg-White pt-16 laptop1:ms-40 pb-20 ">
      <div>
        <h2 className="main-title text-center">Invitados especiales</h2>
      </div>
      <InvitadosCarousel />
    </section>
  );
};

export default Invitados;