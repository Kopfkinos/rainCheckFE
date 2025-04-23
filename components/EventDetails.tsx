import { View, Text, StyleSheet } from "react-native";

export default function EventDetails({ event }) {
  const { title, date, location, description, created_by, invited } = event;

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <View>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.italic}>Date: </Text>{" "}
      <Text style={styles.bold}>{formattedDate}</Text>
      <Text style={styles.bold}>Time: {event.time}</Text>
      {/* //new field added */}
      <Text style={styles.italic}>Location: </Text>{" "}
      <Text style={styles.bold}>{location}</Text>
      <Text style={styles.italic}>Description: </Text>{" "}
      <Text style={styles.bold}>{description}</Text>
      <Text style={styles.italic}>Host: </Text>
      <Text style={styles.bold}>{created_by}</Text>
      {event.invited ? (
        <View>
          <Text style={styles.italic}>Invited: </Text>
          <Text style={styles.bold}>{invited}</Text>{" "}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#5B3EC6",
    fontSize: 30,
    marginBottom: 20,
    alignSelf: "center",
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
});
