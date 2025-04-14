import { Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"

// GET /events/:event_id
export default function EventPage() {
  const { title, date, location, description } = useLocalSearchParams()
  //An Expo Router Hook, allowing access to the query params

  return (
    <View>
      <Text>{title}</Text>
      <Text>Date: {date}</Text>
      <Text>Location: {location}</Text>
      <Text>Description: {description}</Text>
    </View>
  )
}
