import { useState, useContext } from "react"
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useRouter } from "expo-router"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import { EyeOffOutline, EyeOutline } from "react-ionicons"
import { UserContext } from "./contexts/UserContext"

import { getUsers } from "@/utils/api-funcs"

export default function Login() {
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisisble, setPasswordVisible] = useState(false)
  const [isValidLogin, setIsValidLogin] = useState(true)

  const { user, setUser } = useContext(UserContext)

  const router = useRouter()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisisble)
  }

  const handleSubmit = () => {
    getUsers().then((users) => {
      users.forEach((user) => {
        if (user.username === username && user.password === password) {
          setIsValidLogin(true)
          setUser(username)
          router.push("/event/createEvent")
        }
      })
    })
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../assets/images/rainCheck-logo.png")} />
      </View>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={!passwordVisisble}
        //Ensures the password is hidden when typing
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
        {passwordVisisble ? <EyeOutline color={"#00000"} /> : <EyeOffOutline color={"#00000"} />}
      </TouchableOpacity>
      {isValidLogin ? null : <Text> Invalid Username or password! </Text>}
      <Button color="purple" title="Submit" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  heading: {
    color: "#824C71",
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    height: hp("7%"),
    width: "100%",
    marginVertical: hp("1%"),
    borderWidth: 1,
    padding: wp("2.5%"),
    borderRadius: 5,
    borderColor: "#ddd",
  },
  eyeIcon: {},
})
