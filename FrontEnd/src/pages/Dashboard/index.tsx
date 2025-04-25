import { ChartAreaInteractive } from "@/components/chart-area-interactive.tsx";
import { AppSidebar } from "../../components/app-sidebar";

import { SectionCards } from "../../components/section-cards";
import { SiteHeader } from "../../components/site-header.tsx";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
export default function Page() {
  const [clientes, setClientes] = useState<
    { id: string; nome: string; ativo: boolean }[]
  >([]);

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

  const [usuarios, setUsuarios] = useState<
    { id: string; nome: string; email: string; ativo: boolean }[]
  >([]);

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

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const clientIsActive = () => {
    const activeClients = clientes.filter((cliente) => cliente.ativo);
    return activeClients.length;
  };

  const usuarioIsActive = () => {
    const activeUsers = usuarios.filter((usuario) => usuario.ativo);
    return activeUsers.length;
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset id="top">
        <SiteHeader title="Tela Inicial" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
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
                <ChartAreaInteractive />
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
    </SidebarProvider>
  );
}
