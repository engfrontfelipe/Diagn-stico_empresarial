import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/lib/changeButton";

export function SiteHeader({ title }: { title: string }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) p-4">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-5 " />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 "
        />
        <h1 className="text-balance font-medium ">{title}</h1>
      </div>

      <ThemeToggle />
    </header>
  );
}
