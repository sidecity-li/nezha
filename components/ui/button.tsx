import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>
  {
  asChild?: boolean,
  variant?: "default" | "outline" | "underline",
  size?: "sm" | "default" | "lg",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "sm",asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const baseClassName = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full  transition-colors  disabled:opacity-30 hover:opacity-80";
    
    const variantClassName = {
      default:
        "bg-primary-action text-white hover:bg-primary/90 ",
      outline:
        "border border-primary-action text-primary-text hover:bg-accent hover:text-accent-foreground",
      underline: "text-primary-text underline-offset-4  underline",
    }[variant];

    const sizeClassName = {
      sm: "px-6 py-3 text-sm font-semibold h-10",
      default: "px-10 py-3 text-base font-semibold h-12", 
      lg: "py-4 px-10 text-lg text-base font-semibold h-14",
    }[size];



    return (
      <Comp
        className={cn(baseClassName, variantClassName,sizeClassName, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
