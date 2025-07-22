import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-gentle hover:shadow-soft hover:scale-105 transition-gentle",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Oneria-specific button variants
        warm: "bg-community-warm text-white hover:bg-community-warm/90 shadow-gentle hover:shadow-warm hover:scale-105 transition-gentle",
        gentle: "bg-sleep-dawn text-sleep-deep hover:bg-sleep-dawn/80 shadow-gentle hover:shadow-soft hover:scale-105 transition-gentle",
        night: "bg-sleep-twilight text-white hover:bg-sleep-deep shadow-gentle hover:shadow-soft hover:scale-105 transition-gentle",
        earth: "bg-community-earth text-white hover:bg-community-earth/90 shadow-gentle hover:shadow-warm hover:scale-105 transition-gentle",
        sage: "bg-community-sage text-sleep-deep hover:bg-community-sage/80 shadow-gentle hover:shadow-soft hover:scale-105 transition-gentle",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-md px-4 py-2",
        lg: "h-14 rounded-lg px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
