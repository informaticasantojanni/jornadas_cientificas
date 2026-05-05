import React, {useEffect} from "react";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import ProgramaContainer from "../components/ProgramaContainer";
import NavPrograma from "../components/NavPrograma";
import ProgramaProvider from "../provider/ProgramaProvider";
import SearchProgram from "../components/SearchProgram";

const ProgramaView = () => {
  useEffect(() => {
    // Scroll al top de la página al cargar
    window.scrollTo(0, 0);
  }, []);

  return (
    <ProgramaProvider>
      <div>
        <PagesBannerView title={"Programa"} />
        <section className="mt-3 rounded-tl-xl bg-White flex flex-col items-center px-3 laptop1:ms-40">
          <NavPrograma />
          <SearchProgram />
          <ProgramaContainer />
        </section>
      </div>
    </ProgramaProvider>
  );
};

export default ProgramaView;
