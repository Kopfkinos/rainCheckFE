import { Text, View, TextInput, Button, Image, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { Redirect, Link } from "expo-router";
import { useRouter } from "expo-router";
import { postEvent } from "@/utils/api-funcs";
import { UserContext } from "../../contexts/UserContext";

import LoadingUmbrella from "../../components/LoadingUmbrella";
// POST /users/:username/events
import DatePickerComponent from "../../components/DatePicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import "react-datepicker/dist/react-datepicker.css"; // Web app calendar style
import { SafeAreaView } from "react-native-safe-area-context";
import { isAbsolute } from "path";

export default function CreateEvent() {
  // useState here
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); //maybe? if using a calendar, could be diff? or MVP they use a set format?
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
    //group variables together
    const eventData = {
      title,
      description,
      date,
      time: "20:00:00",
      location,
      created_by: user,
      invited: null,
      host_flaked: false,
      invitee_flaked: false,
      time: "20:00:00", // HardCoded Time whilst the server requires a time

    }

    setIsLoading(true)

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

        setIsLoading(false)
      })
  }

  if (isLoading) {
    return <LoadingUmbrella />;
  }

  return (
    <SafeAreaView style={styles.logoWrapper}>
      <View>
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

        <View style={styles.datePicker}>
          <DatePickerComponent setDate={setDate} />
        </View>

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
        <Button
          title="Submit"
          onPress={handleSubmit}
          // Input to eventPage needed here - forogt how to do it atm
        />
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
  datePicker: {
    position: "relative",
  },
});
