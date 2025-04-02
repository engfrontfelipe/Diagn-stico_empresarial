// import { ChartAreaInteractive } from "@/components/chart-area-interactive.tsx";
import { ChartAreaInteractive } from "@/components/chart-area-interactive.tsx";
import { AppSidebar } from "../../components/app-sidebar";

import { SectionCards } from "../../components/section-cards";
import { SiteHeader } from "../../components/site-header.tsx";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Tela Inicial" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
                <SectionCards
                  description="Total de Clientes"
                  title="10 clientes"
                  footer="Valor total de clientes"
                />
                <SectionCards
                  description="Total de Clientes"
                  title="10 clientes"
                  footer="Valor total de clientes"
                />
                <SectionCards
                  description="Total de Clientes"
                  title="10 clientes"
                  footer="Valor total de clientes"
                />
              </div>

              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
