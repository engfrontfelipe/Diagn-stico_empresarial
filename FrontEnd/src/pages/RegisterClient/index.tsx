// RegisterUser.tsx
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, Toaster } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { AlertCircle } from "lucide-react";

const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host";

const DEPARTAMENTOS_DISPONIVEIS = [
  "RH",
  "Financeiro",
  "Marketing",
  "Tecnologia",
  "Vendas",
  "Operações",
  "Estratégias",
] as const;

type Cliente = {
  id_cliente: number;
  nome: string;
  nome_responsavel: string;
  cnpj: string;
  cargo_responsavel: string;
  ramo_empresa: string;
  consultor: string;
  linkedin: string;
  site: string;
  logo_url: string | null;
  ativo: boolean;
  departamentos: string[];
};

type ClienteForm = {
  nome_empresa: string;
  nome_responsavel: string;
  cnpj: string;
  ramo_empresa: string;
  cargo_responsavel: string;
  consultor: string;
  linkedin: string;
  site: string;
  logo_url: string;
};

export default function RegisterUser() {
  const [client, setClient] = useState<ClienteForm>({
    nome_empresa: "",
    nome_responsavel: "",
    cnpj: "",
    ramo_empresa: "",
    cargo_responsavel: "",
    consultor: "",
    linkedin: "",
    site: "",
    logo_url: "",
  });

  const [departamentosSelecionados, setDepartamentosSelecionados] = useState<
    string[]
  >([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Sheet de edição
  const [sheetOpen, setSheetOpen] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

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
    const newValue = id === "cnpj" ? formatCNPJ(value) : value;
    setClient((prev) => ({ ...prev, [id]: newValue }));
  };

  const toggleDepartamento = (dept: string) => {
    setDepartamentosSelecionados((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept],
    );
  };

  const cadastrarCliente = async (e: React.FormEvent) => {
    e.preventDefault();

    if (departamentosSelecionados.length === 0) {
      toast.error("Selecione pelo menos um departamento.");
      return;
    }

    const payload = {
      nome: client.nome_empresa,
      nome_responsavel: client.nome_responsavel,
      cnpj: client.cnpj.replace(/\D/g, ""),
      cargo_responsavel: client.cargo_responsavel,
      ramo_empresa: client.ramo_empresa,
      consultor: client.consultor,
      linkedin: client.linkedin,
      site: client.site,
      logo_url: client.logo_url || null,
      departamentos: departamentosSelecionados,
    };

    try {
      const response = await fetch(`${apiUrl}/clientes/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao cadastrar");
      }

      toast.success("Cliente cadastrado com sucesso!");
      limparFormulario();
      fetchClientes();
    } catch (err: any) {
      toast.error(err.message || "Erro ao cadastrar cliente");
    }
  };

  const limparFormulario = () => {
    setClient({
      nome_empresa: "",
      nome_responsavel: "",
      cnpj: "",
      ramo_empresa: "",
      cargo_responsavel: "",
      consultor: "",
      linkedin: "",
      site: "",
      logo_url: "",
    });
    setDepartamentosSelecionados([]);
  };

  const fetchClientes = async () => {
    try {
      const res = await fetch(`${apiUrl}/clientes/list`);
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ABERTURA DO SHEET COM GARANTIA DE ARRAY
  const abrirEdicao = (cliente: Cliente) => {
    setClienteEditando({
      ...cliente,
      cnpj: cliente.cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5",
      ),
      departamentos: cliente.departamentos ?? [], // Nunca será null/undefined
    });
    setSheetOpen(true);
  };

  const salvarEdicao = async () => {
    if (!clienteEditando) return;

    const payload = {
      nome: clienteEditando.nome,
      nome_responsavel: clienteEditando.nome_responsavel,
      cnpj: clienteEditando.cnpj.replace(/\D/g, ""),
      cargo_responsavel: clienteEditando.cargo_responsavel,
      ramo_empresa: clienteEditando.ramo_empresa,
      consultor: clienteEditando.consultor,
      linkedin: clienteEditando.linkedin,
      site: clienteEditando.site,
      logo_url: clienteEditando.logo_url || null,
    };

    try {
      const res = await fetch(
        `${apiUrl}/clientes/update/${clienteEditando.id_cliente}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("Erro ao atualizar");

      toast.success("Cliente atualizado com sucesso!");
      setSheetOpen(false);
      fetchClientes();
    } catch {
      toast.error("Erro ao salvar alterações");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Gestão de Clientes" icon={false} />
        <div className="p-6 space-y-8">
          <SectionCards
            title={`${clientes.length} clientes cadastrados`}
            description="Total de clientes no sistema"
            footer={`Ativos: ${clientes.filter((c) => c.ativo).length}`}
          />

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Formulário de Cadastro */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Cadastrar Novo Cliente</h2>
              <form onSubmit={cadastrarCliente} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Consultor Responsável</Label>
                    <Input
                      id="consultor"
                      value={client.consultor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Nome da Empresa</Label>
                    <Input
                      id="nome_empresa"
                      value={client.nome_empresa}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Nome do Responsável</Label>
                    <Input
                      id="nome_responsavel"
                      value={client.nome_responsavel}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Cargo do Responsável</Label>
                    <Input
                      id="cargo_responsavel"
                      value={client.cargo_responsavel}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Ramo da Empresa</Label>
                    <Input
                      id="ramo_empresa"
                      value={client.ramo_empresa}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>CNPJ</Label>
                    <Input
                      id="cnpj"
                      placeholder="99.999.999/9999-99"
                      value={client.cnpj}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={client.linkedin}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Site</Label>
                    <Input
                      id="site"
                      value={client.site}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Logo URL (opcional)</Label>
                    <Input
                      id="logo_url"
                      value={client.logo_url}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Label className="text-lg font-semibold mb-4 block">
                    Departamentos para Diagnóstico{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {DEPARTAMENTOS_DISPONIVEIS.map((dept) => (
                      <div key={dept} className="flex items-center space-x-2">
                        <Checkbox
                          id={dept}
                          checked={departamentosSelecionados.includes(dept)}
                          onCheckedChange={() => toggleDepartamento(dept)}
                        />
                        <label
                          htmlFor={dept}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {dept}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Cadastrar Cliente + Departamentos
                </Button>
              </form>
            </Card>

            {/* Lista de Clientes */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Clientes Cadastrados</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {clientes.map((c) => (
                  <button
                    key={c.id_cliente}
                    onClick={() => abrirEdicao(c)}
                    className="w-full text-left p-4 border rounded-lg hover:bg-accent hover:border-primary transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-lg">{c.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {c.cnpj.replace(
                            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                            "$1.$2.$3/$4-$5",
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Consultor: {c.consultor}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${c.ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {c.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {/* SHEET DE EDIÇÃO - 100% SEGURO */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="min-w-2xl p-6 sm:w-[600px] overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Editar Cliente</SheetTitle>
            <SheetDescription>
              Você pode alterar todas as informações, exceto os departamentos.
            </SheetDescription>
          </SheetHeader>

          {clienteEditando && (
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900">
                    Departamentos não editáveis
                  </p>
                  <p className="text-sm text-amber-700">
                    Os departamentos foram definidos no cadastro inicial e não
                    podem ser alterados posteriormente.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Empresa</Label>
                  <Input
                    value={clienteEditando.nome}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        nome: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Consultor</Label>
                  <Input
                    value={clienteEditando.consultor}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        consultor: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Nome do Responsável</Label>
                  <Input
                    value={clienteEditando.nome_responsavel}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        nome_responsavel: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Cargo</Label>
                  <Input
                    value={clienteEditando.cargo_responsavel}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        cargo_responsavel: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Ramo da Empresa</Label>
                  <Input
                    value={clienteEditando.ramo_empresa}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        ramo_empresa: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>CNPJ</Label>
                  <Input
                    value={clienteEditando.cnpj}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label>LinkedIn</Label>
                  <Input
                    value={clienteEditando.linkedin}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        linkedin: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Site</Label>
                  <Input
                    value={clienteEditando.site}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        site: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label>Logo URL (opcional)</Label>
                  <Input
                    value={clienteEditando.logo_url || ""}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        logo_url: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <SheetFooter className="mt-8">
            <SheetClose asChild>
              <Button variant="outline">Cancelar</Button>
            </SheetClose>
            <Button onClick={salvarEdicao}>Salvar Alterações</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Toaster position="bottom-center" richColors closeButton />
    </SidebarProvider>
  );
}
