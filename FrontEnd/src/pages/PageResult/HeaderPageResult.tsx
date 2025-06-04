"use client";

import * as React from "react";
import {useParams } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/lib/changeButton";
const apiUrl = import.meta.env.VITE_API_URL;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Tabela de IceFrame",
    href: "#iceTable",
    description:
      "A tabela ICE é uma ferramenta usada para priorização de ideias, projetos ou funcionalidades, muito comum em produtos e negócios.",
  },

  {
    title: "Dashboard Geral",
    href: "#dashGeneral",
    description: "Visualização geral do cliente, com o dashboard principal.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface Cliente {
  id_cliente: number;
  nome: string;
  nome_responsavel: string;
  cnpj: string;
  ativo: boolean;
  cargo_responsavel: string;
  ramo_empresa: string;
  consultor: string;
  linkedin: string;
  site: string;
  final_diagnostico: string;
}

export function HeaderPageResult() {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch(`${apiUrl}/clientes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCliente(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  function getCurrentTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      return "https://assinaturas.grovehost.com.br/imagesClientes/consultingWhite.png";
    } else {
      return "https://assinaturas.grovehost.com.br/imagesClientes/consultingDark.png";
    }
  }

  return (
    <div
      className={cn(
        " flex items-center justify-between border-b-2 pb-4 border-accent fixed top-0 left-0 w-full z-50 bg-background transition-transform duration-300",
        showHeader ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <NavigationMenu className="ml-10 mt-4">
        <NavigationMenuList>
          <img src={getCurrentTheme()} alt="" className="h-auto w-30 mr-6" />
            
          <NavigationMenuItem>
            <NavigationMenuTrigger>Sobre o Cliente</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1.4fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text00-lg font-medium">
                        {cliente?.nome}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground grid">
                        <p className="mb-2">
                          CNPJ:{" "}
                          <span className="font-bold">{cliente?.cnpj}</span>
                        </p>
                        <p className="mb-2">
                          Responsável:{" "}
                          <span className="font-bold">
                            {cliente?.nome_responsavel}
                          </span>
                        </p>
                        <p className="mb-2">
                          Ramo:{" "}
                          <span className="font-bold">
                            {cliente?.ramo_empresa}
                          </span>
                        </p>
                        <p className="mb-2">
                          Consultor Responsável:{" "}
                          <span className="font-bold">
                            {cliente?.consultor}
                          </span>
                        </p>
                        <p className="mb-2">
                          Término do Diagnóstico:{" "}
                          <span className="font-bold">
                            {cliente?.final_diagnostico
                              ? new Date(
                                  cliente.final_diagnostico,
                                ).toLocaleDateString("pt-BR")
                              : "Data não disponível"}
                          </span>
                        </p>
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#diagResult" title="Diagnóstico Empresarial">
                  Apresenta uma visão geral do desempenho da empresa com base
                  nas respostas fornecidas, identificando pontos fortes,
                  fraquezas e oportunidades de melhoria.
                </ListItem>

                <ListItem href="#desempenho_area" title="Desempenho por Área">
                  Desempenho do cliente por área, com barra representando a
                  maturidade por área.
                </ListItem>
                <ListItem href="#diagResult" title="Exportar Diagnóstico">          
                  Exportar relatório completo do cliente.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Gráficos e Dashboards</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
   
      </NavigationMenu>
         <div className="mt-5 mr-10">
        <ThemeToggle/>
      </div>
    </div>
  );
}
