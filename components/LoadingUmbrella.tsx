import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import LottieView from "lottie-react-native"
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
        <View style={styles.container}>
            <AnimatedLottieView
              source={require("../assets/animations/umbrella.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
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
      lottie: {
        width: wp("10%"),
        height: hp("10%"),
        alignSelf: "center",
      },
    })