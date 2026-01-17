import { forwardRef } from "react"
import { TextInput, TextInputProps, View, Text } from "react-native"

import { cn } from "@/lib/utils"

export interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerClassName?: string
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => {
    return (
      <View className={cn("w-full", containerClassName)}>
        {label && (
          <Text className="text-sm font-medium text-foreground mb-1.5">{label}</Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
            error ? "border-destructive" : "border-border",
            "focus:border-primary",
            className
          )}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {error && <Text className="text-sm text-destructive mt-1">{error}</Text>}
      </View>
    )
  }
)

Input.displayName = "Input"
