import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Link } from "expo-router"

export default function EventsList({ user, events, refetch, loading }) {
  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.event_id.toString()}
      renderItem={({ item }) => {
        const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        const formattedTime = item.time?.slice(0, 5)

        return (
          <Link href={`/events/${item.event_id}`} asChild>
            <TouchableOpacity style={styles.eventItem}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventText}>{`📆 ${formattedDate}`}</Text>
              <Text style={styles.eventText}>{`🕛 ${formattedTime}`}</Text>
              <Text style={styles.eventText}>{`📍 ${item.location}`}</Text>
              <Text style={styles.eventDescription}>{`🗒️ ${item.description}`}</Text>

              {user === item.created_by ? (
                <Text style={styles.eventText}>{`🙋‍♀️ You invited ${item.invited}`}</Text>
              ) : (
                <Text style={styles.eventText}>{`💌 ${item.created_by} invited you`}</Text>
              )}
            </TouchableOpacity>
          </Link>
        )
      }}
      ListEmptyComponent={<Text style={styles.noEvent}>No events found...</Text>}
      onRefresh={refetch}
      refreshing={loading}
    />
  )
}

const styles = StyleSheet.create({
  eventItem: {
    padding: 30,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.89)",
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
    fontSize: 18,
    color: "black",
    marginBottom: 5,
    fontFamily: "SenExtraBold",
  },
  eventText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    fontFamily: "SenExtraBold",
  },
  eventDescription: {
    marginTop: 3,
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
  },
  noEvent: {
    paddingTop: 20,
    textAlign: "center",
    color: "red",
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
})
