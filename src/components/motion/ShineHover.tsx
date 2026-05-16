import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Wraps content with a diagonal light sweep on hover (premium card sheen).
 * Pure CSS — see `.card-shine` in `globals.css`.
 */
export function ShineHover({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("card-shine", className)}>{children}</div>;
}
