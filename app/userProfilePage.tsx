import React, { useState, useContext, useCallback, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SectionList,
  ImageBackground,
} from "react-native"

import { Redirect, Link } from "expo-router"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { SafeAreaView } from "react-native-safe-area-context"

import { getEvents } from "@/utils/api-funcs"

import { UserContext } from "../contexts/UserContext"

import useFetch from "../utils/useFetch"

import LoadingUmbrella from "../components/LoadingUmbrella"
import EventsList from "@/components/EventsList"

import { useFonts } from "expo-font"

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
export default function UserProfilePage() {
  const { user } = useContext(UserContext)

  // Redirect if no user is logged in
  if (!user) {
    return <Redirect href="/" />
  }

  // Memoize the fetch function
  const fetchEvents = useCallback(() => getEvents(user), [user])

  const {
    data: events,
    loading: fetchLoading,
    error,
    refetch,
  } = useFetch<Event[]>(fetchEvents, true)

  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1500) // should show umbrella for 3 seconds no matter what

    return () => clearTimeout(timer)
  }, [])

  const [fontsLoaded] = useFonts({
    Bestime: require("../assets/fonts/Bestime.ttf"),
    SenMedium: require("../assets/fonts/SenMedium.ttf"),
    SenExtraBold: require("../assets/fonts/SenExtraBold.ttf"),
  })

  const loading = fetchLoading || showLoading

  if (loading) {
    return (
      <View style={styles.centered}>
        <StatusBar hidden />
        <LoadingUmbrella style={styles.lottie} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <StatusBar hidden />
        <Text style={styles.text}>{error.message}</Text>
      </View>
    )
  }

  return (
    <ImageBackground
      source={require("../assets/images/userProfilePage-bg.jpg")}
      style={styles.backgroundImage}
    >
      <StatusBar hidden />
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require("../assets/images/rainCheck-logo.png")} />

        <Text style={styles.textTitle}>Hi {user}! 👋</Text>
        <Text style={styles.text}>Here are your events...</Text>
        <EventsList
          style={styles.eventList}
          user={user}
          events={events}
          loading={loading}
          refetch={refetch}
        />

        <Link href="/events/createEvent" asChild>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Event</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 0,
    margin: 0,
  },
  loadingCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  lottie: {
    width: wp("50%"),
    height: hp("50%"),
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  logo: {
    height: hp("40%"),
    width: wp("85%"),
    resizeMode: "contain",
    marginBottom: -95,
    marginTop: -100,
  },
  textTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
    fontFamily: "Bestime",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 3, height: 1 },
    textShadowRadius: 2,
  },
  text: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
    fontFamily: "SenExtraBold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 3, height: 1 },
    textShadowRadius: 2,
  },
  noEvent: {
    paddingTop: 20,
    textAlign: "center",
    color: "red",
  },
  createButton: {
    backgroundColor: "#402B8B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    height: 50,
    width: wp("70%"),
    marginTop: 10,
    marginBottom: 15,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
  input: {
    /* what is this being used for? */
    height: hp("7%"),
    width: "100%",
    marginVertical: hp("1%"),
    borderWidth: 1,
    padding: wp("2.5%"),
    borderRadius: 5,
    borderColor: "#ddd",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eventItem: {
    padding: 25,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    width: 400,
    height: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  eventsList: {
    marginBottom: 10,
  },
})
