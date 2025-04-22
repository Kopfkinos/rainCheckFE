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
import EventDetails from "../../components/EventDetails"
import InviteFriendButton from "../../components/InviteFriendButton"

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

  const [isLoading, setIsLoading] = useState(true)
  const [inviteButtonMsg, setInviteButtonMsg] = useState("")
  const [showInviteButtonMsg, setShowInviteButtonMsg] = useState(false)

  const [userFlaked, setUserFlaked] = useState(false)
  const [otherUserFlaked, setOtherUserFlaked] = useState(false)
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
          setUserFlaked(true)
        }
        if (invitee_flaked) {
          setOtherUserFlaked(true)
        }
      } else {
        // user is invitee
        setRole("invitee")
        if (invitee_flaked) {
          setUserFlaked(true)
        }
        if (host_flaked) {
          setOtherUserFlaked(true)
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
        <EventDetails event={event} />
        {!event.invited ? (
          <InviteFriendButton event_id={event_id} setEvent={setEvent} />
        ) : (
          <View style={styles.flakeButton}>
            <NotFeelingItButton
              event_id={event_id}
              role={role}
              userFlaked={userFlaked}
              setUserFlaked={setUserFlaked}
              otherUserFlaked={otherUserFlaked}
              setBothFlaked={setBothFlaked}
            />
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
    margin: "2.5%",
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: "center",
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
