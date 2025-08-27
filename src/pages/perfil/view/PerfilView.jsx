import React, { useEffect } from "react";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";
import { useProfile } from "../hooks/useProfile";
import AdminPagos from "../components/AdminPagos";
import Spinner from "../../../components/spinner/Spinner";
import AdminUserProfile from "../components/AdminUserProfile";
import AdminTemasLibresView from "../components/AdminTemasLibresView";
import { useGlobal } from "../../../hooks/useGlobal";

const PerfilView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  const { userData } = useProfile(user.uid);
  const {PERFILES} = useGlobal()

  const renderProfile = () => {
    console.log("user data : ", userData);
    if (!userData?.role) return null; // Evita renderizar hasta tener los datos

    switch (userData.role) {
      case PERFILES.ADMIN:
        return <AdminPagos userId={user.uid} />;
      case PERFILES.TEMAS_LIBRES_PRESIDENTE:
        return (
          <AdminTemasLibresView userData = {userData}/>
        )
      case PERFILES.TEMAS_LIBRES_VOCAL:
        return (
          <AdminTemasLibresView userData = {userData}/>
        )
      case PERFILES.USER:
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
