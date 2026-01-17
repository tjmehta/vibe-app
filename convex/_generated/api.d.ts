/* eslint-disable */
/**
 * Generated API stub for Convex
 * This file is auto-generated when running `npx convex dev`
 * This stub allows the app to build without a Convex backend
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server"

import type * as auth from "../auth"
import type * as currentUser from "../currentUser"
import type * as items from "../items"

/**
 * A utility for referencing Convex functions in your app's API.
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth
  currentUser: typeof currentUser
  items: typeof items
}>

export type Mounts = {
  auth: {
    signIn: FunctionReference<
      "action",
      "public",
      { params: Record<string, unknown>; provider: string },
      unknown
    >
    signOut: FunctionReference<"action", "public", Record<string, never>, unknown>
  }
}

export declare const api: FilterApi<typeof fullApi & Mounts, FunctionReference<any, "public">>
export declare const internal: FilterApi<typeof fullApi, FunctionReference<any, "internal">>
