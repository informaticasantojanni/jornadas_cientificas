import React, { useEffect } from "react";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import Registration from "../components/Registration";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import { useProfile } from "../hooks/useProfile";
import AdminProfile from "../components/AdminProfile";
import Spinner from "../../../components/spinner/Spinner";
import Certificates from "../components/Certificates";
import TemasLibres from "../components/TemasLibres";
import AdminTemasLibres from "../components/AdminTemasLibres";

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
        return <AdminProfile userId={user.uid} />;
      case "temasLibresPresidente":
        return <AdminTemasLibres userId={user.uid}/>;
      case "temasLibresVocal":
        return <AdminTemasLibres userId={user.uid}/>;
      case "user":
      default:
        return (
          <>
            <UserProfile />
            <Registration />
            <TemasLibres />
            <Certificates />
          </>
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
