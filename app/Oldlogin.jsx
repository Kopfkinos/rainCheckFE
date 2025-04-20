import { useState, useContext } from "react"
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useRouter } from "expo-router"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import { SafeAreaView } from "react-native-safe-area-context"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { UserContext } from "../contexts/UserContext"
import LoadingUmbrella from "@/components/LoadingUmbrella"

import { getUsers } from "@/utils/api-funcs"

export default function OldLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isValidLogin, setIsValidLogin] = useState(true)

  const { user, setUser } = useContext(UserContext)

  const router = useRouter()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    getUsers().then((users) => {
      users.forEach((user) => {
        if (user.username === username && user.password === password) {
          setIsValidLogin(true)
          setUser(username)
          router.push("/userProfilePage")
        }
      })
      setIsLoading(false)
    })
  }

  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <LoadingUmbrella />
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.logoWrapper}>
          <Image source={require("../assets/images/rainCheck-logo.png")} style={styles.logo} />
        </View>
        <Text style={styles.heading}>Login</Text>
        <View style={styles.inputArea}>
          <View style={styles.usernameWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
            />
            <MaterialCommunityIcons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="black"
              style={styles.eyeIcon}
              onPress={togglePasswordVisibility}
            />
          </View>
        </View>
        {isValidLogin ? null : (
          <Text style={styles.errorText}> Invalid Username or password! </Text>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },
  heading: {
    color: "#cc56ff",
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
  errorText: {
    color: "#ef4444",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  inputArea: {
    margin: 30,
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
  usernameWrapper: {
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "white",
    width: wp("75%"),
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "white",
    width: wp("87%"),
  },
  passwordInput: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: "#623dff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    boxShadow: "10px 4px 50px rgba(0, 0, 0, 0.1)",
  },
})
