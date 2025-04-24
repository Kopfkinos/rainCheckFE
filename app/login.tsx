import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { StatusBar } from "expo-status-bar"
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native"
import { useState, useContext } from "react"
import { getUsers } from "@/utils/api-funcs"
import { UserContext } from "@/contexts/UserContext"
import { useRouter, withLayoutContext } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { useFonts } from "expo-font"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { BodyOutline } from "react-ionicons"

type Inputs = {
  username: string
  password: string
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [isLoading, setIsLoading] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [incorrectInputMsg, setIncorrectInputMsg] = useState(null)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true)
    try {
      const users = await getUsers()

      const matchedUser = users.find(
        (user: any) => user.username === data.username && user.password === data.password
      )

      if (matchedUser) {
        setUser(data.username)
        router.push("/userProfilePage")
      } else {
        setIncorrectInputMsg("Incorrect username or password")
      }
    } catch (err) {
      Alert.alert("Error. Could not fetch users. Please try again later")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ImageBackground
      source={require("../assets/images/homepage-bg.jpg")}
      style={styles.backgroundImage}
    >
      <StatusBar hidden />
      <View style={styles.overlay}>
        <Image source={require("../assets/images/rainCheck-logo.png")} style={styles.logo} />
        <Text style={styles.heading}>LOGIN</Text>

        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="username"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholderTextColor="#636363"
              />
            )}
          />

          {errors.username && <Text style={styles.errorMessage}>Username is required</Text>}

          <View style={{ position: "relative" }}>
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor="#636363"
                />
              )}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              <MaterialCommunityIcons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorMessage}>Password is required</Text>}
          {incorrectInputMsg && <Text style={styles.errorMessage}>{incorrectInputMsg}</Text>}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    marginTop: 200,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },
  errorMessage: {
    color: "red",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 12,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 0.56)",
  },
  eyeIcon: {
    position: "absolute",
    right: 5,
    top: 5,
    color: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7756FF",
    fontFamily: "SenExtraBold",
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputWrapper: {
    flex: 1,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#402B8B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    width: wp("70%"),
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    boxShadow: "10px 4px 50px rgba(0, 0, 0, 0.1)",
  },
})
