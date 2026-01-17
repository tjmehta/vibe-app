import { Stack } from "expo-router"

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Sign In",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  )
}
