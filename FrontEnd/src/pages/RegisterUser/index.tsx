import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RegisterUser() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
    role: "",
  });

  const [usuarios, setUsuarios] = useState<
    {
      id_usuario: string;
      nome: string;
      email: string;
      ativo: boolean;
      role: string;
    }[]
  >([]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/usuarios/list`);
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/usuarios/create`, {
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

      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmSenha: "",
        role: "",
      });

      fetchUsuarios();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Erro ao cadastrar usuário!");
    }
  };

  const toggleUserStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${apiUrl}/usuarios/${id}`, {
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
          usuario.id_usuario === id
            ? { ...usuario, ativo: !currentStatus }
            : usuario,
        ),
      );
      toast.success("Status do usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar status do usuário");
    }
  };

  const updateUserData = async (
    id: string,
    updatedData: {
      nome?: string;
      email?: string;
      senha?: string;
      role?: string;
    },
  ) => {
    try {
      const response = await fetch(`${apiUrl}/usuarios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados do usuário");
      }

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id_usuario === id ? { ...usuario, ...updatedData } : usuario,
        ),
      );
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar dados do usuário");
    }
  };

  const [editUserData, setEditUserData] = useState({
    id: "",
    nome: "",
    email: "",
    senha: "",
    role: "",
  });

  const handleChangeEdit = (e: any) => {
    setEditUserData({ ...editUserData, [e.target.id]: e.target.value });
  };

  const handleUpdateUser = async () => {
    const { id, nome, email, senha } = editUserData;

    if (!nome || !email) {
      toast.error("Nome e email são obrigatórios!");
      return;
    }

    await updateUserData(id, {
      nome,
      email,
      senha: senha || undefined,
      role: editUserData.role,
    });
    toast.success("Usuário atualizado!");
    fetchUsuarios();
  };

  const usuarioIsActive = () => {
    const activeUsers = usuarios.filter((usuario) => usuario.ativo);
    return activeUsers.length;
  };
  const renderLoading = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-accent border-solid rounded-full animate-spin border-t-primary"></div>
    </div>
  );

  if (!usuarios || usuarios.length === 0) {
    return renderLoading();
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset id="top">
          <SiteHeader title="Gestão Usuários" icon={false} />
          <div className="flex flex-col px-4 lg:px-6 gap-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <SectionCards
                description="Total de Usuários:"
                title={`${usuarios.length} usuários`}
                footer={`Valor total de usuários ativos é de ${usuarioIsActive()} usuários.`}
              />
            </div>

            <Card className="p-4 w-full">
              <div className="grid grid-cols-2 gap-4">
                <Label className="text-[15x]" htmlFor="nome">
                  Nome:
                </Label>
                <Input
                  id="nome"
                  className="-ml-10"
                  placeholder="Robesvaldo Pereira"
                  value={formData.nome}
                  onChange={handleChange}
                />

                <Label className="text-[15x]" htmlFor="email">
                  Email:
                </Label>
                <Input
                  id="email"
                  className="-ml-10"
                  placeholder="m@company.com.br"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Label className="text-[15px]" htmlFor="senha">
                  Senha:
                </Label>
                <Input
                  id="senha"
                  type="password"
                  className="-ml-10"
                  placeholder="Precisa conter letras e números."
                  value={formData.senha}
                  onChange={handleChange}
                />

                <Label className="text-[15px]" htmlFor="confirmSenha">
                  Confirmação de senha:
                </Label>
                <Input
                  id="confirmSenha"
                  type="password"
                  className="-ml-10"
                  placeholder="Confirmação da senha"
                  value={formData.confirmSenha}
                  onChange={handleChange}
                />

                <Label className="text-[15px]">Tipo de usuário</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="-ml-10 w-full">
                    <SelectValue
                      placeholder="Selecione"
                      defaultValue={formData.role}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultant">Consultor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full mt-1 cursor-pointer"
                onClick={handleSubmit}
              >
                Criar usuário
              </Button>
            </Card>

            <Card className="p-4 w-full">
              <Table className="shadow-md min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead>Editar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id_usuario}>
                      <TableCell>{usuario.nome}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        {usuario.role === "admin"
                          ? "Administrador"
                          : "Consultor"}
                      </TableCell>
                      <TableCell>
                        <Switch
                          className="cursor-pointer"
                          checked={usuario.ativo}
                          onCheckedChange={() =>
                            toggleUserStatus(usuario.id_usuario, usuario.ativo)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger
                            onClick={() =>
                              setEditUserData({
                                id: usuario.id_usuario,
                                nome: usuario.nome,
                                email: usuario.email,
                                senha: "",
                                role: "",
                              })
                            }
                          >
                            <Pencil
                              className="text-center ml-3 cursor-pointer"
                              size={20}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="mb-2">
                                Editar Usuário
                              </DialogTitle>
                              <DialogDescription>
                                <Label className="mb-2 mt-2 font-medium">
                                  Nome
                                </Label>
                                <Input
                                  id="nome"
                                  value={editUserData.nome}
                                  onChange={handleChangeEdit}
                                  placeholder="Digite o nome"
                                />

                                <Label className="mb-2 mt-2 font-medium">
                                  Email
                                </Label>
                                <Input
                                  id="email"
                                  value={editUserData.email}
                                  onChange={handleChangeEdit}
                                  placeholder="Digite o Email"
                                />

                                <Label className="mb-2 mt-2 font-medium">
                                  Senha
                                </Label>
                                <Input
                                  id="senha"
                                  type="password"
                                  value={editUserData.senha}
                                  onChange={handleChangeEdit}
                                  placeholder="Digite a nova senha (opcional)"
                                />

                                <Label className="mt-2">Tipo de usuário</Label>
                                <Select
                                  value={editUserData.role}
                                  onValueChange={(value) =>
                                    setEditUserData((prev) => ({
                                      ...prev,
                                      role: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="consultant">
                                      Consultor
                                    </SelectItem>
                                    <SelectItem value="admin">
                                      Administrador
                                    </SelectItem>
                                  </SelectContent>
                                </Select>

                                <Button
                                  className="mt-5 w-full cursor-pointer"
                                  onClick={handleUpdateUser}
                                >
                                  Editar
                                </Button>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="bottom-center" richColors closeButton />
    </>
  );
}

export default RegisterUser;
