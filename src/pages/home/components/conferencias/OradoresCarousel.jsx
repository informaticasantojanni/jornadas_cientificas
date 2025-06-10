import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { oradoresList } from "./oradoresList";
import OradorCard from "./OradorCard";


const OradoresCarousel = () => {
  return (
    <div className="w-[300px] tablet:w-[600px] laptop1:w-[900px] laptop2:w-[1200px] m-auto">
      <Swiper
        loop={false}
        centeredSlides={true}
        navigation={{ clickable: true }} // Properly configure pagination
        initialSlide={3} // Muestra el segundo slide al cargar
        modules={[Navigation]} // Add the Navigation module
        breakpoints={{
          300: {
            slidesPerView: 1, // Para pantallas pequeñas
          },
          768: {
            slidesPerView: 2, // Para pantallas más grandes
          },
          1024: {
            slidesPerView: 3, // Para pantallas muy grandes
          },
          1360: {
            slidesPerView: 4,
          },
        }}
      >
        {oradoresList.map((orador) => (
          <SwiperSlide key={orador.id}>
            <OradorCard orador={orador} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OradoresCarousel;
