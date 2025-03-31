import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  // Estados para armazenar os valores dos campos
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("Email:", email)
    console.log("Password:", password)
    
    fetch('http://localhost:3333/usuarios/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password })
      
    })
  }

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira seu e-mail abaixo para fazer login em sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input 
            id="password" 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full cursor-pointer bg-slate-500 text-white hover:bg-slate-600 hover:text-white"
        >
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Problemas com sua conta?
          </span>
        </div>
        <Button 
          variant="outline" 
          className="w-full cursor-pointer bg-slate-500 text-white hover:bg-slate-600 hover:text-white"
        >
          Clique Aqui!
        </Button>
      </div>
    </form>
  )
}