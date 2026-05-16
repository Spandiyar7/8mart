import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "whatsapp" | "ghost" | "dark" | "soft";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full " +
  "font-semibold tracking-tight transition-all duration-300 ease-out outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-milk " +
  "disabled:pointer-events-none disabled:opacity-50 select-none whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-[0_14px_36px_-12px_rgba(217,21,114,0.7)] " +
    "hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-12px_rgba(217,21,114,0.85)] " +
    "active:translate-y-0 focus-visible:ring-primary",
  whatsapp:
    "glass text-graphite hover:-translate-y-0.5 " +
    "hover:shadow-[0_20px_48px_-16px_rgba(63,111,58,0.45)] " +
    "active:translate-y-0 focus-visible:ring-leaf-green",
  ghost:
    "border border-graphite/15 bg-white/55 text-graphite backdrop-blur-md " +
    "hover:border-graphite/30 hover:bg-white/80 hover:-translate-y-0.5 " +
    "focus-visible:ring-graphite/40",
  dark:
    "bg-graphite text-white hover:bg-soft-graphite hover:-translate-y-0.5 " +
    "shadow-[0_14px_34px_-14px_rgba(37,38,43,0.7)] active:translate-y-0 " +
    "focus-visible:ring-graphite",
  soft:
    "bg-light-pink text-deep-rose hover:bg-[#ffd3e6] hover:-translate-y-0.5 " +
    "active:translate-y-0 focus-visible:ring-primary",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.35rem] px-7 text-[0.95rem]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Polymorphic CTA button — renders an anchor when `href` is supplied,
 * otherwise a native button. Both are fully keyboard accessible.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={classes} {...(props as ButtonAsAnchor)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
