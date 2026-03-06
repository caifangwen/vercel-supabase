import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "accent" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium";
    const variants = {
      default: "bg-[var(--primary)] text-[var(--primary-foreground)]",
      secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
      accent: "bg-[var(--accent)] text-[var(--accent-foreground)]",
      outline: "border border-[var(--border)] bg-transparent",
    };
    return (
      <span
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
