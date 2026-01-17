# Vibe App

Production-ready React Native + Expo starter template with Convex backend, NativeWind styling, and EAS deployment.

## Features

- **Expo SDK 54** with New Architecture support
- **Expo Router** for file-based navigation
- **Convex** for real-time backend (auth, database, functions)
- **NativeWind v4** for Tailwind CSS styling
- **TypeScript** with strict configuration
- **Jest + React Native Testing Library** for unit testing
- **Maestro** for E2E testing
- **EAS Build & Update** for deployment
- **GitHub Actions** CI/CD with PR preview QR codes
- **Claude Code Skills** for AI-assisted development

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Expo account (for EAS builds)
- iOS Simulator / Android Emulator (optional)

### Setup

```bash
# Clone the template
npx create-expo-app my-app --template vibe-app

# Or clone directly
git clone https://github.com/tjmehta/vibe-app.git my-app
cd my-app

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development
pnpm start
```

### Connect to Backend (Optional)

This app is designed to work with [Vibe Stack](https://github.com/tjmehta/vibe-stack) backend:

```bash
# In your vibe-stack project
npx convex dev

# Copy the deployment URL to .env.local
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

The app works without a backend configured, showing placeholder content.

## Development

```bash
# Start Expo dev server
pnpm start

# Run on specific platform
pnpm ios          # iOS Simulator
pnpm android      # Android Emulator
pnpm web          # Web browser

# Start with dev client (for native modules)
pnpm dev
```

## Testing

```bash
# Unit tests (Jest)
pnpm test              # Watch mode
pnpm test:run          # Single run
pnpm test:coverage     # With coverage

# E2E tests (Maestro)
pnpm test:e2e
```

## Building

### Local Development Build

```bash
# Build dev client for all platforms
pnpm build:dev

# Or specific platform
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Preview Build (Internal Testing)

```bash
pnpm build:preview
```

### Production Build

```bash
pnpm build:prod
```

### OTA Updates

```bash
# Push update to current branch
pnpm update

# Or with custom message
eas update --branch preview --message "Bug fixes"
```

## Project Structure

```
├── app/                     # Expo Router screens
│   ├── (auth)/              # Auth flow (login, signup)
│   ├── (tabs)/              # Main tab navigation
│   ├── _layout.tsx          # Root layout
│   └── +not-found.tsx       # 404 screen
├── components/
│   └── ui/                  # Base UI components
├── convex/                  # Convex backend
│   ├── _generated/          # Auto-generated types
│   ├── auth.ts              # Auth config
│   └── schema.ts            # Database schema
├── lib/                     # Utilities and hooks
├── tests/                   # Test files
├── .maestro/                # E2E test flows
└── assets/                  # Static assets
```

## Styling with NativeWind

Use Tailwind classes via the `className` prop:

```tsx
<View className="flex-1 bg-background p-4">
  <Text className="text-2xl font-bold text-foreground">Hello World</Text>
</View>
```

## Using Convex

```tsx
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

function ItemList() {
  const items = useQuery(api.items.list)
  const createItem = useMutation(api.items.create)

  return (
    <View>
      {items?.map((item) => (
        <Text key={item._id}>{item.title}</Text>
      ))}
      <Button onPress={() => createItem({ title: "New" })}>Add Item</Button>
    </View>
  )
}
```

## Authentication

```tsx
import { useAuthActions } from "@convex-dev/auth/react"

function LoginScreen() {
  const { signIn } = useAuthActions()

  const handleLogin = async () => {
    await signIn("password", {
      email: "user@example.com",
      password: "password123",
      flow: "signIn",
    })
  }

  return <Button onPress={handleLogin}>Sign In</Button>
}
```

## CI/CD

### GitHub Actions Workflows

- **ci.yml** - Runs on every PR (lint, typecheck, test)
- **eas-build.yml** - Builds on push to main
- **eas-preview.yml** - Creates preview builds for PRs with QR codes

### Required Secrets

- `EXPO_TOKEN` - EAS authentication token

## Environment Variables

| Variable                 | Required | Description             |
| ------------------------ | -------- | ----------------------- |
| `EXPO_PUBLIC_CONVEX_URL` | No       | Convex deployment URL   |
| `EXPO_TOKEN`             | No       | EAS token for CI builds |

## Claude Code Integration

This project includes Claude Code skills for AI-assisted development:

- **expo-app-design** - UI/UX patterns
- **expo-deployment** - EAS workflows
- **upgrading-expo** - SDK upgrades
- **react-native-best-practices** - Performance tips
- **testing** - Testing strategies

See [CLAUDE.md](./CLAUDE.md) for detailed AI guidance.

## Related Projects

- [Vibe Stack](https://github.com/tjmehta/vibe-stack) - Next.js + Convex web starter
- [Expo](https://expo.dev) - React Native framework
- [Convex](https://convex.dev) - Backend platform
- [NativeWind](https://nativewind.dev) - Tailwind for React Native

## License

MIT
