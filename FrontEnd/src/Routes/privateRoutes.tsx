import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 

interface PrivateRoutesProps {
  children: ReactNode;
}

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");

  if (!token) return false; 

  try {
    const decoded: { exp: number } = jwtDecode(token); 
    const currentTime = Date.now() / 1000; 
    return decoded.exp > currentTime;
  } catch (error) {
    return false; 
  }
};

export function PrivateRoutes({ children }: PrivateRoutesProps) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}
