import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useContext } from "react";
import { Redirect, Link } from "expo-router";
import { useRouter } from "expo-router";
import { postEvent } from "@/utils/api-funcs";
import { UserContext } from "../../contexts/UserContext";

import LoadingUmbrella from "../../components/LoadingUmbrella";
// POST /users/:username/events
import DatePickerComponent from "../../components/DatePicker";
import TimePickerComponent from "../../components/TimePicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import "react-datepicker/dist/react-datepicker.css"; // Web app calendar style
import { SafeAreaView } from "react-native-safe-area-context";
import { isAbsolute } from "path";
import { time } from "console";

export default function CreateEvent() {
  // useState here
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  // const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { user, setUser } = useContext(UserContext);
  //handleSubmit here
  const router = useRouter();

  // Redirect if no user is logged in
  if (!user) {
    return <Redirect href="/" />;
  }

  const handleSubmit = () => {
    if (!title || !date || !location || !description) {
      alert("Please fill in all fields before submitting Girly Pop!");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = "23:00:00";
    //hardcoded in the time here

    //group variables together
    const eventData = {
      title,
      description,
      date: formattedDate,
      time: formattedTime,
      //variable declared here
      location,
      created_by: user,
      invited: null,
      host_flaked: false,
      invitee_flaked: false,
    };

    setIsLoading(true);

    postEvent(eventData)
      .then((newEventData) => {
        router.push({
          pathname: `/events/${newEventData.event_id}` as const,
          // 'as const' is saying 'yes TS, this is a real path'
        } as any);
      })
      .catch(() => {
        alert("Something went wrong creating the event Girly Pop!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingUmbrella />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../assets/images/rainCheck-logo.png")}
          style={styles.logo}
        />
      </View>
      <View>
        <TextInput
          placeholder="Enter Event Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <View style={{ overflow: "visible", zIndex: 1 }}>
          <DatePickerComponent onChange={setDate} currentDate={date} />
        </View>

        {/* <View style={{ overflow: "visible", zIndex: 1 }}>
          <TimePickerComponent onChange={setTime} currentTime={time} />
        </View> */}

        <TextInput
          placeholder="Enter Event Location"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          placeholder="Enter Event Description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "F7F7F7",
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
  input: {
    height: hp("7%"),
    width: "100%",
    marginVertical: hp("1%"),
    borderWidth: 1,
    padding: wp("2.5%"),
    borderRadius: 5,
    borderColor: "#ddd",
    boxShadow: "10px 4px 50px rgba(0, 0, 0, 0.1)",
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
});
