import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Link } from "expo-router"

export default function EventsList({ events, refetch, loading }) {
  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.event_id.toString()}
      renderItem={({ item }) => (
        <Link href={`/events/${item.event_id}`} asChild>
          <TouchableOpacity style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventText}>{`📆 ${new Date(item.date).toLocaleString("en-GB")}`}</Text>
            <Text style={styles.eventText}>{`📍 ${item.location}`}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
          </TouchableOpacity>
        </Link>
      )}
      ListEmptyComponent={<Text style={styles.noEvent}>No events found...</Text>}
      onRefresh={refetch}
      refreshing={loading}
    />
  )
}

const styles = StyleSheet.create({
  eventItem: {
    padding: 25,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.46)",
    borderRadius: 8,
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
    color: "white",
  },
  eventText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  eventDescription: {
    marginTop: 3,
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  noEvent: {
    paddingTop: 20,
    textAlign: "center",
    color: "red",
  },
})
