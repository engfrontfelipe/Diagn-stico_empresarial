import { useEffect, useState } from "react";
import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth";

const apiUrl = "https://diagnostivo-v1-backend.xjjkzc.easypanel.host/";

export function NavUser({}) {
  const { isMobile } = useSidebar();

  const [_usuarios, setUsuarios] = useState<
    { id: string; nome: string; email: string; ativo: boolean }[]
  >([]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/usuarios/list`);
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
    fetchUsuarios();
  }, []);

  const { user } = useAuth();

  return (
    <SidebarMenu className="cursor-pointer">
      <SidebarMenuItem className="cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src="https://github.com/teste.png"
                  alt="Felipe Maciel"
                />
                <AvatarFallback className="rounded-lg">GT</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.nome}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email || "usuário@company.com.br"}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="https://github.com/teste.png"
                    alt="Felipe Maciel"
                  />
                  <AvatarFallback className="rounded-lg">GT</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.nome || "Usuário"}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email || "usuário@company.com.br"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <a href="/register_user">
                <DropdownMenuItem className="cursor-pointer">
                  <IconUserCircle />
                  Account
                </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <a href="/">
              <DropdownMenuItem className="cursor-pointer">
                <IconLogout />
                Log out
              </DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
