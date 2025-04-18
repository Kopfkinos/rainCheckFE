import { View, Image, Text, StyleSheet } from "react-native"

export default function BothFlaked() {
  return (
    <View style={styles.logoWrapper}>
      <Image source={require("../assets/images/rainCheck-logo.png")} style={styles.logo} />
      <Image source={require("../assets/images/both-flaked.gif")} style={styles.gif} />
      <Text style={styles.header}> You're both not feeling it!</Text>
      <Text> Great minds think alike... </Text>
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
  header: {
    margin: 25,
    fontSize: 25,
  },
})
