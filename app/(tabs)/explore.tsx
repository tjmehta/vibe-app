import { View, Text, ScrollView } from "react-native"

export default function ExploreScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-foreground mb-4">Explore</Text>
        <Text className="text-muted-foreground mb-6">
          Discover features and integrations available in Vibe App.
        </Text>

        <View className="gap-4">
          <ExploreItem
            title="Convex Backend"
            description="Type-safe database, real-time subscriptions, and serverless functions."
          />
          <ExploreItem
            title="NativeWind"
            description="Tailwind CSS for React Native - write familiar utility classes."
          />
          <ExploreItem
            title="EAS Build"
            description="Cloud builds for iOS and Android with over-the-air updates."
          />
          <ExploreItem
            title="Expo Router"
            description="File-based routing with deep linking and typed routes."
          />
        </View>
      </View>
    </ScrollView>
  )
}

function ExploreItem({ title, description }: { title: string; description: string }) {
  return (
    <View className="p-4 rounded-xl border border-border bg-card">
      <Text className="text-lg font-semibold text-foreground mb-1">{title}</Text>
      <Text className="text-sm text-muted-foreground">{description}</Text>
    </View>
  )
}
