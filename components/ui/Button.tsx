import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variants = {
      primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
      secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-slate-200",
      outline: "border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-white",
      ghost: "hover:bg-[var(--muted)] text-foreground",
    };
    const sizes = {
      sm: "h-9 px-3 text-sm rounded-md",
      md: "h-10 px-5 text-sm rounded-md",
      lg: "h-12 px-6 text-base rounded-lg",
    };
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
