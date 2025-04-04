import { AppSidebar } from "@/components/app-sidebar"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"


export default function RegisterUser() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Gestão de Clientes" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <SectionCards title={"Clientes Cadastrados"} description={""}  footer={"10 clientes cadastrados"}/>
              </div>
              <div className="px-4 lg:px-6">
              <Card className="p-4 w-full">
                <div className="grid gap-4">
                  <Label htmlFor="nome_empresa">Nome da Empresa:</Label>
                  <Input
                    id="nome_empresa"
                    placeholder="Nome da empresa"
                    type="text"
                  />

                  <Label htmlFor="nome_responsavel">Nome do Responsável:</Label>
                  <Input
                    id="nome_responsavel"
                    type="text"
                    placeholder="Nome do responsável"
                  />

                  <Label htmlFor="cnpj">CNPJ:</Label>
                  <Input
                    id="cnpj"
                    type="text"
                    placeholder="CNPJ"
                  />
                </div>
                <Button
                  className="w-full mt-4 cursor-pointer">
                  Criar Cliente
                </Button>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}