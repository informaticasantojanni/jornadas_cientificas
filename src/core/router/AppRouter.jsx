import { Navigate, createBrowserRouter, createHashRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Layout from "../layout/Layout";
import HomeView from "../../pages/home/view/HomeView";
import Programa from "../../pages/programa/view/ProgramaView";
import Comisiones from "../../pages/comisiones/view/ComisionesView";
import Download from "../../pages/download/view/DownloadView";
import Galeria from "../../pages/galeria/view/GaleriaView";
import Login from "../../pages/login/view/LoginView";
import PerfilView from "../../pages/perfil/view/PerfilView";

export const appRouter = createHashRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Layout>
          <HomeView />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <PublicRoute>
        <Layout>
          <HomeView />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: "/programa",
    element: (
      <PublicRoute>
        <Layout>
          <Programa />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: "/comisiones",
    element: (
      <PublicRoute>
        <Layout>
          <Comisiones />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: "/descarga",
    element: (
      <PublicRoute>
        <Layout>
          <Download />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: "/galeria",
    element: (
      <PublicRoute>
        <Layout>
          <Galeria />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Layout>
          <Login />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: "/perfil",
    element: (
      <PrivateRoute>
        <Layout>
          <PerfilView />
        </Layout>
      </PrivateRoute>
    ),
  },
]);
