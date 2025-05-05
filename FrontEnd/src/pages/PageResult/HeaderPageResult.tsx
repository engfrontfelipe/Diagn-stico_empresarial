"use client";

import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState } from "react";


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Tabela de IceFrame",
    href: "#",
    description:
      "A tabela ICE é uma ferramenta usada para priorização de ideias, projetos ou funcionalidades, muito comum em produtos e negócios.",
  },
  {
    title: "Tabela Respostas Positivas",
    href: "#",
    description:
      "Exibe a quantidade de respostas sim recebidas para cada pergunta ou categoria, permitindo avaliar os pontos fortes ou atendidos dentro da avaliação.",
  },
  {
    title: "Tabela Respostas Negativas",
    href: "#",
    description:
      " exibe a quantidade de respostas não para cada pergunta ou categoria, destacando áreas que necessitam de atenção, melhoria ou correção.",
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
}


export function HeaderPageResult() {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null) 
  const navigate = useNavigate()


  fetch(`http://localhost:3333/clientes/${id}`)
  .then(response => response.json())
  .then(data => {
    setCliente(data)
  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
  });


  return (
    <div className="border-b-2 pb-4 border-accent" >
      <NavigationMenu className="m-auto mt-4">
        <NavigationMenuList className="">
          <NavigationMenuItem>
            <Link to={"/dashboard"}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
              <NavigationMenuLink onClick={() => {navigate(-1)}} className={navigationMenuTriggerStyle()}>
                Página Cliente
              </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Sobre o Cliente</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text00-lg font-medium">
                        {cliente?.nome}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground grid ">
                        <p className="mb-2">CNPJ: {cliente?.cnpj}</p>
                        <p className="mb-2">Responsável: {cliente?.nome_responsavel}</p>
                        <p className="mb-2">Ramo: {cliente?.ramo_empresa}</p>
                        <p className="mb-2">Consultor Responsável:{cliente?.consultor}</p>
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Dashboard Geral">
                  Visualização geral do cliente, com o dashboard principal.
                </ListItem>
                <ListItem href="#desempenho_area" title="Desempenho por Área">
                  Desempenho do cliente por área, com barra represantando a
                  maturidade por área.
                </ListItem>
                <ListItem
                  href="/docs/primitives/typography"
                  title="Exportar Dados"
                >
                  Exportar relatório completo do cliente.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="">
              Gráficos e Dashboards
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
    </div>
  );
}
