import { Slot } from "expo-router"
import { UserProvider } from "../contexts/UserContext"
import LogoHeader from "@/components/LogoHeader"

export default function RootLayout() {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  )
}
