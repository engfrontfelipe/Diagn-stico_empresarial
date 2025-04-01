import { House, User, UserRoundPlus } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain() {

return(
  <>
     <SidebarGroup>
     <SidebarGroupLabel>Gestao</SidebarGroupLabel>

      <SidebarGroupContent className="flex flex-col gap-3">
        <SidebarMenu>
            <SidebarMenuItem >
              <SidebarMenuButton className="cursor-pointer">
                <span>{<House size={18}/>}</span>
                Tela inicial
              </SidebarMenuButton>

              <SidebarMenuButton className="cursor-pointer">
                <span>{<User size={19}/>}</span>
                Cadastrar Cliente
              </SidebarMenuButton>

              <SidebarMenuButton className="cursor-pointer">
                <span>{<UserRoundPlus size={18}/>}</span>
                Cadastrar Usuário
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </>
)};
