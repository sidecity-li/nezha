"use client";
import * as React from "react";
import { cn } from "@/lib";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "underline";
  size?: "sm" | "default" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClassName =
      "disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full  transition-colors  disabled:opacity-30 not-disabled:hover:opacity-80";

    const variantClassName = {
      default: "bg-primary-action text-white not-disabled:hover:bg-primary/90 ",
      outline:
        "border border-primary-action text-primary-text not-disabled:hover:bg-accent not-disabled:hover:text-accent-foreground",
      underline: "text-primary-text underline-offset-4  underline",
    }[variant];

    let sizeClassName;

    if (variant !== "underline") {
      sizeClassName = {
        sm: "px-6 py-3 text-sm font-semibold h-10",
        default: "px-10 py-3 text-base font-semibold h-12",
        lg: "py-4 px-10 text-lg text-base font-semibold h-14",
      }[size];
    }

    return (
      <button
        className={cn(
          baseClassName,
          variantClassName,
          sizeClassName,
          {
            "px-0": variant === "underline",
            "py-0": variant === "underline",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
