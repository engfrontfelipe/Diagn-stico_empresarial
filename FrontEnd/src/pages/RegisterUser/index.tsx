import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { toast, Toaster } from "sonner";

function RegisterUser() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
  });
  
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3333/usuarios/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.error}`); 
        return;
      } else {
        toast.success("Usuário cadastrado com sucesso!"); 
      }
  
      const data = await response.json();
      console.log("Usuário cadastrado com sucesso:", data);
  
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Erro ao cadastrar usuário!");  
    }
  };
  
  return (
    <>
      <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        
        <SiteHeader title="Gestão Usuário" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
               <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                  <SectionCards description="Total de Administradores Cadastrados" title="10 Administradores" footer="Valor total de administradores" />
                  <SectionCards description="Total de Consultores" title="10 Consultores" footer="Valor total de Consultores" />
                </div>
              
              <div className="px-4 lg:px-6">
              <Toaster position="top-right" richColors closeButton />
              <div className="grid lg:grid-cols-2 gap-3 ">
                    <div className="grid max-w-md items-center gap-1.5">
                      <Label htmlFor="nome" className="mb-3 mt-3 font-normal">Nome:</Label> 
                      <Input id="nome" placeholder="Felipe Maciel" value={formData.nome} onChange={handleChange} />
                    </div>
                
                    <div className="grid max-w-md items-center gap-1.5">
                      <Label htmlFor="email" className="mb-3 mt-3 font-normal">Email:</Label> 
                      <Input id="email" placeholder="m@company.com.br" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="grid max-w-md items-center gap-1.5">
                      <Label htmlFor="senha" className="mb-3 mt-3 font-normal">Senha:</Label> 
                      <Input id="senha" placeholder="Precisa conter letras e números." value={formData.senha} onChange={handleChange} />
                    </div>                  

                    <div className="grid max-w-md items-center gap-1.5">
                      <Label htmlFor="confirmSenha" className="mb-3 mt-3 font-normal">Confirmação de senha:</Label> 
                      <Input id="confirmSenha" placeholder="Confirmação da senha" value={formData.confirmSenha} onChange={handleChange} />  
                    </div>
                    
                    <div></div>
                    <Button className="max-w-md mt-3 cursor-pointer" onClick={handleSubmit}>Criar usuário</Button>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}

export default RegisterUser;
