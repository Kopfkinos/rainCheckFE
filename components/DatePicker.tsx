import { Text, View, TextInput, Button } from "react-native";
import { useState, useContext } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DateTimePicker from "@react-native-community/datetimepicker"; // iOS / Android only
import DatePicker from "react-datepicker"; // Web only
import "react-datepicker/dist/react-datepicker.css"; // Web app calendar style

export default function DatePickerComponent({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  const handleChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };
  return (
    <View>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd-MM-yyyy"
        minDate={today}
      />
    </View>
  );
}
