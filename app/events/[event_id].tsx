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
import { SafeAreaView } from "react-native-safe-area-context"
import LoadingUmbrella from "../../components/LoadingUmbrella"
import NotFeelingItButton from "../../components/NotFeelingItButton"
import BothFlaked from "../../components/BothFlaked"

// GET /events/:event_id

interface Event {
  event_id: number
  title: string
  description: string
  date: object
  location: string
  created_by: string
  invited: string
  host_flaked: boolean
  invitee_flaked: boolean
}

export default function EventPage() {
  const { event_id } = useLocalSearchParams()
  //An Expo Router Hook, allowing access to the query params
  const { user } = useContext(UserContext)
  const [role, setRole] = useState("")
  const [invitee, setInvitee] = useState("")
  const [inviteeAdded, setInviteeAdded] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [inviteButtonMsg, setInviteButtonMsg] = useState("")
  const [showInviteButtonMsg, setShowInviteButtonMsg] = useState(false)

  const [confirmedFlake, setConfirmedFlake] = useState(false)
  const [otherHasFlaked, setOtherHasFlaked] = useState(false)
  const [bothFlaked, setBothFlaked] = useState(false)

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
    host_flaked: false,
    invitee_flaked: false,
  })

  useEffect(() => {
    if (bothFlaked) {
      return
    }
    setIsLoading(true)
    getEventByEventID(event_id).then((fetchedEvent) => {
      setEvent(fetchedEvent)
      const { invited, created_by, host_flaked, invitee_flaked } = fetchedEvent
      if (user === created_by) {
        // user is host
        setRole("host")
        if (host_flaked) {
          setConfirmedFlake(true)
        }
        if (invitee_flaked) {
          setOtherHasFlaked(true)
        }
      } else {
        // user is invitee
        setRole("invitee")
        if (invitee_flaked) {
          setConfirmedFlake(true)
        }
        if (host_flaked) {
          setOtherHasFlaked(true)
        }
      }
      if (host_flaked && invitee_flaked) {
        setBothFlaked(true)
      }
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    })
  }, [bothFlaked])
  const formattedDate = new Date(event.date).toLocaleString("en-GB")

  const handleSubmit = () => {
    if (invitee === user) {
      setInviteButtonMsg("We're all for self-love, but come on now...")
      setShowInviteButtonMsg(true)
      return
    }
    setIsLoading(true)
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
      setIsLoading(false)
    })
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <LoadingUmbrella style={styles.lottie} />

        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    )
  } else if (bothFlaked) {
    return <BothFlaked />
  } else if (!isLoading && !bothFlaked) {
    return (
      <View style={styles.logoWrapper}>
        <Image source={require("../../assets/images/rainCheck-logo.png")} style={styles.logo} />
        <View />
        <View>
          {user === event.created_by ? (
            <Text style={styles.heading}>Hi {user}, you're hosting...</Text>
          ) : (
            <Text style={styles.heading}>Hi {user}, you've been invited to...</Text>
          )}
        </View>
        <View>
          <Text style={styles.italic}>Event Title:</Text>{" "}
          <Text style={styles.bold}>{event.title}</Text>
          <Text style={styles.italic}>Date: </Text> <Text style={styles.bold}>{formattedDate}</Text>
          <Text style={styles.italic}>Location: </Text>{" "}
          <Text style={styles.bold}>{event.location}</Text>
          <Text style={styles.italic}>Description: </Text>{" "}
          <Text style={styles.bold}>{event.description}</Text>
          {event.invited ? (
            <View>
              <Text style={styles.italic}>Invited: </Text>
              <Text style={styles.bold}>{event.invited}</Text>{" "}
            </View>
          ) : null}
          <Text style={styles.italic}>Host: </Text>
          <Text style={styles.bold}>{event.created_by}</Text>
        </View>
        {event.invited ? (
          <View style={[styles.flakeButton, confirmedFlake && { backgroundColor: "#bdabfd" }]}>
            <NotFeelingItButton
              event_id={event_id}
              role={role}
              confirmedFlake={confirmedFlake}
              setConfirmedFlake={setConfirmedFlake}
              invitee={event.invited}
              otherHasFlaked={otherHasFlaked}
              setBothFlaked={setBothFlaked}
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
      </View>
    )
  }
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
    width: wp("60%"),
  },
  heading: {
    color: "#cc56ff",
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
  lottie: {
    width: wp("20%"),
    height: hp("20%"),
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
