import React, { useState, useContext } from "react"
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

// GET /users
export default function UserPage() {
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
        <Text>{error.message}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={require("../assets/images/rainCheck-logo.png")} />
      <Text>Hi {user}</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
            {item.description && <Text>{item.description}</Text>}
          </View>
        )}
        ListEmptyComponent={<Text>No events found.</Text>}
        onRefresh={refetch}
        refreshing={loading}
      />

      <Link href="/event/createEvent">
        <TouchableOpacity>
          <Text>Create Event</Text>
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
    backgroundColor: "white",
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
