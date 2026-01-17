import { cn, cleanConvexError } from "@/lib/utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz")
  })

  it("handles undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar")
  })

  it("deduplicates tailwind classes", () => {
    expect(cn("px-4", "px-2")).toBe("px-2")
  })
})

describe("cleanConvexError", () => {
  it("extracts error message from Convex stack trace", () => {
    const convexError =
      "[Request ID: abc123] Server Error Uncaught Error: Invalid email or password at handler (convex/auth.ts:42)"
    expect(cleanConvexError(convexError)).toBe("Invalid email or password")
  })

  it("returns original message if not a Convex error", () => {
    expect(cleanConvexError("Something went wrong")).toBe("Something went wrong")
  })

  it("handles empty message", () => {
    expect(cleanConvexError("")).toBe("An unexpected error occurred")
  })

  it("handles undefined", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(cleanConvexError(undefined as any)).toBe("An unexpected error occurred")
  })

  it("handles simple Uncaught Error format", () => {
    const error = "Uncaught Error: User not found at handler"
    expect(cleanConvexError(error)).toBe("User not found")
  })
})
