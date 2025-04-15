import { View, Text } from "react-native"
import { Link } from "expo-router"

export default function UserProfilePage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> This is the user page</Text>
      <Link href="/event/createEvent"> Create a new event </Link>
    </View>
  )
}
