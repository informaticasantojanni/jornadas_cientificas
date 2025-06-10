import React, { useEffect } from "react";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import Registration from "../components/Registration";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import { useProfile } from "../hooks/useProfile";
import AdminProfile from "../components/AdminProfile";
import Spinner from "../../../components/spinner/Spinner";
import Certificates from "../components/Certificates";

const PerfilView = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll al top de la página
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  const { user } = useAuth();
  const { userData } = useProfile();

  return (
    <>
      <PagesBannerView title={"Mi perfil"} />
      {userData?.role === "admin" ? (
        <AdminProfile userId={user.uid} />
      ) : (
        <>
          <UserProfile />
          <Registration />
          <Certificates />
        </>
      )}
      <Spinner />
    </>
  );
};

export default PerfilView;
