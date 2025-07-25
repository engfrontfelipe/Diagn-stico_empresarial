import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { PrivateRoutes } from "./privateRoutes";
import RegisterUser from "@/pages/RegisterUser";
import RegisterClient from "@/pages/RegisterClient";
import RegisterQuest from "@/pages/RegisterQuestion";
import PageClient from "@/pages/PageClient";
import PageResult from "@/pages/PageResult";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />

      <Route
        path="/register_user"
        element={
          <PrivateRoutes allowedRoles={["admin"]}>
            <RegisterUser />
          </PrivateRoutes>
        }
      />

      <Route
        path="/register_client"
        element={
          <PrivateRoutes allowedRoles={["admin"]}>
            <RegisterClient />
          </PrivateRoutes>
        }
      />

      <Route
        path="/register_quest"
        element={
          <PrivateRoutes allowedRoles={["admin"]}>
            <RegisterQuest />
          </PrivateRoutes>
        }
      />

      <Route
        path="/clientes/:id"
        element={
          <PrivateRoutes>
            <PageClient />
          </PrivateRoutes>
        }
      />

      <Route
        path="/cliente/ccadsvakocpa7ccijccc65366565g6fv6v5v559xq/result/:id"
        element={<PageResult idCliente={""} />}
      />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Rotas;
