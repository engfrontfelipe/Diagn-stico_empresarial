import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  // Formatar o valor com no máximo 2 casas decimais
  const formattedValue = value ? value.toFixed() : "0.00";

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full flex items-center justify-end pr-2 text-md font-medium transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
        <span className="whitespace-nowrap text-muted font-medium text-xs text-center pb-0.5">
          {formattedValue}%
        </span>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
