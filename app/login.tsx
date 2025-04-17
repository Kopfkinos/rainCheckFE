import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useContext } from "react";
import { getUsers } from "@/utils/api-funcs";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { EyeOffOutline, EyeOutline } from "react-ionicons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const users = await getUsers();

      const matchedUser = users.find(
        (user: any) =>
          user.username === data.username && user.password === data.password
      );

      if (matchedUser) {
        setUser(data.username);
        router.push("/userProfilePage");
      } else {
        alert("Login failed. Incorrect username or password.");
        // Need to change this to Alert.alert later to work on iPhone and Android
      }
    } catch (err) {
      alert("Error. Could not fetch users. Please try again later");
      // Need to change this to Alert.alert later to work on iPhone and Android
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/rainCheck-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.heading}>Login</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <View style={styles.inputWrapper}>
          <input
            placeholder="Username"
            style={styles.usernameBox}
            {...register("username", { required: true })}
          />

          {errors.username && (
            <Text style={styles.errorMessage}>Username is required</Text>
          )}

          <input
            placeholder="Password"
            type={passwordVisible ? "text" : "password"}
            style={styles.passwordBox}
            {...register("password", { required: true })}
          />

          {errors.password && (
            <Text style={styles.errorMessage}>Password is required</Text>
          )}
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            {passwordVisible ? (
              <EyeOutline color={"#00000"} />
            ) : (
              <EyeOffOutline color={"#00000"} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7756FF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#623dff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginTop: 20,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    boxShadow: "10px 4px 50px rgba(0, 0, 0, 0.1)",
  },
  usernameBox: {
    height: 50,
    width: "95%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    marginBottom: 10,
    alignSelf: "center",
    elevation: 4,
    backgroundColor: "#ECECEC",
  },
  passwordBox: {
    height: hp("7%"),
    width: "95%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    alignSelf: "center",
    elevation: 4,
    backgroundColor: "#ECECEC",
  },
});
