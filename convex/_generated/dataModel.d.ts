/* eslint-disable */
/**
 * Generated data model stub for Convex
 * This file is auto-generated when running `npx convex dev`
 */

import type { GenericId } from "convex/values"
import type { GenericDataModel, GenericDocument, GenericTableInfo } from "convex/server"

// Auth tables from @convex-dev/auth
type AuthAccount = {
  _id: GenericId<"authAccounts">
  _creationTime: number
  userId: GenericId<"users">
  provider: string
  providerAccountId: string
  secret?: string
  emailVerificationTime?: number
  phoneVerificationTime?: number
}

type AuthRefreshToken = {
  _id: GenericId<"authRefreshTokens">
  _creationTime: number
  sessionId: GenericId<"authSessions">
  expirationTime: number
}

type AuthSession = {
  _id: GenericId<"authSessions">
  _creationTime: number
  userId: GenericId<"users">
  expirationTime: number
}

type AuthVerificationCode = {
  _id: GenericId<"authVerificationCodes">
  _creationTime: number
  accountId: GenericId<"authAccounts">
  provider: string
  code: string
  expirationTime: number
  emailVerified?: boolean
  phoneVerified?: boolean
}

type AuthVerifier = {
  _id: GenericId<"authVerifiers">
  _creationTime: number
  sessionId: GenericId<"authSessions"> | null
  signature: string
}

type AuthRateLimit = {
  _id: GenericId<"authRateLimits">
  _creationTime: number
  identifier: string
  lastAttemptTime: number
  attemptsRemaining: number
}

type User = {
  _id: GenericId<"users">
  _creationTime: number
  email?: string
  name?: string
  image?: string
  emailVerificationTime?: number
  phoneVerificationTime?: number
  isAnonymous?: boolean
}

type UserProfile = {
  _id: GenericId<"userProfiles">
  _creationTime: number
  userId: GenericId<"users">
  displayName?: string
  avatarUrl?: string
  bio?: string
  settings?: {
    theme?: "light" | "dark" | "system"
    notifications?: boolean
  }
  loginCount?: number
  createdAt: string
  updatedAt: string
}

type Item = {
  _id: GenericId<"items">
  _creationTime: number
  userId: GenericId<"users">
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type TableNames =
  | "authAccounts"
  | "authRefreshTokens"
  | "authSessions"
  | "authVerificationCodes"
  | "authVerifiers"
  | "authRateLimits"
  | "users"
  | "userProfiles"
  | "items"

export type DataModel = {
  authAccounts: GenericTableInfo
  authRefreshTokens: GenericTableInfo
  authSessions: GenericTableInfo
  authVerificationCodes: GenericTableInfo
  authVerifiers: GenericTableInfo
  authRateLimits: GenericTableInfo
  users: GenericTableInfo
  userProfiles: GenericTableInfo
  items: GenericTableInfo
}

export type Doc<TableName extends TableNames> = GenericDocument<DataModel, TableName>
export type Id<TableName extends TableNames> = GenericId<TableName>
