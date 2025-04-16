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
import LoadingUmbrella from "../../components/LoadingUmbrella"
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
  const { event_id } = useLocalSearchParams()
  //An Expo Router Hook, allowing access to the query params
  const { user } = useContext(UserContext)
  const [role, setRole] = useState("host")
  const [invitee, setInvitee] = useState("")
  const [inviteeAdded, setInviteeAdded] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [inviteButtonMsg, setInviteButtonMsg] = useState("")
  const [showInviteButtonMsg, setShowInviteButtonMsg] = useState(false)

  const [confirmedFlake, setConfirmedFlake] = useState(false)

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

  useEffect(() => {
    getEventByEventID(event_id).then((newEvent) => {
      setEvent(newEvent)
      // the "role" is used in the NotFeelingIt to decide whether to update the 'invitee_flaked" or "host_flaked" values
      // role is automatically set to "host", but if the user === invitee, then the role is set to "invitee"
      if (event.invited === user) {
        setRole("invitee")
      }
    })
  }, [])
  const formattedDate = new Date(event.date).toLocaleString("en-GB")

  const handleSubmit = () => {
    if (invitee === user) {
      setInviteButtonMsg("We're all for self-love, but come on now...")
      return
    }
    setUserNotFound(false)
    setInviteeAdded(false)
    setIsLoading(true)
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
      setIsLoading(false)
    })
  }

  if (isLoading) {
    return <LoadingUmbrella />
  }

  return (
    <View style={styles.logoWrapper}>
      <Image source={require("../../assets/images/rainCheck-logo.png")} style={styles.logo} />
      <View />
      <View>
        <Text style={styles.italic}>Event Title:</Text>{" "}
        <Text style={styles.bold}>{event.title}</Text>
        <Text style={styles.italic}>Date: </Text> <Text style={styles.bold}>{formattedDate}</Text>
        <Text style={styles.italic}>Location: </Text>{" "}
        <Text style={styles.bold}>{event.location}</Text>
        <Text style={styles.italic}>Description: </Text>{" "}
        <Text style={styles.bold}>{event.description}</Text>
        {inviteeAdded ? (
          <View>
            <Text style={styles.italic}>Invited: </Text>
            <Text style={styles.bold}>{event.invited}</Text>{" "}
          </View>
        ) : null}
      </View>
      {event.invited ? (
        <View style={[styles.flakeButton, confirmedFlake && { backgroundColor: "#bdabfd" }]}>
          <NotFeelingItButton
            event_id={event_id}
            role={role}
            confirmedFlake={confirmedFlake}
            setConfirmedFlake={setConfirmedFlake}
          />
        </View>
      ) : (
        <View style={styles.inviteSection}>
          <Text style={styles.bold}> So, who're you inviting...?</Text>
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
          {showInviteButtonMsg ? <Text> {inviteButtonMsg} </Text> : null}
        </View>
      )}
      <View>
        {event.host_flaked && event.invitee_flaked ? <Text> You both have flaked!</Text> : null}
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
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
  inviteSection: {
    margin: "5%",
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
    backgroundColor: "#623dff",
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
  flakeButton: {
    margin: "10%",
    backgroundColor: "red",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    height: hp("20%"),
    width: wp("75%"),
  },
})
