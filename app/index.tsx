import { View } from "react-native"
import { useContext } from "react"
import { Redirect } from "expo-router"
import { UserContext } from "@/contexts/UserContext"

export default function Index() {
  const { user, setUser } = useContext(UserContext)

  if (user) {
    return <Redirect href="/tabs" />
  }

  return <Redirect href="/login" />
}
