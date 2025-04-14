"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export function NavClientes() {
  const [clientes, setClientes] = useState<
    {
      nome_responsavel: string;
      nome: string;
      cnpj: string;
      id_cliente: string;
      ativo: boolean;
    }[]
  >([]);

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:3333/clientes/list");
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Clientes</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key="clientes">
          {clientes.map((cliente) => (
            <SidebarMenuButton asChild key={cliente.id_cliente}>
              <a href={`/clientes/${cliente.id_cliente}`}>
                <span>
                  <User size={19} />
                </span>
                {cliente.nome}
              </a>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
