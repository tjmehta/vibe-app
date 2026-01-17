import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  ...authTables,

  // User profiles with app-specific settings
  userProfiles: defineTable({
    userId: v.id("users"),
    displayName: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    settings: v.optional(
      v.object({
        theme: v.optional(
          v.union(v.literal("light"), v.literal("dark"), v.literal("system"))
        ),
        notifications: v.optional(v.boolean()),
      })
    ),
    loginCount: v.optional(v.number()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_user", ["userId"]),

  // Example items table - replace with your own tables
  items: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    completed: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_completed", ["userId", "completed"]),
})
