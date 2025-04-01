import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { PrivateRoutes } from "./privateRoutes";
import RegisterUser from "@/pages/RegisterUser";

const Rotas = () => (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
      <Route path="/registeruser" element={<PrivateRoutes><RegisterUser/></PrivateRoutes>}/>
      <Route path="/login" element={<Login/>}/>
   
   </Routes>
);

export default Rotas