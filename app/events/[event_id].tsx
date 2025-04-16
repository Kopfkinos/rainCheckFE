import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useLocalSearchParams, Redirect } from "expo-router"
import { useEffect, useState, useContext } from "react"
import { getEventByEventID } from "../../utils/api-funcs.js"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { getUsers, addInvitee } from "../../utils/api-funcs.js"
import { UserContext } from "../../contexts/UserContext"
import NotFeelingItButton from "../../components/NotFeelingItButton"

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
  const { user } = useContext(UserContext)
  const [invitee, setInvitee] = useState("")
  const [inviteeAdded, setInviteeAdded] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)
  const [inviteButtonMsg, setInviteButtonMsg] = useState("")
  const [showInviteButtonMsg, setShowInviteButtonMsg] = useState(false)

  if (!user) {
    return <Redirect href="/" />
  }

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
  console.log("This is the event state>>>>", event)
  const formattedDate = new Date(event.date).toLocaleString("en-GB")

  const handleSubmit = () => {
    if (invitee === user) {
      setInviteButtonMsg("We're all for self-love, but come on now...")
      return
    }
    setUserNotFound(false)
    setInviteeAdded(false)
    getUsers().then((users) => {
      const userFound = users.some((user) => {
        return user.username === invitee
      })
      if (userFound) {
        addInvitee(event_id, invitee)
          .then((updatedEvent) => {
            console.log("updated event returned from the server >>>", updatedEvent)
            setEvent(updatedEvent)
            setInviteeAdded(true)
            setInviteButtonMsg(`${invitee} has been invited to the event!`)
            setShowInviteButtonMsg(true)
          })
          .catch((err) => {
            setInviteButtonMsg("There was an error inviting your friend.")
            setShowInviteButtonMsg(true)
          })
      } else {
        setInviteButtonMsg(`That user doesn't exist...`)
        setShowInviteButtonMsg(true)
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
        <Text>Invitee: {event.invited}</Text>
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
      {showInviteButtonMsg ? <Text> {inviteButtonMsg} </Text> : null}
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
