import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";

const apiUrl = import.meta.env.VITE_API_URL;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Digite um e-mail e senha válidos!");
      return;
    }

    setIsLoading(true); // ativa loading

    try {
      const response = await fetch(`${apiUrl}/usuarios/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (response.status === 403) {
        toast.error(
          data.message ||
            "Usuário inativo, por favor entre em contato com suporte.",
        );
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        toast.error(data.message || "Usuário ou senha incorretos!");
        setIsLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        const userResponse = await fetch(`${apiUrl}/usuarios/auth/me`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userData = await userResponse.json();
        setUser(userData);

        toast.success("Login realizado com sucesso!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Erro ao processar login: token não recebido");
      }
    } catch (error) {
      toast.error("Erro ao acessar a API, faça contato com o suporte");
      console.error("Erro ao acessar a API:", error);
    } finally {
      setIsLoading(false); // desativa loading
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira seu e-mail abaixo para fazer login em sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-500 hover:text-white disabled:opacity-70"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Login"
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Problemas com sua conta?
          </span>
        </div>
        <Button
          type="reset"
          onClick={() => {
            toast.success("chamada problemas com sua conta");
          }}
          variant="outline"
          className="w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
        >
          Clique Aqui!
        </Button>
      </div>
    </form>
  );
}
