
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
       <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Clientes </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            10 Clientes
          </CardTitle>
        </CardHeader>          
        <CardFooter>  
          <div className="text-muted-foreground">Valor do total de clientes.</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Clientes Pendentes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3 Clientes
          </CardTitle>
        </CardHeader>          
        <CardFooter>  
          <div className="text-muted-foreground">Total de clientes a concluir.</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Clientes Concluídos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5 Clientes
          </CardTitle>
        </CardHeader>          
        <CardFooter>  
          <div className="text-muted-foreground">Total de clientes concluídos </div>
        </CardFooter>
      </Card>
    </div>
  )
}
