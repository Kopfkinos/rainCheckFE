import { Text, View, Image } from "react-native"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require("../assets/images/rainCheck-logo.png")}></Image>
      <Text>{`welcome to rainCheck... 
        cool things incoming, save the date 25/04/25`}</Text>
    </View>
  )
}
