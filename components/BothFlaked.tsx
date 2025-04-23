import { View, Image, Text, StyleSheet } from "react-native"
import ReturnButton from "./ReturnButton"

export default function BothFlaked({ title }) {
  return (
    <View style={styles.logoWrapper}>
      <Image source={require("../assets/images/rainCheck-logo.png")} style={styles.logo} />
      <Image source={require("../assets/images/both-flaked.gif")} style={styles.gif} />
      <Text style={styles.eventTitle}>{title}?</Text>
      <Text style={styles.header}> You're both not feeling it!</Text>
      <Text> Great minds think alike... </Text>
      <View style={styles.returnButton}>
        <ReturnButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },
  gif: {
    width: 400,
    height: 250,
  },
  eventTitle: {
    color: "#5B3EC6",
    fontSize: 30,
    marginTop: 30,
    alignSelf: "center",
  },
  header: {
    margin: 25,
    fontSize: 25,
  },
  returnButton: {
    marginTop: 3,
  },
})
