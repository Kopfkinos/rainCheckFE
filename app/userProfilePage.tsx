import React, { useState, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
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

export default function UserProfilePage() {
  const { user, setUser } = useContext(UserContext)

  // Redirect if no user is logged in
  if (!user) {
    return <Redirect href="/" />
  }

  const { data: events, loading, error, refetch } = useFetch(() => getEvents(user))

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Loading innit..</Text>
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

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noEvent}>No events found...</Text>}
        onRefresh={refetch}
        refreshing={loading}
      />
      {/* this is just a placeholder for now!! */}
      <Link href="/event/viewPastEvents">
        <TouchableOpacity style={styles.viewPastEventsButton}>
          <Text style={styles.viewPastEventsButtonText}>View Past Events</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/event/createEvent" asChild>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  },
  noEvent: {
    paddingTop: 20,
    textAlign: "center",
    color: "red",
  },
  viewPastEventsButton: {
    backgroundColor: "#475569",
    width: wp("20%"),
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
    width: wp("20%"),
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
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
})
