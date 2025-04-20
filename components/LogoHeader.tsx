import { Image, StyleSheet, View } from "react-native"

export default function LogoHeader() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/rainCheck-logo.png")} style={styles.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },
})
