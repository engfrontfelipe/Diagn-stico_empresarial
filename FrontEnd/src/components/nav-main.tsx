import { House, User, UserRoundPlus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export function NavMain() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path); // Navega para a rota especificada
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Gestão</SidebarGroupLabel>

        <SidebarGroupContent className="flex flex-col gap-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation("/dashboard")}
                className="cursor-pointer"
              >
                <span>{<House size={18} />}</span>
                Tela inicial
              </SidebarMenuButton>

              <SidebarMenuButton
                onClick={() => handleNavigation("/register_client")}
                className="cursor-pointer"
              >
                <span>{<User size={19} />}</span>
                Gestão Clientes
              </SidebarMenuButton>

              <SidebarMenuButton
                onClick={() => handleNavigation("/register_user")}
                className="cursor-pointer"
              >
                <span>{<UserRoundPlus size={18} />}</span>
                Gestão Usuários
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
