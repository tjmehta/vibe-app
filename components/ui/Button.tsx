import { forwardRef } from "react"
import { Pressable, PressableProps, View, ActivityIndicator } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-lg px-4 py-3 active:opacity-80",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-border bg-transparent",
        ghost: "bg-transparent",
        destructive: "bg-destructive",
      },
      size: {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-6 py-4",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: true,
    },
  }
)

export interface ButtonProps
  extends Omit<PressableProps, "style">, VariantProps<typeof buttonVariants> {
  loading?: boolean
  className?: string
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Pressable
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          (disabled || loading) && "opacity-50",
          className
        )}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === "outline" || variant === "ghost" ? "#666" : "#fff"}
            size="small"
          />
        ) : (
          children
        )}
      </Pressable>
    )
  }
)

Button.displayName = "Button"
