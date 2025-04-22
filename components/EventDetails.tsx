import { View, Text, StyleSheet } from "react-native"

export default function EventDetails({ event }) {
  const formattedDate = new Date(event.date).toLocaleString("en-GB")
  return (
    <View>
      <Text style={styles.heading}>{event.title}</Text>
      <Text style={styles.italic}>Date: </Text> <Text style={styles.bold}>{formattedDate}</Text>
      <Text style={styles.italic}>Location: </Text>{" "}
      <Text style={styles.bold}>{event.location}</Text>
      <Text style={styles.italic}>Description: </Text>{" "}
      <Text style={styles.bold}>{event.description}</Text>
      <Text style={styles.italic}>Host: </Text>
      <Text style={styles.bold}>{event.created_by}</Text>
      {event.invited ? (
        <View>
          <Text style={styles.italic}>Invited: </Text>
          <Text style={styles.bold}>{event.invited}</Text>{" "}
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    color: "#cc56ff",
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
})
