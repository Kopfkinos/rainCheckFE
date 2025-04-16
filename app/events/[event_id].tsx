import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { getEventByEventID } from "../../utils/api-funcs.js"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { getUsers } from "../../utils/api-funcs.js"
import NotFeelingItButton from "../../components/NotFeelingItButton.js"

// GET /events/:event_id

interface Event {
  event_id: number
  title: string
  description: string
  date: object
  location: string
  created_by: string
  invited: string
  host_flaked: number
  invitee_flaked: number
}

export default function EventPage() {
  const [invitee, setInvitee] = useState("")
  const [inviteeAdded, setInviteeAdded] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)

  const [event, setEvent] = useState<Event>({
    event_id: 0,
    title: "",
    description: "",
    date: new Date(),
    // 2025-05-17T19:00:00.000Z
    location: "",
    created_by: "",
    invited: "",
    host_flaked: 0,
    invitee_flaked: 0,
  })

  const { event_id } = useLocalSearchParams()
  //An Expo Router Hook, allowing access to the query params
  useEffect(() => {
    getEventByEventID(event_id).then((newEvent) => {
      setEvent(newEvent)
    })
  }, [])

  const formattedDate = new Date(event.date).toLocaleString("en-GB")

  const handleSubmit = () => {
    setUserNotFound(false)
    setInviteeAdded(false)
    getUsers().then((users) => {
      const userFound = users.some((user) => {
        return user.username === invitee
      })
      if (userFound) {
        // SEND PATCH REQUEST TO UPDATE THE EVENT WITH THE INVITEE
        // THEN UNCOMMENT LINE UNDER "Description" on the event details
        setInviteeAdded(true)
      } else {
        setUserNotFound(true)
      }
    })
  }

  return (
    <View style={styles.logoWrapper}>
      <Image source={require("../../assets/images/rainCheck-logo.png")} style={styles.logo} />
      <View>
        <Text>Event Title: {event.title}</Text>
        <Text>Date: {formattedDate}</Text>
        <Text>Location: {event.location}</Text>
        <Text>Description: {event.description}</Text>
        {/* {inviteeAdded ? <Text>Invitee: {event.invited}</Text> : null} */}
        <Text> Who are you invitin'...?</Text>
        <TextInput
          style={styles.input}
          placeholder="Your friend's name"
          value={invitee}
          onChangeText={setInvitee}
          autoCapitalize="none"
        ></TextInput>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={invitee.length === 0}
        >
          <Text style={styles.submitButtonText}>Invite Friend</Text>
        </TouchableOpacity>
      </View>
      {userNotFound ? <Text> That user doesn't exist! </Text> : null}
      {inviteeAdded ? (
        <Text> User found! (but not invited yet, we ran out of stamps...soz) </Text>
      ) : null}
      <View>
        <NotFeelingItButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    height: hp("4%"),
    width: "100%",
    marginVertical: hp("1%"),
    borderWidth: 1,
    padding: wp("1%"),
    borderRadius: 5,
    borderColor: "#ddd",
  },
  submitButton: {
    backgroundColor: "#D97742",
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
})
