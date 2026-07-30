import React, { useEffect } from "react";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { useGlobal } from "../../../hooks/useGlobal";
import { useProfile } from "../hooks/useProfile";

import PagesBannerView from "../../../components/pagesBanner/view/PagesBannerView";

import AdminPagos from "../components/AdminPagos";
import AdminUserProfile from "../components/AdminUserProfile";
import PerfilRoleView from "./PerfilRoleView";
import Spinner from "../../../components/spinner/Spinner";


const PerfilView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  const { userData } = useProfile(user.uid);
  const { ROLES, perfilView, setPerfilView } = useGlobal();

  const renderProfile = () => {
    console.log("user data : ", userData);
    if (!userData?.role) return null; // Evita renderizar hasta tener los datos

    switch (userData.role) {
      case ROLES.ADMIN:
        return (
          <AdminPagos userId={user.uid} />
        );
      default:
        return (
          <PerfilRoleView userData={userData} />
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
