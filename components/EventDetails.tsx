import { View, Text, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function EventDetails({ event }) {
  const {
    title,
    date,
    location,
    description,
    created_by,
    invited,
    time,
    event_img_url,
  } = event;

  console.log("url", event_img_url);

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formatedTime = time.slice(0, 5);

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.eventImage}
          source={event_img_url ? { uri: event_img_url } : require("../assets/images/app-icon.png")}
        />
      </View>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.italic}>📆 Date: </Text>{" "}
      <Text style={styles.bold}>{formattedDate}</Text>
      <Text style={styles.italic}>🕐Time:</Text>{" "}
      <Text style={styles.bold}>{formatedTime}</Text>
      <Text style={styles.italic}>📍Location: </Text>{" "}
      <Text style={styles.bold}>{location}</Text>
      <Text style={styles.italic}>📝Description: </Text>{" "}
      <Text style={styles.bold}>{description}</Text>
      <Text style={styles.italic}>💁‍♀️Host: </Text>
      <Text style={styles.bold}>{created_by}</Text>
      {event.invited ? (
        <View>
          <Text style={styles.italic}>🙌Invited: </Text>
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
  imageContainer: {},
  eventImage: {
    alignSelf: "center",
    width: wp("75%"),
    height: 150,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#6675D7",
    marginBottom: 10,
    resizeMode: "contain", // Add this
  },
});
