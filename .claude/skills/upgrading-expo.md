# Upgrading Expo Skill

This skill guides you through upgrading Expo SDK versions safely and efficiently.

## Before Upgrading

### Check Compatibility

1. Read the [Expo SDK changelog](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
2. Review breaking changes
3. Check native dependency compatibility
4. Verify third-party library support

### Prepare Your Project

```bash
# Commit all changes
git add . && git commit -m "Pre-upgrade checkpoint"

# Create upgrade branch
git checkout -b upgrade/expo-XX
```

## Upgrade Process

### Step 1: Update Expo SDK

```bash
# Install upgrade tool
npx expo install expo@latest

# Or specific version
npx expo install expo@~54.0.0
```

### Step 2: Update Dependencies

```bash
# Update all Expo packages to compatible versions
npx expo install --fix

# This updates:
# - expo-* packages
# - react-native
# - react
# - Other compatible dependencies
```

### Step 3: Update Configuration

#### app.json

```json
{
  "expo": {
    "sdkVersion": "54.0.0"
  }
}
```

#### babel.config.js

Check if babel preset needs updating:

```javascript
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  }
}
```

### Step 4: Clear Caches

```bash
# Clear Metro cache
npx expo start --clear

# Clear node modules (if needed)
rm -rf node_modules
pnpm install

# Clear Watchman (macOS)
watchman watch-del-all
```

### Step 5: Test Thoroughly

```bash
# Start development server
npx expo start

# Run on iOS Simulator
npx expo run:ios

# Run on Android Emulator
npx expo run:android

# Run tests
pnpm test:run
```

## Common Issues

### Metro Bundler Issues

```bash
# Clear Metro cache
npx expo start --clear

# Reset Metro
rm -rf .expo
```

### Native Module Errors

1. Check if module supports new SDK
2. Look for updated version
3. Check for migration guide
4. Consider alternatives if deprecated

### TypeScript Errors

```bash
# Regenerate types
rm -rf node_modules/@types
pnpm install

# Check for updated @types packages
npx expo install @types/react @types/react-native
```

### NativeWind Issues

1. Check NativeWind compatibility with new RN version
2. Update NativeWind: `npx expo install nativewind`
3. Clear babel cache: `rm -rf node_modules/.cache`

## Version-Specific Notes

### SDK 54 (Current)

- React Native 0.76
- React 18.3
- New Architecture (Fabric) available
- Expo Router 4.x

### Major Changes to Watch

- Deprecated APIs removed
- New default behaviors
- Navigation library updates
- Build system changes

## Rollback Plan

### If Upgrade Fails

```bash
# Discard changes and return to working state
git checkout main
git branch -D upgrade/expo-XX

# Or reset to pre-upgrade commit
git reset --hard HEAD~1
```

### Partial Rollback

```bash
# Revert specific package
npx expo install expo@~53.0.0

# Fix dependencies
npx expo install --fix
```

## Post-Upgrade

### Update Documentation

- Update SDK version in README
- Document any breaking changes handled
- Update CLAUDE.md if patterns changed

### Update CI/CD

- Verify build workflows pass
- Update EAS build profiles if needed
- Test OTA updates work correctly

### Commit Strategy

```bash
# Commit upgrade in logical chunks
git add package.json pnpm-lock.yaml
git commit -m "chore: upgrade expo sdk to 54"

git add app.json
git commit -m "chore: update app.json for sdk 54"

git add -A
git commit -m "fix: resolve sdk 54 compatibility issues"
```

## Automated Upgrade Checks

### Dependabot/Renovate

Configure for Expo updates:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      expo:
        patterns:
          - "expo"
          - "expo-*"
          - "@expo/*"
```

### Pre-upgrade Testing

```bash
# Run full test suite
pnpm lint && pnpm typecheck && pnpm test:run

# Build preview to verify
eas build --profile preview --platform all
```

## Resources

- [Expo Upgrade Guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [Expo Changelog](https://expo.dev/changelog)
- [React Native Releases](https://github.com/facebook/react-native/releases)
- [NativeWind Compatibility](https://www.nativewind.dev/)
