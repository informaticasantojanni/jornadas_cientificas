import React from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { invitadosList } from "./invitadosList";
import InvitadosCard from "./InvitadosCard";
import "./invitados.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const InvitadosCarousel = () => {
  return (
    <div className="w-[300px] tablet:w-[600px] laptop1:w-[900px] m-auto">
    
      <Swiper
        loop={false}
        centeredSlides={false}
        navigation={true} // Enable navigation arrows
        modules={[Navigation]} // Add the Navigation module
        breakpoints={{
          360: {
            slidesPerView: 1, // Para pantallas pequeñas
          },
          768: {
            slidesPerView: 2, // Para pantallas más grandes
          },
          1024: {
            slidesPerView: 3, // Para pantallas muy grandes
          },
        }}
      >
        {invitadosList.map((invitado) => (
          <SwiperSlide key={invitado.id}>
            <InvitadosCard invitado={invitado} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InvitadosCarousel;
