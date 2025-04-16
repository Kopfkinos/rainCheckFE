import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import LottieView from "lottie-react-native"
import React, { useEffect, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LoadingUmbrella = ({ message = "Loading..." }: { message?: string }) => {
    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationProgress.current, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }, []);

  return (
    <View style={styles.container}>
        <AnimatedLottieView
          source={require("../assets/animations/umbrella.json")}
          autoPlay
          loop
          style={{width: wp("15%"), height: wp("15%")}}
        />
        <Text style={styles.text}>Loading...</Text>
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
    width: wp("30%"),
    height: wp("30%"),
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    textAlign: "center",
  },
})