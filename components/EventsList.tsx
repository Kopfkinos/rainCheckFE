import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Link } from "expo-router"

export default function EventList({ events, refetch, loading }) {
  return (
    <FlatList
      data={events}
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
  )
}

const styles = StyleSheet.create({
  eventItem: {
    padding: 25,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
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
  },
  noEvent: {
    paddingTop: 20,
    textAlign: "center",
    color: "red",
  },
  eventsList: {
    marginBottom: 50,
  },
})
