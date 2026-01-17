# Convex Rules

These rules are automatically applied when working with Convex backend code.

## Schema Design

### Table Definitions

```typescript
// Always use validators from convex/values
import { v } from "convex/values"

// Define tables with proper indexes
items: defineTable({
  userId: v.id("users"),
  title: v.string(),
  createdAt: v.string(), // ISO timestamp
}).index("by_user", ["userId"])
```

### Required Patterns

- Always add `userId` field for user-owned data
- Create indexes for frequently queried fields
- Use ISO strings for timestamps
- Use `v.id("tableName")` for references

## Authentication

### Server-Side Auth Check

```typescript
import { auth } from "./auth"

export const myQuery = query({
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) {
      return null // Or throw for protected routes
    }
    // ... rest of handler
  },
})
```

### Client-Side Auth

```typescript
import { useAuthActions } from "@convex-dev/auth/react"

const { signIn, signOut } = useAuthActions()

// Sign in
await signIn("password", { email, password, flow: "signIn" })

// Sign out
await signOut()
```

## Query Patterns

### Always Use Indexes

```typescript
// GOOD: Uses index
await ctx.db
  .query("items")
  .withIndex("by_user", (q) => q.eq("userId", userId))
  .collect()

// BAD: Full table scan
await ctx.db
  .query("items")
  .filter((q) => q.eq(q.field("userId"), userId))
  .collect()
```

### Pagination

```typescript
export const listPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("items")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .paginate(args.paginationOpts)
  },
})
```

## Mutation Patterns

### Validation

```typescript
export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    // Auth check
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    // Input validation (if needed beyond schema)
    if (args.title.length > 200) {
      throw new Error("Title too long")
    }

    // Create with timestamps
    return await ctx.db.insert("items", {
      userId,
      title: args.title,
      createdAt: new Date().toISOString(),
    })
  },
})
```

### Authorization

```typescript
export const update = mutation({
  args: { id: v.id("items"), title: v.string() },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    // Check ownership
    const item = await ctx.db.get(args.id)
    if (!item) throw new Error("Item not found")
    if (item.userId !== userId) throw new Error("Not authorized")

    // Update
    await ctx.db.patch(args.id, { title: args.title })
  },
})
```

## Error Handling

### Clean Error Messages

```typescript
// In Convex functions - throw clear errors
throw new Error("Invalid email or password")

// On client - clean the error
import { cleanConvexError } from "@/lib/utils"

try {
  await mutation()
} catch (error) {
  const message = cleanConvexError(error.message)
  // Display to user
}
```

## Security Rules

1. **Always validate auth** in mutations that modify user data
2. **Check ownership** before updates/deletes
3. **Never trust client data** - validate in mutations
4. **Use indexes** to scope queries to authorized data
5. **Don't expose internal IDs** in error messages

## Client Usage

### React Native

```typescript
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

function Component() {
  const items = useQuery(api.items.list)
  const createItem = useMutation(api.items.create)

  // items is undefined while loading
  if (items === undefined) return <Loading />

  return <ItemList items={items} onCreate={createItem} />
}
```

### Optimistic Updates

```typescript
const createItem = useMutation(api.items.create).withOptimisticUpdate(
  (localStore, args) => {
    const items = localStore.getQuery(api.items.list, {})
    if (items) {
      localStore.setQuery(api.items.list, {}, [...items, { _id: "temp", ...args }])
    }
  }
)
```
