import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({ icon, children, variant = "primary", ...props }: ButtonProps) {
  return (
    <button data-variant={variant} {...props}>
      {icon}
      {children}
    </button>
  );
}
