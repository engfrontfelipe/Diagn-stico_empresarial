import { AppSidebar } from "../../components/app-sidebar";
import { SectionCards } from "../../components/section-cards";
import { SiteHeader } from "../../components/site-header.tsx";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import GeneralDashHome from "./GeneralDashHome.tsx";
import { Card } from "@/components/ui/card.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const apiUrl =
  "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

export default function Page() {
  const [clientes, setClientes] = useState<
    { id: string; nome: string; ativo: boolean }[] | null
  >(null);
  const [usuarios, setUsuarios] = useState<
    { id: string; nome: string; email: string; ativo: boolean }[] | null
  >(null);
  const [showDocModal, setShowDocModal] = useState(true); // modal abre ao carregar

  const fetchClientes = async () => {
    try {
      const response = await fetch(`${apiUrl}/clientes/list`);
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro:", error);
    }
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
    fetchClientes();
    fetchUsuarios();
  }, []);

  const clientIsActive = () => {
    if (clientes) {
      const activeClients = clientes.filter((cliente) => cliente.ativo);
      return activeClients.length;
    }
    return 0;
  };

  const usuarioIsActive = () => {
    if (usuarios) {
      const activeUsers = usuarios.filter((usuario) => usuario.ativo);
      return activeUsers.length;
    }
    return 0;
  };

  if (!clientes || !usuarios) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-accent border-solid rounded-full animate-spin border-t-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset id="top">
        <SiteHeader title="Tela Inicial" icon={false} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-2 gap-4 px-4 lg:px-6">
                <SectionCards
                  description={`Total de Clientes:`}
                  title={`${clientes.length} clientes`}
                  footer={`O valor total de clientes ativos é de ${clientIsActive()} clientes.`}
                />
                <SectionCards
                  description="Total de Usuários:"
                  title={`${usuarios.length} usuários`}
                  footer={`Valor total de usuários ativos é de ${usuarioIsActive()} usuários.`}
                />
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <GeneralDashHome />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Modal de Documentação */}
      <Dialog open={showDocModal} onOpenChange={setShowDocModal}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle className="text-center text-xl font-bold text-primary mb-2">
        Confira nossa nova documentação!
      </DialogTitle>
      <DialogDescription className="text-center text-base">
        Preparamos um <span className="font-semibold">Manual do Consultor</span> atualizado,
        com instruções detalhadas para aproveitar ao máximo o sistema.  
        Acesse agora e descubra as novidades!
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="flex justify-center gap-3">
      <Button onClick={() => setShowDocModal(false)}>Fechar</Button>
      <Button
        variant="secondary"
        onClick={() => {
          setShowDocModal(false);
          window.open("/doc/Consulting", "_blank");
        }}
      >
        📖 Abrir Documentação
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </SidebarProvider>
  );
}
