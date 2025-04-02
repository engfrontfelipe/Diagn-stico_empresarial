"use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "lucide-react";

export function NavClientes() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Clientes</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key={"Item1"}>
          <SidebarMenuButton asChild>
            <a href={"#"}>
              <span>{<User size={19} />}</span>
              Cliente 1
            </a>
          </SidebarMenuButton>

          <SidebarMenuButton asChild>
            <a href={"#"}>
              <span>{<User size={19} />}</span>
              Cliente 2
            </a>
          </SidebarMenuButton>

          <SidebarMenuButton asChild>
            <a href={"#"}>
              <span>{<User size={19} />}</span>
              Cliente 3
            </a>
          </SidebarMenuButton>
          {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="data-[state=open]:bg-accent rounded-sm"
                >
                  <IconDots />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}  
              >
                <DropdownMenuItem>
                  <IconFolder />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconShare3 />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <IconTrash />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
