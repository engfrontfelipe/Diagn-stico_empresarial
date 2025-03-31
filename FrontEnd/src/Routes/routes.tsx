import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { PrivateRoutes } from "./privateRoutes";

const Rotas = () => (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
      <Route path="/login" element={<Login/>}/>
   
   </Routes>
);

export default Rotas