import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import AntDesign from "@expo/vector-icons/AntDesign"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any = "md-home"

          if (route.name === "userProfilePage") iconName = "list"
          if (route.name === "settings") iconName = "settings"
          if (route.name === "userProfile") iconName = "person-outline"

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tabs.Screen name="userProfilePage" options={{ title: "Events", headerShown: false }} />
      <Tabs.Screen name="userProfile" options={{ title: "Profile", headerShown: false }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", headerShown: false }} />
      <Tabs.Screen
        name="events/createEvent"
        options={{ title: "Create Event", href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="events/[event_id]"
        options={{ title: "Create Event", href: null, headerShown: false }}
      />
    </Tabs>
  )
}
