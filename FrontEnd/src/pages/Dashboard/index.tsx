import { ChartAreaInteractive } from "@/components/chart-area-interactive.tsx";
import { AppSidebar } from "../../components/app-sidebar";

import { SectionCards } from "../../components/section-cards";
import { SiteHeader } from "../../components/site-header.tsx";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import GeneralDashHome from "./GeneralDashHome.tsx";
import { Card } from "@/components/ui/card.tsx";

export default function Page() {
  const [clientes, setClientes] = useState<
    { id: string; nome: string; ativo: boolean }[] | null
  >(null);
  const [usuarios, setUsuarios] = useState<
    { id: string; nome: string; email: string; ativo: boolean }[] | null
  >(null);

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
        {/* Spinner de Carregamento */}
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset id="top">
        <SiteHeader title="Tela Inicial" />
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

              <div className=" px-4 lg:px-6 ">
                <Card>
                  <GeneralDashHome />

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
    </SidebarProvider>
  );
}
