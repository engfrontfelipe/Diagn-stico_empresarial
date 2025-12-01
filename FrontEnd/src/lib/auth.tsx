import { createContext, useContext, useEffect, useState } from "react";
const apiUrl = "https://backend-backend-diagnostico.yjayid.easypanel.host";

// Incluí o campo `role` na interface do usuário
interface User {
  id: string;
  nome: string;
  email: string;
  role: string; // <-- campo usado para limitar acesso por tipo de usuário
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${apiUrl}/usuarios/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar usuário");

        const data: User = await response.json();

        // Certifique-se de que o backend realmente retorna o campo `role`
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
