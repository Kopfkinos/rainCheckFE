import {
  Text,
  View,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useState, useContext, forwardRef } from "react";
import { Redirect } from "expo-router";
import { useRouter } from "expo-router";
import { postEvent } from "@/utils/api-funcs";
import { UserContext } from "../../contexts/UserContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DateTimePicker from "@react-native-community/datetimepicker"; // iOS / Android only
import DatePicker from "react-datepicker"; // Web only
import "react-datepicker/dist/react-datepicker.css"; // Web app calendar style

// Create a proper forwardRef wrapper for custom input
const WebDateInput = forwardRef(({ value, onClick }, ref) => (
  <button onClick={onClick} ref={ref} style={styles.dateInput}>
    {value} {/* Display the value directly */}
  </button>
));

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(UserContext);
  const router = useRouter();

  const [dateOfEvent, setDateOfEvent] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const today = new Date();

  const handleSubmit = () => {
    if (!title || !location || !description || !dateOfEvent) {
      alert("Please fill in all fields before submitting Girly Pop!");
      return;
    }

    const eventData = {
      title,
      description,
      date: dateOfEvent.toDateString(),
      location,
      created_by: user,
      invited: null,
      host_flaked: 0,
      invitee_flaked: 0,
    };

    postEvent(eventData)
      .then((newEventData) => {
        router.push({
          pathname: "/event/eventPage" as const,
          params: {
            event_id: newEventData.event_id,
          },
        } as any);
      })
      .catch(() => {
        alert("Something went wrong creating the event Girly Pop!");
      });
  };

  if (!user) {
    return <Redirect href="/" />;
  }

  const day = dateOfEvent.getDate();
  const formattedDate = `${format(dateOfEvent, "EEE")} ${day}${getDaySuffix(
    day
  )} ${format(dateOfEvent, "MMMM yyyy")}`;

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

        {Platform.OS === "web" ? (
          <View>
            <DatePicker
              selected={dateOfEvent}
              onChange={(date) => setDateOfEvent(date)}
              dateFormat="dd-MM-yyyy"
              minDate={today}
              customInput={<WebDateInput value={formattedDate} />}
            />
          </View>
        ) : (
          <>
            <Button
              title={dateOfEvent.toDateString()}
              onPress={() => setShowPicker(true)}
            />
            {showPicker && (
              <DateTimePicker
                value={dateOfEvent}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) setDateOfEvent(selectedDate);
                }}
              />
            )}
          </>
        )}

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

        {!showPicker && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
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
    padding: wp("3.2%"),
    borderRadius: 5,
    borderColor: "#ddd",
    boxShadow: "10px 4px 50px rgba(0, 0, 0, 0.1)",
  },
  submitButton: {
    backgroundColor: "#475569",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  dateInput: {
    backgroundColor: "#D97742",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  dateInputText: {
    color: "white",
    fontSize: 16,
  },
});
