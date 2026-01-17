# Expo App Design Skill

This skill provides best practices for designing and building mobile applications with Expo and React Native.

## Architecture Principles

### Component Organization

- Use Expo Router for file-based navigation
- Organize screens in `app/` with route groups for logical separation
- Keep components small and focused on a single responsibility
- Use `components/ui/` for reusable UI primitives
- Place business logic in custom hooks (`lib/hooks/`)

### File Structure

```
app/
├── (tabs)/           # Tab-based navigation
│   ├── _layout.tsx   # Tab navigator config
│   ├── index.tsx     # Home tab
│   └── profile.tsx   # Profile tab
├── (auth)/           # Auth flow (modal or stack)
│   ├── _layout.tsx
│   ├── login.tsx
│   └── signup.tsx
└── _layout.tsx       # Root layout with providers
```

### Navigation Patterns

- Use route groups `()` for organizing without affecting URLs
- Use `[param]` for dynamic routes
- Use `+not-found.tsx` for 404 handling
- Keep layouts minimal - only navigation config and shared providers

## Styling with NativeWind

### Class Naming

```typescript
// Use Tailwind classes for styling
<View className="flex-1 bg-background p-4">
  <Text className="text-lg font-semibold text-foreground">
    Title
  </Text>
</View>
```

### Responsive Design

- Use `flex-1` for flexible layouts
- Use `SafeAreaView` for notch/status bar handling
- Test on multiple screen sizes
- Use percentage-based sizing for adaptability

### Theme Support

- Define colors as CSS variables in `global.css`
- Use semantic color names: `bg-background`, `text-foreground`, `border-border`
- Support dark mode via `useColorScheme` hook

## Performance Best Practices

### List Rendering

- Use `FlatList` or `FlashList` for long lists
- Implement proper `keyExtractor`
- Memoize list items with `React.memo`
- Use `getItemLayout` for fixed-size items

### Image Handling

- Use `expo-image` for optimized image loading
- Implement placeholder and error states
- Use appropriate image formats (WebP for photos)
- Cache images appropriately

### State Management

- Keep state as local as possible
- Use React Query or SWR for server state
- Use Zustand for global client state
- Avoid unnecessary re-renders with proper memoization

## Accessibility

### Screen Reader Support

- Add `accessibilityLabel` to interactive elements
- Use `accessibilityRole` for semantic meaning
- Implement `accessibilityHint` for complex interactions
- Test with VoiceOver (iOS) and TalkBack (Android)

### Visual Accessibility

- Ensure sufficient color contrast (4.5:1 for text)
- Support dynamic text sizes
- Don't rely solely on color for information
- Provide visual feedback for interactions

## Error Handling

### User-Friendly Errors

- Display human-readable error messages
- Provide actionable recovery options
- Log technical details for debugging
- Use error boundaries for graceful degradation

### Network Error Handling

```typescript
try {
  await mutation()
} catch (error) {
  const message = cleanConvexError(error.message)
  Alert.alert("Error", message)
}
```

## Testing Guidelines

### Unit Tests

- Test component rendering and interactions
- Mock external dependencies (navigation, API)
- Test edge cases and error states
- Keep tests focused and fast

### E2E Tests with Maestro

- Test critical user flows (auth, main features)
- Use stable selectors (testID, text content)
- Handle async operations with waits
- Run on both iOS and Android

## Common Patterns

### Loading States

```typescript
function Screen() {
  const data = useQuery(api.items.list)

  if (data === undefined) {
    return <LoadingSpinner />
  }

  return <ItemList items={data} />
}
```

### Form Handling

```typescript
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

async function handleSubmit() {
  setLoading(true)
  setError("")
  try {
    await signIn("password", { email, password, flow: "signIn" })
  } catch (err) {
    setError(cleanConvexError(err.message))
  } finally {
    setLoading(false)
  }
}
```

### Conditional Rendering

```typescript
{isAuthenticated ? (
  <AuthenticatedContent />
) : (
  <AuthPrompt />
)}
```
