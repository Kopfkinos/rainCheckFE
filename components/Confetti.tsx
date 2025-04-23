import { View, StyleSheet, Animated, Easing, Dimensions } from "react-native"
import LottieView from "lottie-react-native"
import React, { useEffect, useRef } from "react"

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView)
const { width, height } = Dimensions.get("window")

const Confetti = () => {
  const animationProgress = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 10000000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()
  }, [])

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <AnimatedLottieView
        source={require("../assets/animations/both-flake-confetti-slower.json")}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
    </View>
  )
}

export default Confetti

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 10,
    pointerEvents: "none", // IMPORTANT: apply it here!
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
})
