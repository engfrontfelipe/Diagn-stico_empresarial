import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import { Switch } from "@/components/ui/switch";

function RegisterUser() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
  });

  const [usuarios, setUsuarios] = useState<{ id: string; nome: string; email: string; ativo: boolean }[]>([]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Função para buscar os usuários da API
  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3333/usuarios/list");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Chamar fetchUsuarios quando o componente for montado
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3333/usuarios/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.error}`);
        return;
      }

      toast.success("Usuário cadastrado com sucesso!");

      // Limpar os campos do formulário
      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmSenha: "",
      });

      // Atualizar a lista de usuários após o cadastro
      fetchUsuarios();

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Erro ao cadastrar usuário!");
    }
  };

  const toggleUserStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`http://localhost:3333/usuarios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ativo: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do usuário");
      }

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, ativo: !currentStatus } : usuario
        )
      );
      toast.success("Status do usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar status do usuário");
    }
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader title="Gestão Usuário" />
          <div className="flex flex-col px-4 lg:px-6 gap-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <SectionCards
                description="Total de Administradores Cadastrados"
                title="10 Administradores"
                footer="Valor total de administradores"
              />
              <SectionCards
                description="Total de Consultores"
                title={usuarios.length.toString().concat(" Consultores")}
                footer="Valor total de Consultores"
              />
            </div>

            <Card className="p-4 w-full">
              <div className="grid gap-4">
                <Label htmlFor="nome">Nome:</Label>
                <Input id="nome" placeholder="Robesvaldo Pereira" value={formData.nome} onChange={handleChange} />

                <Label htmlFor="email">Email:</Label>
                <Input id="email" placeholder="m@company.com.br" value={formData.email} onChange={handleChange} />

                <Label htmlFor="senha">Senha:</Label>
                <Input id="senha" type="password" placeholder="Precisa conter letras e números." value={formData.senha} onChange={handleChange} />

                <Label htmlFor="confirmSenha">Confirmação de senha:</Label>
                <Input id="confirmSenha" type="password" placeholder="Confirmação da senha" value={formData.confirmSenha} onChange={handleChange} />
              </div>
              <Button className="w-full mt-4 cursor-pointer" onClick={handleSubmit}>
                Criar usuário
              </Button>
            </Card>

            <Card className="p-4 w-full">
              <CardHeader className="font-medium">Tabela de Usuários</CardHeader>
              <Table className="shadow-md min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead>Editar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell>{usuario.nome}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        <Switch checked={usuario.ativo} onCheckedChange={() => toggleUserStatus(usuario.id, usuario.ativo)} />
                      </TableCell>
                      <TableCell>
                        <Pencil className="text-center ml-3 cursor-pointer" size={20} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default RegisterUser;
