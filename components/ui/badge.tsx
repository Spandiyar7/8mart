import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "green" | "gold" | "neutral";
};

export function Badge({ className, tone = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tone === "primary" && "bg-lightPink text-deepRose",
        tone === "green" && "bg-leafGreen/10 text-leafGreen",
        tone === "gold" && "bg-goldBeige/20 text-[#795F35]",
        tone === "neutral" && "bg-graphite/5 text-softGraphite",
        className
      )}
      {...props}
    />
  );
}
