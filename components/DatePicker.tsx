import { Text, View, TextInput, Button } from "react-native";
import { useState, useContext } from "react";

import DateTimePicker from "@react-native-community/datetimepicker"; // iOS / Android only
import DatePicker from "react-datepicker"; // Web only
import "react-datepicker/dist/react-datepicker.css"; // Web app calendar style
import "../datepicker-custom.css"; // Custom CSS for datepicker

export default function DatePickerComponent({ setDate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const handleChange = (date) => {
    setSelectedDate(date);
    setDate(date);
  };
  return (
    <View>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd-MM-yyyy"
        placeholderText="Select a date Girly Pop!"
        minDate={today}
        popperPlacement="top-start"
      />
    </View>
  );
}
