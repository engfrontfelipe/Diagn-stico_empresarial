import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AccessDenied from "@/pages/AcessDenied";

interface PrivateRoutesProps {
  children: ReactNode;
  allowedRoles?: string[];
}

interface DecodedToken {
  exp: number;
  role: string;
}

export function PrivateRoutes({ children, allowedRoles }: PrivateRoutesProps) {
  const [authorized, setAuthorized] = useState<null | boolean>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthorized(false);
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        if (allowedRoles && !allowedRoles.includes(decoded.role)) {
          setAccessDenied(true);
          return;
        }

        setAuthorized(true);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    };

    checkAccess();
  }, [allowedRoles, navigate]);

  if (authorized === null && !accessDenied) return null;
  if (accessDenied) return <AccessDenied />;

  return authorized ? <>{children}</> : null;
}
