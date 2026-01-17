# Testing Skill

This skill covers testing strategies for React Native applications with Jest and Maestro.

## Unit Testing with Jest

### Setup

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run with coverage
pnpm test:coverage
```

### Component Testing

```typescript
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { LoginScreen } from "@/app/(auth)/login"

describe("LoginScreen", () => {
  it("renders login form", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />)

    expect(getByPlaceholderText("Email")).toBeTruthy()
    expect(getByPlaceholderText("Password")).toBeTruthy()
    expect(getByText("Sign In")).toBeTruthy()
  })

  it("shows error on invalid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />)

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com")
    fireEvent.changeText(getByPlaceholderText("Password"), "wrong")
    fireEvent.press(getByText("Sign In"))

    await waitFor(() => {
      expect(getByText("Invalid email or password")).toBeTruthy()
    })
  })
})
```

### Hook Testing

```typescript
import { renderHook, act } from "@testing-library/react-native"
import { useCounter } from "@/lib/hooks/useCounter"

describe("useCounter", () => {
  it("increments counter", () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
```

### Mocking

```typescript
// Mock navigation
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

// Mock Convex
jest.mock("convex/react", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue(jest.fn()),
}))

// Mock with implementation
import { useQuery } from "convex/react"

beforeEach(() => {
  ;(useQuery as jest.Mock).mockReturnValue([{ id: "1", title: "Test Item" }])
})
```

### Snapshot Testing

```typescript
import { render } from "@testing-library/react-native"
import { Button } from "@/components/ui/Button"

it("matches snapshot", () => {
  const { toJSON } = render(
    <Button variant="primary">
      <Text>Click me</Text>
    </Button>
  )

  expect(toJSON()).toMatchSnapshot()
})
```

## E2E Testing with Maestro

### Basic Flow

```yaml
# .maestro/login.yaml
appId: com.vibestack.vibeapp

---
- launchApp
- assertVisible: "Welcome"
- tapOn: "Sign In"
- tapOn: "Email"
- inputText: "test@example.com"
- tapOn: "Password"
- inputText: "password123"
- tapOn: "Sign In"
- assertVisible: "Home"
```

### Advanced Patterns

```yaml
# Wait for async operations
- extendedWaitUntil:
    visible: "Dashboard"
    timeout: 10000

# Scroll to find element
- scrollUntilVisible:
    element: "Settings"
    direction: DOWN

# Conditional flows
- runFlow:
    when:
      visible: "Skip Tutorial"
    commands:
      - tapOn: "Skip Tutorial"

# Take screenshot
- takeScreenshot: "login-success"
```

### Running Maestro Tests

```bash
# Run single test
maestro test .maestro/login.yaml

# Run all tests
pnpm test:e2e

# Interactive mode
maestro studio

# Run on specific device
maestro test --device "iPhone 15" .maestro/login.yaml
```

## Testing Best Practices

### What to Test

**Unit Tests:**

- Component rendering
- User interactions
- State changes
- Edge cases
- Error handling

**E2E Tests:**

- Critical user flows
- Authentication
- Core features
- Cross-screen navigation

### Test Organization

```
tests/
├── components/
│   ├── Button.test.tsx
│   └── Input.test.tsx
├── lib/
│   ├── utils.test.ts
│   └── hooks/
│       └── useAuth.test.ts
└── __snapshots__/
    └── Button.test.tsx.snap
```

### Naming Conventions

```typescript
describe("ComponentName", () => {
  describe("when condition", () => {
    it("should expected behavior", () => {
      // test
    })
  })
})
```

### Coverage Goals

- Aim for 80%+ coverage on critical paths
- Don't chase 100% - focus on valuable tests
- Cover error states and edge cases
- Test accessibility features

## Debugging Tests

### Jest Debugging

```bash
# Run specific test file
pnpm test Button.test.tsx

# Run tests matching pattern
pnpm test -t "renders correctly"

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Maestro Debugging

```bash
# Verbose output
maestro test --debug .maestro/login.yaml

# Record video
maestro test --record .maestro/login.yaml

# Studio mode for interactive debugging
maestro studio
```

## CI Integration

### GitHub Actions

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: "pnpm"
    - run: pnpm install --frozen-lockfile
    - run: pnpm test:run
    - run: pnpm test:coverage
    - uses: codecov/codecov-action@v4
      with:
        files: coverage/lcov.info
```

## Common Pitfalls

1. **Testing implementation details** - Test behavior, not implementation
2. **Flaky async tests** - Use proper waiting mechanisms
3. **Tight coupling** - Mock external dependencies
4. **Over-mocking** - Keep some integration tests
5. **Ignoring errors** - Test error states thoroughly
