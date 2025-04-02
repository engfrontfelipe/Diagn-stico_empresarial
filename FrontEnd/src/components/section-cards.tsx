import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({
  description,
  title,
  footer,
}: {
  description: string;
  title: string;
  footer: string;
}) {
  return (
    <div>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{description} </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {title}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="text-muted-foreground">{footer}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
