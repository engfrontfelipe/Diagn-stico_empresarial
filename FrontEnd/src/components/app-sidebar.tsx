import * as React from "react";

import { NavClientes } from "@/components/nav-Clientes";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconLogout } from "@tabler/icons-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src="../../src/assets/grovefav.png" className="!size-8" />
                <span className="text-base font-semibold">Grove Tech</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavClientes />
      </SidebarContent>
      <SidebarFooter className="">
        <a href="/" className="flex ml-3 text-1xl align-middle text-center">
          <IconLogout className="size-5 mr-3 mt-1" />
          Log out
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
