import React from "react"
import { Text } from "react-native"
import { render, fireEvent } from "@testing-library/react-native"

import { Button } from "@/components/ui/Button"

describe("Button", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Button>
        <Text>Click me</Text>
      </Button>
    )

    expect(getByText("Click me")).toBeTruthy()
  })

  it("calls onPress when pressed", () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Button onPress={onPress}>
        <Text>Click me</Text>
      </Button>
    )

    fireEvent.press(getByText("Click me"))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Button onPress={onPress} disabled>
        <Text>Click me</Text>
      </Button>
    )

    fireEvent.press(getByText("Click me"))
    expect(onPress).not.toHaveBeenCalled()
  })

  it("shows loading indicator when loading", () => {
    const { queryByText } = render(
      <Button loading testID="loading-button">
        <Text>Click me</Text>
      </Button>
    )

    // When loading, children should not be visible (ActivityIndicator is shown instead)
    // The ActivityIndicator is rendered in place of children
    expect(queryByText("Click me")).toBeNull()
  })

  it("does not call onPress when loading", () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Button onPress={onPress} loading testID="loading-button">
        <Text>Click me</Text>
      </Button>
    )

    fireEvent.press(getByTestId("loading-button"))
    expect(onPress).not.toHaveBeenCalled()
  })
})
