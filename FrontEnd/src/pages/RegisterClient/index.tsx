import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

function RegisterClient() {
  return (
    <>
      <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Registrar Cliente" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards title="" /> */}
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}

export default RegisterClient;
