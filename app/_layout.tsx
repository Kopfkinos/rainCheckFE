import { Slot } from "expo-router"
import "./globals.css"
import { UserProvider } from "./contexts/UserContext"

export default function RootLayout() {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  )
}
