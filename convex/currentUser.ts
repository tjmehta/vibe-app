import { query } from "./_generated/server"
import { auth } from "./auth"

/**
 * Get the current authenticated user's data
 * Returns user from Convex Auth's users table merged with userProfile settings
 */
export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx)

    if (!userId) {
      return null
    }

    const user = await ctx.db.get(userId)
    if (!user) {
      return null
    }

    // Get user profile with settings
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first()

    // Merge user and profile data
    return {
      ...user,
      profile,
      anonymous: false,
    }
  },
})
