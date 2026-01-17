import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useRouter } from "expo-router"
import { useAuthActions } from "@convex-dev/auth/react"

import { Button } from "@/components/ui/Button"

export default function LoginScreen() {
  const router = useRouter()
  const { signIn } = useAuthActions()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      await signIn("password", { email, password, flow: "signIn" })
      router.replace("/(tabs)")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign in"
      Alert.alert("Error", message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 p-6 justify-center">
        <Text className="text-3xl font-bold text-foreground mb-2">Welcome back</Text>
        <Text className="text-muted-foreground mb-8">Sign in to your account</Text>

        <View className="gap-4 mb-6">
          <View>
            <Text className="text-sm font-medium text-foreground mb-2">Email</Text>
            <TextInput
              className="border border-border rounded-lg px-4 py-3 text-foreground bg-card"
              placeholder="you@example.com"
              placeholderTextColor="#8E8E93"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View>
            <Text className="text-sm font-medium text-foreground mb-2">Password</Text>
            <TextInput
              className="border border-border rounded-lg px-4 py-3 text-foreground bg-card"
              placeholder="Enter your password"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <Button variant="primary" onPress={handleLogin} disabled={isLoading}>
          <Text className="text-primary-foreground font-semibold">
            {isLoading ? "Signing in..." : "Sign In"}
          </Text>
        </Button>

        <View className="flex-row items-center justify-center mt-6">
          <Text className="text-muted-foreground">{"Don't have an account? "}</Text>
          <Text
            className="text-primary font-semibold"
            onPress={() => router.push("/(auth)/signup")}
          >
            Sign up
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
