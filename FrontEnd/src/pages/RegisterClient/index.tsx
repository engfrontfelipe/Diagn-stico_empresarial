import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Pencil } from "lucide-react";
import { toast, Toaster } from "sonner";


export default function RegisterUser() {
  
  const [client, setClient] = useState({
    nome_empresa: "",
    nome_responsavel: "",
    cnpj: "",
  });

  const [clientes, setClientes] = useState<{ nome_responsavel: string; nome: string; cnpj: string; id: string; ativo: boolean }[]>([]);

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);

    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    let newValue = value;

    if (id === "cnpj") {
      newValue = formatCNPJ(value);
    }
    setClient((prev) => ({ ...prev, [id]: newValue }));
  };

  const [editClientData, setEditClientData] = useState({
    id: "",
    nome_empresa: "",
    nome_responsavel: "",
    cnpj: "",
  });

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    let newValue = value;

    if (id === "cnpj") {
      newValue = formatCNPJ(value);
    }
    setEditClientData((prev) => ({ ...prev, [id]: newValue }));    
  };

  const cadastrarCliente = (e: React.FormEvent) => {
    e.preventDefault();

    const { nome_empresa, nome_responsavel, cnpj } = client;

    if (!nome_empresa || !nome_responsavel) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    fetch("http://localhost:3333/clientes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome_empresa,
        nome_responsavel,
        cnpj, 
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar cliente.");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Cliente cadastrado com sucesso!");
        console.log("Novo cliente cadastrado:", data);
        fetchClientes();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao cadastrar cliente.");
      });
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:3333/clientes/list");
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const toggleClientStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`http://localhost:3333/clientes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ativo: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do usuário");
      }

      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === id ? { ...cliente, ativo: !currentStatus } : cliente,
        ),
      );
      toast.success("Status do usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar status do usuário");
    }
  };



  const updateClientData = async (
    id: string,
    updatedData: { nome_responsavel?: string; nome?: string; cnpj?: string },
  ) => {
    try {
      const response = await fetch(`http://localhost:3333/clientes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados do Cliente");
      }

      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === id ? { ...cliente, ...updatedData } : cliente,
        ),
      );

      toast.success("Dados do Cliente atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar Cliente:", error);
      toast.error("Erro ao atualizar dados do Cliente");
    }
  };

  const handleUpdateUser = async () => {
    const { id, nome_empresa, nome_responsavel, cnpj } = editClientData;

    if (!nome_empresa || !nome_responsavel) {
      toast.error("Nome e email são obrigatórios!");
      return;
    }

    await updateClientData(id, { nome: nome_empresa, nome_responsavel, cnpj: cnpj || undefined });
    console.log('Cliente atualizado:');
  };

  const clientIsActive =() => {
    const activeClients = clientes.filter((cliente) => cliente.ativo);
    return activeClients.length;
  }

    return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Gestão de Clientes" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
              <SectionCards
                  description="Total de Clientes:"
                  title={`${clientes.length} clientes`}
                  footer={`O valor total de clientes ativos é de ${clientIsActive()} clientes.`}
                />
              </div>
              <div className="px-4 lg:px-6 grid gap-6 md:grid-cols-1">
                <Card className="p-4 w-full">
                  <div className="grid gap-4">
                   <Label htmlFor="nome_empresa">Nome da Empresa:</Label>
                    <Input
                      id="nome_empresa"
                      placeholder="Nome da empresa"
                      type="text"
                      value={client.nome_empresa}
                      onChange={handleChange}
                    />

                    <Label htmlFor="nome_responsavel">
                      Nome do Responsável:
                    </Label>
                    <Input
                      id="nome_responsavel"
                      type="text"
                      placeholder="Nome do responsável"
                      value={client.nome_responsavel}
                      onChange={handleChange}
                    />
                    <Label>CNPJ:</Label>
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="99.999.999/9999-99"
                      value={client.cnpj}
                      onChange={handleChange}
                    >
                    </Input>
                
                  </div>
                  <Button onClick={cadastrarCliente} className="w-full mt-4 cursor-pointer">
                    Criar Cliente
                  </Button>
                </Card>

                <Card className="p-4 w-full">
                  <Table className="shadow-md min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Nome do Responsável</TableHead>
                        <TableHead>Ativo</TableHead>
                        <TableHead>Editar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {clientes.map((cliente) => (
                      <TableRow key={cliente.id}>
                        <TableCell>{cliente.nome}</TableCell>
                        <TableCell>{cliente.nome_responsavel}</TableCell>
                        <TableCell>
                          <Switch className="cursor-pointer" checked={cliente.ativo} onCheckedChange={() =>
                            toggleClientStatus(cliente.id, cliente.ativo)
                          } />
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger  onClick={() => {
                              setEditClientData({
                                id: cliente.id,
                                nome_empresa: cliente.nome,
                                nome_responsavel: cliente.nome_responsavel,
                                cnpj: cliente.cnpj,
                              });
                            } }                         
                              >
                              <button
                            >
                                <Pencil className="text-center ml-3 cursor-pointer" size={20} />
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="mb-2">
                                  Editar dados do Cliente
                                </DialogTitle>
                                <DialogDescription>
                                 <Label htmlFor="nome_responsavel" className="mb-2 mt-4 font-medium">
                                    Nome do Responsável
                                  </Label>
                                  <Input
                                    id="nome_responsavel"
                                    placeholder="Digite o nome do responsável"
                                    value={editClientData.nome_responsavel}
                                    onChange={handleChangeEdit}
                                  />
                                  
                                  <Label htmlFor="nome_empresa" className="mb-2 mt-4 font-medium">
                                    Nome da Empresa
                                  </Label>
                                  <Input
                                    id="nome_empresa"
                                    placeholder="Digite o nome da empresa"
                                    value={editClientData.nome_empresa}
                                    onChange={handleChangeEdit}
                                  />

                                  <Label className="mb-2 mt-4 font-medium">
                                    CNPJ
                                  </Label>
                                  <Input
                                    id="cnpj"
                                    placeholder="Digite o CNPJ (opcional)"
                                    value={editClientData.cnpj}
                                    onChange={handleChangeEdit}
                                  />
                                  <Button className=" mt-5 w-full cursor-pointer " onClick={handleUpdateUser}>
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
            </div>
          </div>
        </div>
      </SidebarInset>
      <Toaster position="top-right" richColors closeButton />
    </SidebarProvider>
  );
}
