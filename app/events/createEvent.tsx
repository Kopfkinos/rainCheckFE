import { Text, View, TextInput, Button } from "react-native";
import { useState, useContext } from "react";
import { Redirect, Link } from "expo-router";
import { useRouter } from "expo-router";
import { postEvent } from "@/utils/api-funcs";
import { UserContext } from "../../contexts/UserContext";

import LoadingUmbrella from "../../components/LoadingUmbrella";
// POST /users/:username/events

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DateTimePicker from "@react-native-community/datetimepicker"; // iOS / Android only
import DatePicker from "react-datepicker"; // Web only
import "react-datepicker/dist/react-datepicker.css"; // Web app calendar style

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
    <>
      <View>
        <TextInput
          placeholder="Enter Event Title"
          //add Tailwind CSS coding here
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Enter Event Date"
          //add Tailwind CSS coding here
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          placeholder="Enter Event Location"
          //add Tailwind CSS coding here
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          placeholder="Enter Event Description"
          //add Tailwind CSS coding here
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
    </>
  );
}
