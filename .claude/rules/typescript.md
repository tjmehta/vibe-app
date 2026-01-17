# TypeScript Rules

These rules are automatically applied when writing TypeScript code.

## Type Safety

### Strict Mode

- Project uses strict TypeScript (`"strict": true`)
- Avoid `any` - use `unknown` and type guards instead
- Enable all strict flags in tsconfig.json

### Type Inference

```typescript
// Let TypeScript infer when obvious
const items = useState<Item[]>([]) // Type parameter needed
const count = 0 // Inferred as number

// Explicit types for function signatures
function processItem(item: Item): ProcessedItem {
  // ...
}
```

### Type Guards

```typescript
// Use type guards for runtime checks
function isError(value: unknown): value is Error {
  return value instanceof Error
}

// Discriminated unions
type Result<T> = { success: true; data: T } | { success: false; error: string }
```

## Import Conventions

### Path Aliases

```typescript
// Use @ alias for project imports
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { api } from "@/convex/_generated/api"

// Relative imports only for same directory
import { helper } from "./helper"
```

### Import Order

1. React/React Native
2. External libraries
3. Internal modules (@/)
4. Relative imports
5. Types (with `type` keyword)

```typescript
import { useState } from "react"
import { View, Text } from "react-native"

import { useQuery } from "convex/react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

import { helper } from "./helper"

import type { Item } from "@/types"
```

## Error Handling

### Try-Catch Pattern

```typescript
async function fetchData() {
  try {
    const data = await api.getData()
    return { success: true, data }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return { success: false, error: message }
  }
}
```

### Error Types

```typescript
// Define custom error types
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message)
    this.name = "ValidationError"
  }
}

// Type-safe error handling
if (error instanceof ValidationError) {
  console.log(`Field ${error.field}: ${error.message}`)
}
```

## React Patterns

### Component Types

```typescript
// Function components with props
interface ButtonProps {
  children: React.ReactNode
  onPress: () => void
  disabled?: boolean
}

export function Button({ children, onPress, disabled = false }: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {children}
    </Pressable>
  )
}
```

### Hook Return Types

```typescript
// Explicit return types for hooks
function useAuth(): {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
} {
  // ...
}
```

### Event Handlers

```typescript
// Type event handlers
const handlePress = (event: GestureResponderEvent) => {
  // ...
}

const handleChange = (text: string) => {
  setValue(text)
}
```

## Convex Types

### Generated Types

```typescript
// Use generated types from Convex
import type { Doc, Id } from "@/convex/_generated/dataModel"

// Document type
type Item = Doc<"items">

// ID type
type ItemId = Id<"items">
```

### Query/Mutation Args

```typescript
// Types are inferred from validators
import { v } from "convex/values"

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  // args is typed as { title: string; description?: string }
  handler: async (ctx, args) => {
    // ...
  },
})
```

## Best Practices

### Const Assertions

```typescript
// Use as const for literal types
const THEMES = ["light", "dark", "system"] as const
type Theme = (typeof THEMES)[number] // "light" | "dark" | "system"
```

### Utility Types

```typescript
// Use built-in utility types
type PartialItem = Partial<Item>
type ItemWithoutId = Omit<Item, "_id">
type ItemKeys = keyof Item
type RequiredItem = Required<Item>
```

### Null Checks

```typescript
// Use optional chaining
const name = user?.profile?.name

// Use nullish coalescing
const displayName = name ?? "Anonymous"

// Non-null assertion only when certain
const element = document.getElementById("app")!
```

## Naming Conventions

- **Types/Interfaces**: PascalCase (`UserProfile`, `ApiResponse`)
- **Variables/Functions**: camelCase (`fetchUser`, `isLoading`)
- **Constants**: SCREAMING_SNAKE_CASE or camelCase (`API_URL`, `maxRetries`)
- **Files**: kebab-case or camelCase (`user-profile.ts`, `useAuth.ts`)
- **Components**: PascalCase (`Button.tsx`, `UserCard.tsx`)

## Documentation

```typescript
/**
 * Fetches user data from the API
 * @param userId - The unique identifier of the user
 * @returns The user object or null if not found
 * @throws {ApiError} When the API request fails
 */
async function getUser(userId: string): Promise<User | null> {
  // ...
}
```
