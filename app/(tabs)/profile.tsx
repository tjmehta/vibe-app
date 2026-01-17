import { View, Text } from "react-native"
import { useRouter } from "expo-router"

import { Button } from "@/components/ui/Button"

export default function ProfileScreen() {
  const router = useRouter()

  return (
    <View className="flex-1 bg-background p-6">
      <View className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-muted items-center justify-center mb-4">
          <Text className="text-3xl">👤</Text>
        </View>
        <Text className="text-xl font-bold text-foreground">Guest User</Text>
        <Text className="text-muted-foreground">Sign in to access your profile</Text>
      </View>

      <View className="gap-4">
        <Button variant="primary" onPress={() => router.push("/(auth)/login")}>
          <Text className="text-primary-foreground font-semibold">Sign In</Text>
        </Button>
        <Button variant="outline" onPress={() => router.push("/(auth)/signup")}>
          <Text className="text-foreground font-semibold">Create Account</Text>
        </Button>
      </View>
    </View>
  )
}
