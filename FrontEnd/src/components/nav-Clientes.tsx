"use client";
const apiUrl =
  "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      const response = await fetch(`${apiUrl}/clientes/list`);
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      const data = await response.json();

      // Filtrando apenas os clientes ativos
      const clientesAtivos = data.filter(
        (cliente: { ativo: boolean }) => cliente.ativo,
      );

      setClientes(clientesAtivos);
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
              <Link to={`/clientes/${cliente.id_cliente}`}>
                <span>
                  <User size={19} />
                </span>
                {cliente.nome}
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
