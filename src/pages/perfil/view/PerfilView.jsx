import React, { useEffect } from "react";
import UserDatos from "../components/UserDatos";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import Registration from "../components/Registration";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import { useProfile } from "../hooks/useProfile";
import AdminPagos from "../components/AdminPagos";
import Spinner from "../../../components/spinner/Spinner";
import Certificates from "../components/Certificates";
import TemasLibres from "../components/TemasLibres";
import AdminTemasLibres from "../components/AdminTemasLibres";
import AdminUserProfile from "../components/AdminUserProfile";
import AdminTemasLibresView from "../components/AdminTemasLibresView";

const PerfilView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  const { userData } = useProfile();

  const renderProfile = () => {
    if (!userData?.role) return null; // Evita renderizar hasta tener los datos

    switch (userData.role) {
      case "admin":
        return <AdminPagos userId={user.uid} />;
      case "temasLibresPresidente":
        return (
          <AdminTemasLibresView />
        )
      case "temasLibresVocal":
        return (
          <AdminTemasLibresView />
        )
      case "user":
      default:
        return (
          <AdminUserProfile />
        );
    }
  };

  return (
    <>
      <PagesBannerView title="Mi perfil" />
      {renderProfile()}
      <Spinner />
    </>
  );
};


export default PerfilView;
