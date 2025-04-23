import { Platform, View, Text, TouchableOpacity } from "react-native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

interface DatePickerProps {
  onChange: (date: Date) => void;
  currentDate: Date;
}

export default function DateTimePicker(props: DatePickerProps) {
  if (Platform.OS === "android") {
    return <AndroidDateTimePicker {...props} />;
  }

  if (Platform.OS === "ios") {
    return <IOSDateTimePicker {...props} />;
  }

  return null;
}

export const AndroidDateTimePicker = ({
  onChange,
  currentDate,
}: DatePickerProps) => {
  const showDateTimePicker = () => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (event, selectedDate) => {
        if (event.type === "set" && selectedDate) {
          onChange(selectedDate);
        }
      },
      mode: "date",
      minimumDate: new Date(), // optional, only if you want to block past dates
    });
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text>{currentDate.toLocaleDateString()}</Text>
      <TouchableOpacity onPress={showDateTimePicker} style={styles.button}>
        <Text style={styles.buttonText}>Open Calendar</Text>
      </TouchableOpacity>
    </View>
  );
};

export const IOSDateTimePicker = ({
  onChange,
  currentDate,
}: DatePickerProps) => {
  return (
    <RNDateTimePicker
      style={{ alignSelf: "flex-start" }}
      accentColor="black"
      minimumDate={new Date()}
      value={currentDate}
      mode="date"
      display="default"
      onChange={(_, date?: Date) => onChange(date || new Date())}
    />
  );
};

const styles = {
  button: {
    backgroundColor: "#5B3EC6",
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
