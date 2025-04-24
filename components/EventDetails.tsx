import { View, Text, StyleSheet, Image } from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export default function EventDetails({ event }) {
  const { title, date, location, description, created_by, invited, time, event_img_url } = event

  console.log("url", event_img_url)

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  const formatedTime = time.slice(0, 5)

  return (
    <View>
      <View>
        <Image
          style={styles.eventImage}
          source={
            event_img_url
              ? { uri: event_img_url }
              : require("../assets/images/default-event-image.png")
          }
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{title}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.locationTextRow}>
          <Text>📍 Location: </Text>
          <Text style={styles.bold}>{location}</Text>
        </View>
        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            <View style={styles.textRow}>
              <Text>📆 Date: </Text>
              <Text style={styles.bold}>{formattedDate}</Text>
            </View>
            <View style={styles.textRow}>
              <Text>🕐 Time: </Text>
              <Text style={styles.bold}>{formatedTime}</Text>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.textRow}>
              <Text>💁‍♀️ Host: </Text>
              <Text style={styles.bold}>{created_by}</Text>
            </View>
            {event.invited ? (
              <View style={styles.textRow}>
                <Text>🙌 Invited: </Text>
                <Text style={styles.bold}>{invited}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>📝 Description: </Text>
          <Text style={styles.bold}>{description}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    margin: 5,
    backgroundColor: "rgba(255, 255, 255, 0.89)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  heading: {
    color: "#5B3EC6",
    fontSize: 40,
    alignSelf: "center",
    textShadowColor: "gray",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
  eventImage: {
    alignSelf: "center",
    width: wp("85%"),
    height: hp("25%"),
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    marginTop: -50,
    marginBottom: 10,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
  },
  column: {
    flex: 1,
  },
  textRow: {
    marginBottom: 4,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  locationTextRow: {
    marginBottom: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
  description: {},
  container: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.89)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
})
