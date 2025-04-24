import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { UserProvider } from "../contexts/UserContext"
import LogoHeader from "@/components/LogoHeader"

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar hidden />
      <Slot />
    </UserProvider>
  )
}
