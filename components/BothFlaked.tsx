import { View, Image, Text, StyleSheet, ImageBackground } from "react-native"
import ReturnButton from "./ReturnButton"
import Confetti from "../components/Confetti"
import AnimatedStrikeThrough from "./AnimatedStrikeThrough"

export default function BothFlaked({ title }) {
  return (
    <View style={styles.container}>
      <Confetti />
      <ImageBackground
        source={require("../assets/images/midnightSky.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image source={require("../assets/images/rainCheck-logo.png")} style={styles.logo} />
          {/* <Text style={styles.eventTitle}>{title}?</Text> */}
          <AnimatedStrikeThrough title={title} />
          <View>
            <Text style={styles.header}>You're both not feeling it!</Text>
            <Text style={styles.subHeading}>(Great minds flake alike...)</Text>
          </View>
          <View style={styles.returnButton}>
            <ReturnButton />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly", // nicely spaces vertically
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },
  eventTitle: {
    color: "#5B3EC6",
    fontSize: 40,
    marginTop: 30,
    textAlign: "center",
    textDecorationLine: "line-through",
    textShadowColor: "white",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  header: {
    color: "white",
    marginVertical: 10,
    fontSize: 40,
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  subHeading: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  returnButton: {
    marginTop: 20,
  },
})
