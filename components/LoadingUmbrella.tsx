import { View, Text, StyleSheet, Animated, Easing, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LoadingUmbrella = () => {
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
    <ImageBackground
      source={require("../assets/images/loading-bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <AnimatedLottieView
          source={require("../assets/animations/umbrella.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </ImageBackground>
  );
};

export default LoadingUmbrella;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: wp("100%"),
    height: hp("100%"),
    alignSelf: "center",
  },
});
