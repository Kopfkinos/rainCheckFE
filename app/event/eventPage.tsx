import { Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { getEventByEventID } from "../../utils/api-funcs.js"

// GET /events/:event_id

interface Event {
  event_id: number
  title: string
  description: string
  date: object
  location: string
  created_by: string
  invited: string
  host_flaked: number
  invitee_flaked: number
}

export default function EventPage() {
  const [event, setEvent] = useState<Event>({
    event_id: 0,
    title: "",
    description: "",
    date: new Date(),
    // 2025-05-17T19:00:00.000Z
    location: "",
    created_by: "",
    invited: "",
    host_flaked: 0,
    invitee_flaked: 0,
  })

  const { event_id } = useLocalSearchParams()
  //An Expo Router Hook, allowing access to the query params
  useEffect(() => {
    getEventByEventID(event_id).then((newEvent) => {
      setEvent(newEvent)
    })
  }, [])

  const formattedDate = new Date(event.date).toLocaleString("en-GB")

  return (
    <View>
      <Text>{event.title}</Text>
      <Text>Date: {formattedDate}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Description: {event.description}</Text>
    </View>
  )
}
