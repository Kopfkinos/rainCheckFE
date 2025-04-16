import { Text, View, TextInput, Button } from "react-native"
import { useState, useContext } from "react"
import { Redirect, Link } from "expo-router"
import { useRouter } from "expo-router"
import { postEvent } from "@/utils/api-funcs"
import { UserContext } from "../../contexts/UserContext"
// POST /users/:username/events

export default function CreateEvent() {
  // useState here
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("") //maybe? if using a calendar, could be diff? or MVP they use a set format?
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const { user, setUser } = useContext(UserContext)
  //handleSubmit here
  const router = useRouter()

  // Redirect if no user is logged in
  if (!user) {
    return <Redirect href="/" />
  }

  const handleSubmit = () => {
    if (!title || !date || !location || !description) {
      alert("Please fill in all fields before submitting Girly Pop!")
      return
    }
    //group variables together
    const eventData = {
      title,
      description,
      date,
      location,
      created_by: user,
      invited: null,
      host_flaked: false,
      invitee_flaked: false,
    }

    console.log(eventData)

    postEvent(eventData)
      .then((newEventData) => {
        router.push({
          pathname: `/events/${newEventData.event_id}` as const,
          // 'as const' is saying 'yes TS, this is a real path'
        } as any)
      })
      .catch(() => {
        alert("Something went wrong creating the event Girly Pop!")
      })
  }

  return (
    <>
      <View>
        <TextInput
          placeholder="Enter Event Title"
          //add Tailwind CSS coding here
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Enter Event Date"
          //add Tailwind CSS coding here
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          placeholder="Enter Event Location"
          //add Tailwind CSS coding here
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          placeholder="Enter Event Description"
          //add Tailwind CSS coding here
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
          // Input to eventPage needed here - forogt how to do it atm
        />
      </View>
    </>
  )
}
