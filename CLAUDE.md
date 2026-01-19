# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Development Commands

```bash
# Development
pnpm start                   # Start Expo dev server
pnpm dev                     # Start with dev client
pnpm ios                     # Run on iOS simulator
pnpm android                 # Run on Android emulator
pnpm web                     # Run in web browser

# Building
pnpm build:dev               # EAS development build
pnpm build:preview           # EAS preview build (internal testing)
pnpm build:prod              # EAS production build
pnpm update                  # Push OTA update via EAS Update

# Testing
pnpm test                    # Run Jest in watch mode
pnpm test:run                # Run Jest once
pnpm test:coverage           # Run with coverage report
pnpm test:e2e                # Run Maestro E2E tests

# Code Quality
pnpm lint                    # Run ESLint
pnpm lint:fix                # Fix ESLint issues
pnpm format                  # Format with Prettier
pnpm format:check            # Check formatting
pnpm fix                     # Fix lint + format
pnpm typecheck               # TypeScript type checking
```

## Architecture Overview

This is a **React Native + Expo** mobile app built with the **Vibe App** template. It's designed to work with a **Vibe Stack** backend (Next.js + Convex).

### Core Tech Stack

- **Expo SDK 54** with New Architecture (Fabric/TurboModules)
- **Expo Router** for file-based navigation
- **Convex** for backend (database, auth, real-time)
- **NativeWind v4** for Tailwind CSS styling
- **TypeScript** with strict typing
- **Jest + React Native Testing Library** for unit tests
- **Maestro** for E2E testing

### Directory Structure

```
├── app/                     # Expo Router screens
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/              # Main tab navigation
│   │   ├── index.tsx        # Home tab
│   │   ├── explore.tsx      # Explore tab
│   │   └── profile.tsx      # Profile tab
│   ├── _layout.tsx          # Root layout with providers
│   └── +not-found.tsx       # 404 screen
├── components/              # Reusable components
│   └── ui/                  # Base UI components
│       ├── Button.tsx
│       └── Input.tsx
├── convex/                  # Convex backend functions
│   ├── _generated/          # Auto-generated types
│   ├── auth.ts              # Auth configuration
│   ├── currentUser.ts       # User queries
│   ├── items.ts             # Example CRUD module
│   └── schema.ts            # Database schema
├── lib/                     # Utilities and hooks
│   ├── useColorScheme.ts    # Theme hook
│   └── utils.ts             # Helper functions
├── tests/                   # Test files
│   ├── components/          # Component tests
│   └── lib/                 # Utility tests
├── .maestro/                # E2E test flows
└── assets/                  # Images, fonts, etc.
```

### Convex Backend Integration

**Connecting to Backend**:

1. Set `EXPO_PUBLIC_CONVEX_URL` in `.env.local`
2. App automatically connects when URL is configured
3. Works without backend (shows placeholder content)

**Using Convex in Components**:

```typescript
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

// Query data (real-time)
const items = useQuery(api.items.list)

// Mutate data
const createItem = useMutation(api.items.create)
await createItem({ title: "New item" })
```

**Authentication**:

```typescript
import { useAuthActions } from "@convex-dev/auth/react"
import { useCurrentUser } from "@/convex/currentUser"

// Get current user
const user = useCurrentUser()

// Sign in/out
const { signIn, signOut } = useAuthActions()
await signIn("password", { email, password, flow: "signIn" })
await signOut()
```

### NativeWind Styling

Use Tailwind classes via the `className` prop:

```tsx
<View className="flex-1 bg-background p-4">
  <Text className="text-2xl font-bold text-foreground">Hello</Text>
  <Pressable className="bg-primary rounded-lg p-3 active:opacity-80">
    <Text className="text-primary-foreground text-center">Button</Text>
  </Pressable>
</View>
```

**Theme Colors** (defined in `tailwind.config.js`):

- `background` / `foreground` - Base colors
- `primary` / `primary-foreground` - Primary brand color
- `secondary` / `secondary-foreground` - Secondary color
- `muted` / `muted-foreground` - Muted elements
- `destructive` / `destructive-foreground` - Error states
- `border` - Border color
- `input` - Input backgrounds
- `ring` - Focus rings

### Component Patterns

**UI Components** use variants via `class-variance-authority`:

```tsx
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

<Button variant="primary" size="lg" onPress={handlePress}>
  Submit
</Button>

<Input
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
```

### Navigation

**Expo Router** uses file-based routing:

```tsx
import { Link, router } from "expo-router"

// Declarative navigation
;<Link href="/(tabs)/explore">Go to Explore</Link>

// Programmatic navigation
router.push("/(auth)/login")
router.replace("/(tabs)")
router.back()
```

### Testing

**Unit Tests** (Jest + React Native Testing Library):

```typescript
import { render, fireEvent } from "@testing-library/react-native"
import { Button } from "@/components/ui/Button"

test("Button calls onPress", () => {
  const onPress = jest.fn()
  const { getByText } = render(<Button onPress={onPress}>Click</Button>)
  fireEvent.press(getByText("Click"))
  expect(onPress).toHaveBeenCalled()
})
```

**E2E Tests** (Maestro):

```yaml
# .maestro/login.yaml
appId: com.vibestack.vibeapp
---
- launchApp
- tapOn: "Sign In"
- inputText:
    id: "email-input"
    text: "test@example.com"
- inputText:
    id: "password-input"
    text: "password123"
- tapOn: "Sign In"
- assertVisible: "Welcome"
```

### EAS Build & Update

**Build Profiles** (in `eas.json`):

- `development` - Dev client for local development
- `preview` - Internal testing builds
- `production` - App store builds

**OTA Updates**:

```bash
# Push update to preview channel
pnpm update

# Or specify channel
eas update --branch preview --message "Bug fix"
```

## Development Guidelines

### Code Patterns

- Use NativeWind classes for styling (no inline styles)
- Use `@/` path alias for imports
- Use Convex for all backend operations
- Prefer `useQuery` over manual fetching
- Handle loading and error states

### File Organization

- Components in `components/` with `ui/` subdirectory for base components
- Hooks in `lib/` with `use` prefix
- Screens in `app/` following Expo Router conventions
- Tests mirror source structure in `tests/`

### TypeScript

- Strict mode enabled
- Use generated Convex types
- Define prop interfaces for components
- Avoid `any`, use `unknown` with type guards

### Performance

- Use `React.memo` for expensive components
- Use `useMemo`/`useCallback` appropriately
- Optimize images with proper sizing
- Use Reanimated for smooth animations

### Testing Requirements

- Unit tests for utilities and hooks
- Component tests for UI components
- E2E tests for critical user flows
- Run tests before committing (husky pre-commit)

## Available Claude Skills

### Install via Claude Code Plugin Marketplace

**Expo Skills** (by Expo team):

```bash
/plugin marketplace add expo/skills
/plugin install expo-app-design      # UI/UX patterns for Expo apps
/plugin install expo-deployment      # EAS Build and Update workflows
/plugin install upgrading-expo       # SDK upgrade guidance
```

**React Native Best Practices** (by Callstack):

```bash
# Reference: https://github.com/callstackincubator/agent-skills
# Covers: FPS, re-renders, bundle size, TTI, native profiling, memory, animations
```

### Local Skills (`.claude/skills/`)

- **testing** - Jest and Maestro testing strategies

## Environment Variables

This project uses a consistent env file pattern:

| File Pattern | Purpose |
|--------------|---------|
| `.env.development` | Development environment vars |
| `.env.production` | Production environment vars |
| `.env.convex.development` | Convex dev deployment vars (local reference) |
| `.env.convex.production` | Convex prod deployment vars (local reference) |
| `.env.convex-cli.development` | Convex CLI deploy key for dev |
| `.env.convex-cli.production` | Convex CLI deploy key for prod |

**Local Development (expo start):**
- Expo loads `.env.development` automatically
- Create with: `cp .env.example .env.development`

**EAS Builds:**
- EAS does NOT auto-load .env files
- Set env vars in `eas.json` per profile or use EAS Secrets
- See: https://docs.expo.dev/eas/environment-variables/

**Convex:**
- Pull: `pnpm env:pull:convex`
- Push: `pnpm env:push:convex:development`
- Verify: `pnpm env:verify:convex`

**Required Variables:**
```bash
EXPO_PUBLIC_CONVEX_URL=     # Convex deployment URL
```

**Optional (CI):**
```bash
EXPO_TOKEN=                  # EAS authentication token
```

## Common Tasks

### Adding a New Screen

1. Create file in `app/` (e.g., `app/(tabs)/settings.tsx`)
2. Export default component
3. Add to tab bar in `app/(tabs)/_layout.tsx` if needed

### Adding a Convex Function

1. Create/edit file in `convex/`
2. Define query/mutation with validators
3. Import `api` from `@/convex/_generated/api`
4. Use with `useQuery`/`useMutation` hooks

### Adding a UI Component

1. Create in `components/ui/`
2. Use NativeWind for styling
3. Define variants with `cva` if needed
4. Export from `components/ui/index.ts`
5. Add tests in `tests/components/`
