import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

interface WhatsAppButtonProps {
  /** Pre-filled chat message. Defaults to the generic order message. */
  message?: string;
  label?: string;
  variant?: "primary" | "whatsapp" | "ghost" | "dark" | "soft";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

/**
 * Opens a WhatsApp chat with the brand number and a pre-filled message.
 * The number is always read from `siteConfig` via `getWhatsAppLink`.
 */
export function WhatsAppButton({
  message,
  label = "Написать в WhatsApp",
  variant = "whatsapp",
  size = "md",
  className,
  fullWidth = false,
}: WhatsAppButtonProps) {
  return (
    <Button
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={cn(fullWidth && "w-full", className)}
    >
      <MessageCircle className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
      {label}
    </Button>
  );
}
