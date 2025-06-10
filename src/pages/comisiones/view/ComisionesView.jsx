import React, {useEffect} from "react";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import ComisionesContainer from "../components/ComisionesContainer";

const ComisionesView = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll al top de la página
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  return (
    <div>
      <PagesBannerView title={"Comisiones"} />
      <section className="mt-3 rounded-tl-xl bg-White flex flex-col items-center px-3 laptop1:ms-40">
        <ComisionesContainer />
      </section>
    </div>
  );
};

export default ComisionesView;
