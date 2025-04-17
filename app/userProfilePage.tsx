import React, { useState, useContext, useCallback, useEffect } from "react"
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native"

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

  const loading = fetchLoading || showLoading

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <LoadingUmbrella style={styles.lottie} />

        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.text}>{error.message}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/images/rainCheck-logo.png")} />
      <Text style={styles.text}>Hi {user}!👋</Text>

      <View style={styles.eventsList}>
        <Text style={styles.text}>Events You're Hosting</Text>
        <FlatList
          data={events.events_created}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => (
            <Link href={`/events/${item.event_id}`} asChild>
              <TouchableOpacity style={styles.eventItem}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text>{new Date(item.date).toLocaleString()}</Text>
                <Text>{item.location}</Text>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={<Text style={styles.noEvent}>No events found...</Text>}
          onRefresh={refetch}
          refreshing={loading}
        />
      </View>
      <View style={styles.eventList}>
        <Text style={styles.text}>Events You're Invited to</Text>
        <FlatList
          data={events.events_invited}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => (
            <Link href={`/events/${item.event_id}`} asChild>
              <TouchableOpacity style={styles.eventItem}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text>{new Date(item.date).toLocaleString()}</Text>
                <Text>{item.location}</Text>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={<Text style={styles.noEvent}>No events found...</Text>}
          onRefresh={refetch}
          refreshing={loading}
        />
      </View>

      {/* this is just a placeholder for now!! */}
      <Link href="/events/viewPastEvents">
        <TouchableOpacity style={styles.viewPastEventsButton}>
          <Text style={styles.viewPastEventsButtonText}>View Past Events</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/events/createEvent" asChild>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loadingCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
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
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FAF9F6",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  noEvent: {
    paddingTop: 20,
    textAlign: "center",
    color: "red",
  },
  viewPastEventsButton: {
    backgroundColor: "#475569",
    width: wp("50"),

    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: 10,
  },
  viewPastEventsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
  createButton: {
    backgroundColor: "#D97742",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    height: 50,
    width: wp("70%"),
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
  input: {
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
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  eventsList: {
    marginBottom: 50,
  },
})
