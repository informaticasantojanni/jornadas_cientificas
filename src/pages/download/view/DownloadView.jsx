import React, { useEffect } from "react";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import Table from "../components/Table";
import DescargarCertificados from "../components/DecargarCertificados";



const DownloadView = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll al top de la página
  }, []); // El array vacío asegura que se ejecute solo al montar el componente


  return (
    <div>
      <PagesBannerView title="Descargas" />
      {/* <section className=" mt-3 py-10 px-2 rounded-tl-xl bg-White flex flex-col items-center laptop1:ms-40">
        <Table />
      </section> */}
      <section className="py-10 px-2 bg-White flex flex-col items-center laptop1:ms-40">
        <DescargarCertificados />
      </section>
    </div>
  );
};


export default DownloadView;