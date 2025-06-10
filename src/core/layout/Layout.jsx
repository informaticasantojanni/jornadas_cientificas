import React from "react";
import FooterView from "../../components/footer/view/FooterView";
import NavDesktop from "../../components/navbar/components/NavDesktop";
import NavMobile from "../../components/navbar/components/NavMobile";
import { useGlobal } from "../../hooks/useGlobal";


const Layout = ({ children }) => {
  const { desktopView } = useGlobal();

  return (
    <div className="w-full bg-PauBackground">
      {/* NavbarView is fixed to the left side of the viewport */}
      {desktopView ? (
        <div className="fixed top-5 left-5 h-full w-32 z-10 ">
          <NavDesktop />
        </div>
      ) : (
        <div className=" w-12 z-10 ">
          <NavMobile />
        </div>
      )}


      {/* Main content area (children and FooterView) */}
      <div className="flex flex-col">
        <div>{children}</div>
        <FooterView />
      </div>
    </div>
  );
};

export default Layout;