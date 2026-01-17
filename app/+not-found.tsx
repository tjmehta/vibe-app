import { View, Text } from "react-native"
import { Link, Stack } from "expo-router"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-6 bg-background">
        <Text className="text-2xl font-bold text-foreground mb-4">Page Not Found</Text>
        <Text className="text-muted-foreground text-center mb-8">
          {"The page you're looking for doesn't exist."}
        </Text>
        <Link href="/" className="text-primary font-semibold">
          Go back home
        </Link>
      </View>
    </>
  )
}
