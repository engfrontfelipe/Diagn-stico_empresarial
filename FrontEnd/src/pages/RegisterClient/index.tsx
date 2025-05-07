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
const apiUrl = import.meta.env.VITE_API_URL;
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Pencil } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function RegisterUser() {
  const [client, setClient] = useState({
    nome_empresa: "",
    nome_responsavel: "",
    cnpj: "",
    ramo_empresa: "",
    cargo_responsavel: "",
    consultor: "",
    linkedin: "",
    site: "",
  });

  const [clientes, setClientes] = useState<
    {
      nome_responsavel: string;
      nome: string;
      cnpj: string;
      id_cliente: string;
      ramo_empresa: string;
      cargo_responsavel: string;
      ativo: boolean;
      consultor: string;
      linkedin: string;
      site: string;
    }[]
  >([]);

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);

    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
  };

  type InputOrSelectEvent =
    | React.ChangeEvent<HTMLInputElement>
    | { id: string; value: string };

  const handleChange = (e: InputOrSelectEvent) => {
    const id = "target" in e ? e.target.id : e.id;
    const value = "target" in e ? e.target.value : e.value;

    let newValue = value;

    if (id === "cnpj") {
      newValue = formatCNPJ(value);
    }

    setClient((prev) => ({ ...prev, [id]: newValue }));
  };

  const [editClientData, setEditClientData] = useState({
    id_cliente: "",
    nome_empresa: "",
    nome_responsavel: "",
    cnpj: "",
    ramo_empresa: "",
    cargo_responsavel: "",
    consultor: "",
    linkedin: "",
    site: "",
  });

  type InputOrSelectEventEdit =
    | React.ChangeEvent<HTMLInputElement>
    | { id: string; value: string };

  const handleChangeEdit = (e: InputOrSelectEventEdit) => {
    const id = "target" in e ? e.target.id : e.id;
    const value = "target" in e ? e.target.value : e.value;

    let newValue = value;

    if (id === "cnpj") {
      newValue = formatCNPJ(value);
    }

    setEditClientData((prev) => ({ ...prev, [id]: newValue }));
  };

  const cadastrarCliente = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      nome_empresa,
      nome_responsavel,
      cnpj,
      ramo_empresa,
      cargo_responsavel,
      consultor,
      linkedin,
      site,
    } = client;

    if (
      !nome_empresa ||
      !nome_responsavel ||
      !cnpj ||
      !ramo_empresa ||
      !cargo_responsavel ||
      !consultor ||
      !linkedin ||
      !site
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    fetch(`${apiUrl}/clientes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome_empresa,
        nome_responsavel,
        cnpj,
        ramo_empresa,
        cargo_responsavel,
        consultor,
        linkedin,
        site,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar cliente.");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Cliente cadastrado com sucesso!");
        fetchClientes();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao cadastrar cliente.");
      });
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch(`${apiUrl}/clientes/list`);
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      const data = await response.json();
      console.log(data);

      setClientes(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const toggleClientStatus = async (
    id_cliente: string,
    currentStatus: boolean,
  ) => {
    try {
      const response = await fetch(
        `${apiUrl}/clientes/update/${id_cliente}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ativo: !currentStatus }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do cliente");
      }

      setClientes((prevCliente) =>
        prevCliente.map((cliente) =>
          cliente.id_cliente === id_cliente
            ? { ...cliente, ativo: !currentStatus }
            : cliente,
        ),
      );
      toast.success("Status do cliente atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast.error("Erro ao atualizar status do cliente");
    }
  };

  const updateClientData = async (
    id: string,
    updatedData: {
      nome?: string;
      nome_responsavel?: string;
      cnpj?: string;
      ramo_empresa: string;
      cargo_responsavel: string;
      consultor: string;
      linkedin: string;
      site: string;
    },
  ) => {
    try {
      const response = await fetch(
        `${apiUrl}/clientes/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados do cliente");
      }

      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id_cliente === id ? { ...cliente, ...updatedData } : cliente,
        ),
      );
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast.error("Erro ao atualizar dados do cliente");
    }
  };

  const handleUpdateUser = async () => {
    const {
      id_cliente,
      nome_empresa,
      nome_responsavel,
      cnpj,
      ramo_empresa,
      cargo_responsavel,
      consultor,
      linkedin,
      site,
    } = editClientData;

    if (!nome_empresa || !nome_responsavel) {
      toast.error("Nome e email são obrigatórios!");
      return;
    }

    await updateClientData(id_cliente, {
      nome: nome_empresa,
      nome_responsavel,
      cnpj: cnpj || undefined,
      ramo_empresa,
      cargo_responsavel,
      consultor,
      linkedin: linkedin,
      site: site,
    });
    toast.success("Cliente atualizado com sucesso!");
  };

  const clientIsActive = () => {
    const activeClients = clientes.filter((cliente) => cliente.ativo);
    return activeClients.length;
  };

  const renderLoading = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-primary"></div>
    </div>
  );

  if (!client || !clientes || clientes.length === 0) {
    return renderLoading();
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset id="top">
        <SiteHeader title="Gestão de Clientes" icon={false} />
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
                  <div className="grid gap-4 ">
                    <Label htmlFor="consultor">Consultor Responsável:</Label>
                    <Input
                      id="consultor"
                      type="text"
                      placeholder="Nome do consultor responsável"
                      value={client.consultor}
                      onChange={handleChange}
                    />

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

                    <Label htmlFor="cargo_responsavel">
                      Cargo do Responsável:
                    </Label>
                    <Input
                      id="cargo_responsavel"
                      type="text"
                      placeholder="Digite o cargo do responsável"
                      value={client.cargo_responsavel}
                      onChange={handleChange}
                    />

                    <Label htmlFor="ramo_empresa">Ramo da Empresa:</Label>
                    <Input
                      id="ramo_empresa"
                      type="text"
                      placeholder="Digite o ramo da empresa"
                      value={client.ramo_empresa}
                      onChange={handleChange}
                    />

                    <Label htmlFor="linkedin">LinkedIn:</Label>
                    <Input
                      id="linkedin"
                      type="text"
                      placeholder="Digite o LinkedIn da empresa"
                      value={client.linkedin}
                      onChange={handleChange}
                    />

                    <Label htmlFor="site">Site:</Label>
                    <Input
                      id="site"
                      type="text"
                      placeholder="Digite o WebSite da empresa"
                      value={client.site}
                      onChange={handleChange}
                    />

                    <Label>CNPJ:</Label>
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="99.999.999/9999-99"
                      value={client.cnpj}
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <Button
                    onClick={cadastrarCliente}
                    className="w-full mt-1 cursor-pointer"
                  >
                    Criar Cliente
                  </Button>
                </Card>

                <Card className="p-4 w-full">
                  <Table className="shadow-md min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Ramo Empresa</TableHead>

                        <TableHead>Nome do Responsável</TableHead>
                        <TableHead>Cargo do Responsável</TableHead>
                        <TableHead>Consultor</TableHead>

                        <TableHead>Ativo</TableHead>
                        <TableHead>Editar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientes.map((cliente) => (
                        <TableRow key={cliente.id_cliente}>
                          <TableCell>{cliente.nome}</TableCell>
                          <TableCell>{cliente.ramo_empresa}</TableCell>
                          <TableCell>{cliente.nome_responsavel}</TableCell>
                          <TableCell>{cliente.cargo_responsavel}</TableCell>
                          <TableCell>{cliente.consultor}</TableCell>

                          <TableCell>
                            <Switch
                              className="cursor-pointer"
                              checked={cliente.ativo}
                              onCheckedChange={() => {
                                toggleClientStatus(
                                  cliente.id_cliente,
                                  cliente.ativo,
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger
                                onClick={() => {
                                  setEditClientData({
                                    id_cliente: cliente.id_cliente,
                                    nome_empresa: cliente.nome,
                                    nome_responsavel: cliente.nome_responsavel,
                                    cnpj: cliente.cnpj,
                                    ramo_empresa: cliente.ramo_empresa,
                                    cargo_responsavel:
                                      cliente.cargo_responsavel,
                                    consultor: cliente.consultor,
                                    linkedin: cliente.linkedin,
                                    site: cliente.site,
                                  });
                                }}
                              >
                                <button>
                                  <Pencil
                                    className="text-center ml-3 cursor-pointer"
                                    size={20}
                                  />
                                </button>
                              </DialogTrigger>

                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="mb-2">
                                    Editar dados do Cliente
                                  </DialogTitle>
                                </DialogHeader>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                  <div>
                                    <Label
                                      htmlFor="nome_responsavel"
                                      className="mb-1 font-medium"
                                    >
                                      Nome do Responsável
                                    </Label>
                                    <Input
                                      id="nome_responsavel"
                                      placeholder="Digite o nome do responsável"
                                      value={editClientData.nome_responsavel}
                                      onChange={handleChangeEdit}
                                    />
                                  </div>

                                  <div>
                                    <Label
                                      htmlFor="consultor"
                                      className="mb-1 font-medium"
                                    >
                                      Consultor Responsável
                                    </Label>
                                    <Input
                                      id="consultor"
                                      placeholder="Digite o nome do consultor responsável"
                                      value={editClientData.consultor}
                                      onChange={handleChangeEdit}
                                    />
                                  </div>

                                  <div>
                                    <Label
                                      htmlFor="cargo_responsavel"
                                      className="mb-1 font-medium"
                                    >
                                      Cargo Responsável
                                    </Label>
                                    <Input
                                      id="cargo_responsavel"
                                      type="text"
                                      placeholder="Digite o cargo do responsável"
                                      value={editClientData.cargo_responsavel}
                                      onChange={(e) =>
                                        handleChangeEdit({
                                          id: "cargo_responsavel",
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div>
                                    <Label
                                      htmlFor="nome_empresa"
                                      className="mb-1 font-medium"
                                    >
                                      Nome da Empresa
                                    </Label>
                                    <Input
                                      id="nome_empresa"
                                      placeholder="Digite o nome da empresa"
                                      value={editClientData.nome_empresa}
                                      onChange={handleChangeEdit}
                                    />
                                  </div>

                                  <div>
                                    <Label
                                      htmlFor="ramo_empresa"
                                      className="mb-1 font-medium"
                                    >
                                      Ramo da Empresa
                                    </Label>
                                    <Input
                                      id="ramo_empresa"
                                      type="text"
                                      placeholder="Digite o ramo da empresa"
                                      value={editClientData.ramo_empresa}
                                      onChange={(e) =>
                                        handleChangeEdit({
                                          id: "ramo_empresa",
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div>
                                    <Label
                                      htmlFor="cnpj"
                                      className="mb-1 font-medium"
                                    >
                                      CNPJ
                                    </Label>
                                    <Input
                                      id="cnpj"
                                      placeholder="Digite o CNPJ (opcional)"
                                      value={editClientData.cnpj}
                                      onChange={handleChangeEdit}
                                    />
                                  </div>

                                  <div>
                                    <Label
                                      htmlFor="linkedin"
                                      className="mb-1 font-medium"
                                    >
                                      LinkedIn
                                    </Label>
                                    <Input
                                      id="linkedin"
                                      type="text"
                                      placeholder="Digite o LinkedIn"
                                      value={editClientData.linkedin}
                                      onChange={(e) =>
                                        handleChangeEdit({
                                          id: "linkedin",
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div>
                                    <Label
                                      htmlFor="site"
                                      className="mb-1 font-medium"
                                    >
                                      Site
                                    </Label>
                                    <Input
                                      id="site"
                                      type="text"
                                      placeholder="Digite o Site da Empresa"
                                      value={editClientData.site}
                                      onChange={(e) =>
                                        handleChangeEdit({
                                          id: "site",
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>

                                <Button
                                  className="mt-6 w-full cursor-pointer"
                                  onClick={handleUpdateUser}
                                >
                                  Editar
                                </Button>
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
        <a
          href="#top"
          className="flex justify-center pt-2.5 fixed bottom-4 cursor-pointer end-4 rounded-[100%] w-13 h-13"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-up-icon lucide-arrow-up"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </a>
      </SidebarInset>
      <Toaster position="top-right" richColors closeButton />
    </SidebarProvider>
  );
}
