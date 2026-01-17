import { View, Text, ScrollView } from "react-native"
import { Link } from "expo-router"

import { Button } from "@/components/ui/Button"

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-8 pt-16">
        <Text className="text-4xl font-bold text-foreground mb-4">Vibe App</Text>
        <Text className="text-lg text-muted-foreground text-center mb-8">
          Production-ready React Native + Expo starter with Convex, NativeWind, and EAS.
        </Text>

        <View className="w-full gap-4">
          <Link href="/(auth)/login" asChild>
            <Button variant="primary">
              <Text className="text-primary-foreground font-semibold">Get Started</Text>
            </Button>
          </Link>
          <Link href="/explore" asChild>
            <Button variant="outline">
              <Text className="text-foreground font-semibold">Explore</Text>
            </Button>
          </Link>
        </View>

        <View className="mt-16 w-full gap-4">
          <FeatureCard
            title="Authentication"
            description="Convex Auth with email/password, social login, and secure sessions."
          />
          <FeatureCard
            title="Real-time"
            description="Live data sync with Convex - updates appear instantly across devices."
          />
          <FeatureCard
            title="Cross-platform"
            description="One codebase for iOS, Android, and Web with Expo."
          />
        </View>
      </View>
    </ScrollView>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <View className="p-4 rounded-xl border border-border bg-card">
      <Text className="text-lg font-semibold text-foreground mb-1">{title}</Text>
      <Text className="text-sm text-muted-foreground">{description}</Text>
    </View>
  )
}
