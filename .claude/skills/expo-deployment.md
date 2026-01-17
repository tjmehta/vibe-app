# Expo Deployment Skill

This skill covers deploying Expo applications using EAS (Expo Application Services).

## EAS Build

### Build Profiles

The `eas.json` file defines build profiles:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### Build Commands

```bash
# Development build (includes dev tools)
eas build --profile development --platform all

# Preview build (for internal testing)
eas build --profile preview --platform all

# Production build (for app stores)
eas build --profile production --platform all

# Single platform
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

### Build Configuration

#### iOS Specific

- Requires Apple Developer account ($99/year)
- EAS manages certificates and provisioning profiles
- Use `credentialsSource: "remote"` to let EAS handle credentials

#### Android Specific

- EAS generates signing key automatically
- Store keystore securely for production builds
- Configure `versionCode` auto-increment

## EAS Update (OTA Updates)

### How It Works

- Push JavaScript bundle updates without app store review
- Users get updates on next app launch
- Works with Expo Go and dev clients

### Update Commands

```bash
# Create update for current branch
eas update --auto

# Create update with message
eas update --message "Bug fix for login"

# Create update for specific branch
eas update --branch preview

# Create update for specific channel
eas update --channel production
```

### Branch and Channel Strategy

```
main branch → production channel → App Store version
preview branch → preview channel → TestFlight/Internal
feature branches → development channel → Dev testing
```

## EAS Submit

### App Store Submission

```bash
# Submit to both stores
eas submit --platform all

# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

### Prerequisites

#### iOS

- Apple Developer account
- App created in App Store Connect
- EAS configured with Apple credentials

#### Android

- Google Play Developer account
- App created in Google Play Console
- Service account JSON key configured

## Environment Variables

### Local Development

```bash
# .env
EXPO_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

### EAS Builds

```bash
# Set secret in EAS
eas secret:create --name EXPO_PUBLIC_CONVEX_URL --value https://...

# Or use environment files
eas secret:push --env-file .env.production
```

### Access in Code

```typescript
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL
```

## CI/CD Integration

### GitHub Actions for Preview

```yaml
- name: Create EAS Update
  run: eas update --auto --non-interactive
  env:
    EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

### PR Preview with QR Codes

- EAS generates QR codes for updates
- Comment on PR with QR code
- Testers scan to test changes

### Automated Production Deploys

1. Merge to main
2. CI creates EAS build
3. On success, submit to app stores
4. OTA updates for JS-only changes

## Monitoring

### EAS Dashboard

- Build status and logs
- Update distribution
- Crash reports (with Sentry integration)

### Update Analytics

- Track update adoption rate
- Monitor for rollback needs
- A/B test with update channels

## Troubleshooting

### Build Failures

1. Check build logs in EAS dashboard
2. Verify native dependencies are compatible
3. Check Expo SDK version compatibility
4. Clear cache: `eas build --clear-cache`

### Update Issues

1. Verify runtime version matches
2. Check network connectivity
3. Force update check: `Updates.checkForUpdateAsync()`
4. Clear Expo Go cache

### Credential Issues

```bash
# Reset iOS credentials
eas credentials --platform ios

# Reset Android keystore
eas credentials --platform android
```

## Best Practices

### Version Management

- Use semantic versioning
- Auto-increment build numbers
- Tag releases in git

### Testing Before Release

1. Test preview build internally
2. Beta test with TestFlight/Internal Testing
3. Gradual rollout for production
4. Monitor crash reports

### Rollback Strategy

- Keep previous builds accessible
- Use OTA updates for quick fixes
- Have native rollback plan for critical issues
