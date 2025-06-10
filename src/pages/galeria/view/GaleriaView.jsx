import React, {useEffect} from "react";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";

const GaleriaView = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll al top de la página
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  return (
    <div>
      <PagesBannerView title={"Registro multimedia"} />
      <section className="mt-3 rounded-tl-xl bg-White flex flex-col items-center px-3 py-10 laptop1:ms-40">
        <p className="p-10">Asi vivimos las Jornadas 2023</p>
        <div className="w-[350px] h-[200px] tablet:w-[700px] tablet:h-[400px] laptop1:w-[850px] laptop1:h-[480px]">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/U3UP9GNJC6c"
            title="Tour Virtual Jornadas Científicas 2023 - Hospital Santojanni"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default GaleriaView;
