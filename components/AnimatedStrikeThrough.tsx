import { useState, useRef, useEffect } from "react"
import { Animated, Easing, Text, View, StyleSheet } from "react-native"

export default function AnimatedStrikeThrough({ title }) {
  const ref = useRef(View.prototype)
  const animatedValue = useRef(new Animated.Value(0)).current

  const [textWidth, setTextWidth] = useState(0)
  const [textHeight, setTextHeight] = useState(0)

  useEffect(() => {
    ref.current.measure((x, y, w, h) => {
      setTextWidth(w)
      setTextHeight(h)
      animateStrike()
    })
  }, [])

  const animateStrike = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()
  }

  const strikeWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, textWidth],
    extrapolate: "clamp",
  })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text} ref={ref}>
          {title}
        </Text>
        <Animated.View style={[styles.strike, { width: strikeWidth, top: textHeight / 2 + 1 }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#5B3EC6",
    fontSize: 40,
    textShadowColor: "white",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  strike: {
    position: "absolute",
    height: 2,
    backgroundColor: "white",
  },
})
