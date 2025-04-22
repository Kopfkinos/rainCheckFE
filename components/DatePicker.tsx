// import { Text, View, TextInput, Button } from "react-native";
// import { useState, useContext } from "react";

// import DateTimePicker from "@react-native-community/datetimepicker"; // iOS / Android only
// import DatePicker from "react-datepicker"; // Web only
// import "react-datepicker/dist/react-datepicker.css"; // Web app calendar style
// import "../datepicker-custom.css"; // Custom CSS for datepicker

// export default function DatePickerComponent({ setDate }) {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const today = new Date();

//   const handleChange = (date) => {
//     setSelectedDate(date);
//     setDate(date);
//   };
//   return (
//     <View>
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleChange}
//         dateFormat="dd-MM-yyyy"
//         placeholderText="Select a date Girly Pop!"
//         minDate={today}
//         popperPlacement="top-start"
//       />
//     </View>
//   );
// }

import { Platform, View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native"; // Default React Native button
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker"; // Native only

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
    backgroundColor: "#623dff",
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
