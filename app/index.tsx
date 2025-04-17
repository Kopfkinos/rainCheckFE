import { View } from "react-native";

import TestLogin from "./test-login";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login></Login>
    </View>
  );
}
