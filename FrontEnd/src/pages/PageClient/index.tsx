import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableQuestions from "./tableQuestions";

interface Cliente {
  nome: string;
  nome_responsavel: string;
  cnpj: string;
  ativo: boolean;
  id: string;
  data_cadastro: string;
}

export default function PageClient() {
    const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`http://localhost:3333/clientes/${id}`);
        const data = await response.json();
        setCliente(data);
      } catch (err) {
        console.error("Erro ao buscar cliente", err);
      }
    };

    if (id) {
      fetchCliente();
    }
  }, [id]);

  return (
    <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader title={cliente ? cliente.nome : "Carregando..."} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
              <SectionCards
                description="Empresa:"
                title={cliente ? cliente.nome : "Carregando..."}
                footer={`Responsável: ${cliente ? cliente.nome_responsavel : "Carregando..."}`}
              />

              <SectionCards
                description="Total de Perguntas:"
                title={"56 perguntas"}
                footer={`Total de perguntas respondidas: 12`}
              />
            </div>

            <div className="px-4 lg:px-6 flex align-center justify-center">
              <TableQuestions />
            </div>
            
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
}
