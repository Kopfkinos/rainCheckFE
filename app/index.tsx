import { View } from "react-native"
import { useEffect, useState, lazy } from "react"

import Login from "./login"
import { StatusBar } from "expo-status-bar"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar hidden />
      <Login />
    </View>
  )
}
