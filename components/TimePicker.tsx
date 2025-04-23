import { Platform, View, Text, TouchableOpacity } from "react-native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

interface TimePickerProps {
  currentTime: Date;
  onChange: (time: Date) => void;
}

export default function TimePickerComponent({
  currentTime,
  onChange,
}: TimePickerProps) {
  if (Platform.OS === "android") {
    return <AndroidTimePicker currentTime={currentTime} onChange={onChange} />;
  }

  if (Platform.OS === "ios") {
    return <IOSTimePicker currentTime={currentTime} onChange={onChange} />;
  }

  return null;
}

const AndroidTimePicker = ({ currentTime, onChange }: TimePickerProps) => {
  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: currentTime,
      onChange: (event, selectedTime) => {
        if (event.type === "set" && selectedTime) {
          onChange(selectedTime);
        }
      },
      mode: "time",
      is24Hour: false,
    });
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
      <Text>{formatTime(currentTime)}</Text>
      <TouchableOpacity onPress={showTimePicker} style={styles.button}>
        <Text style={styles.buttonText}>Set Time</Text>
      </TouchableOpacity>
    </View>
  );
};

const IOSTimePicker = ({ currentTime, onChange }: TimePickerProps) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.07)",
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
      }}
    >
      <RNDateTimePicker
        value={currentTime}
        mode="time"
        display="spinner"
        textColor="white"
        onChange={(_, selectedTime) => {
          if (selectedTime) {
            onChange(selectedTime);
          }
        }}
        style={{ alignSelf: "flex-start", marginTop: 10 }}
      />
    </View>
  );
};

// Helper to format time nicely
const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const styles = {
  button: {
    backgroundColor: "#402B8B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
};
