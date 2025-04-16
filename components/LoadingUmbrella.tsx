import React from "react"
import { View, Text, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"

const LoadingUmbrella = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LottieView
          source={require("../assets/animations/umbrella.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  )
}

export default LoadingUmbrella

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
})