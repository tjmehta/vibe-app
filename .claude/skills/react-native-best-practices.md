# React Native Best Practices Skill

This skill provides performance optimization and best practices for React Native development, adapted from Callstack's expertise.

## Performance Optimization

### Avoid Unnecessary Re-renders

#### Use React.memo Wisely

```typescript
// Memoize expensive components
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map((item) => <ListItem key={item.id} item={item} />)
})

// With custom comparison
const ListItem = React.memo(
  function ListItem({ item }) {
    return <View><Text>{item.title}</Text></View>
  },
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
)
```

#### Use useCallback and useMemo

```typescript
// Memoize callbacks passed to children
const handlePress = useCallback(
  (id: string) => {
    // handle press
  },
  [dependency]
)

// Memoize expensive computations
const filteredItems = useMemo(() => items.filter((item) => item.active), [items])
```

### List Performance

#### Use FlashList for Large Lists

```typescript
import { FlashList } from "@shopify/flash-list"

<FlashList
  data={items}
  renderItem={({ item }) => <ItemRow item={item} />}
  estimatedItemSize={80}
  keyExtractor={(item) => item.id}
/>
```

#### FlatList Optimization

```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  // Performance props
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
  initialNumToRender={10}
  // For fixed height items
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

### Image Optimization

#### Use expo-image

```typescript
import { Image } from "expo-image"

<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  placeholder={blurhash}
  transition={200}
/>
```

#### Image Caching Strategy

- Use appropriate cache policies
- Preload critical images
- Use proper image sizes (not oversized)
- Consider WebP format for smaller sizes

### Animation Performance

#### Use Reanimated for Complex Animations

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"

function AnimatedComponent() {
  const offset = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(offset.value) }],
  }))

  return <Animated.View style={animatedStyle} />
}
```

#### Avoid Layout Animations on JS Thread

- Use `useNativeDriver: true` when possible
- Prefer transform over layout properties
- Batch animation updates

## Memory Management

### Avoid Memory Leaks

#### Clean Up Subscriptions

```typescript
useEffect(() => {
  const subscription = someEmitter.addListener("event", handler)

  return () => {
    subscription.remove()
  }
}, [])
```

#### Cancel Async Operations

```typescript
useEffect(() => {
  let cancelled = false

  async function fetchData() {
    const data = await api.getData()
    if (!cancelled) {
      setData(data)
    }
  }

  fetchData()

  return () => {
    cancelled = true
  }
}, [])
```

### Large Data Handling

- Paginate large lists
- Use virtualization
- Clean up unused data
- Implement proper garbage collection

## Code Architecture

### Separation of Concerns

#### Container/Presenter Pattern

```typescript
// Container (logic)
function UserProfileContainer() {
  const user = useQuery(api.currentUser.get)
  const updateProfile = useMutation(api.userProfiles.update)

  if (!user) return <LoadingSpinner />

  return (
    <UserProfilePresenter
      user={user}
      onUpdate={updateProfile}
    />
  )
}

// Presenter (UI)
function UserProfilePresenter({ user, onUpdate }) {
  return (
    <View>
      <Text>{user.name}</Text>
      <Button onPress={() => onUpdate({ name: "New Name" })}>
        Update
      </Button>
    </View>
  )
}
```

### Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    logError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={() => this.setState({ hasError: false })} />
    }
    return this.props.children
  }
}
```

## TypeScript Best Practices

### Strict Typing

```typescript
// Define clear interfaces
interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

// Use discriminated unions for state
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error }
```

### Type-Safe Navigation

```typescript
// Define route params
type RootStackParamList = {
  Home: undefined
  Profile: { userId: string }
  Settings: undefined
}

// Type-safe navigation
const navigation = useNavigation<NavigationProp<RootStackParamList>>()
navigation.navigate("Profile", { userId: "123" })
```

## Testing Strategies

### Component Testing

```typescript
import { render, fireEvent } from "@testing-library/react-native"

test("button calls onPress when pressed", () => {
  const onPress = jest.fn()
  const { getByText } = render(
    <Button onPress={onPress}>
      <Text>Click me</Text>
    </Button>
  )

  fireEvent.press(getByText("Click me"))
  expect(onPress).toHaveBeenCalled()
})
```

### Mock Native Modules

```typescript
jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}))
```

## Debugging Tips

### React DevTools

- Use React DevTools profiler
- Identify unnecessary re-renders
- Check component hierarchy

### Performance Monitoring

```typescript
// Enable performance monitoring in development
if (__DEV__) {
  require("react-native").unstable_enableLogBox()
}
```

### Common Issues

1. **Yellow boxes**: Address warnings, don't ignore
2. **Memory leaks**: Use cleanup functions
3. **Slow navigation**: Optimize screen components
4. **Janky animations**: Move to native driver

## Security Considerations

### Secure Storage

```typescript
import * as SecureStore from "expo-secure-store"

// Store sensitive data
await SecureStore.setItemAsync("authToken", token)

// Never store sensitive data in AsyncStorage
// AsyncStorage is not encrypted
```

### Input Validation

- Sanitize user input
- Validate before sending to backend
- Use proper encoding for URLs

### Network Security

- Use HTTPS only
- Pin certificates for sensitive apps
- Don't log sensitive data
