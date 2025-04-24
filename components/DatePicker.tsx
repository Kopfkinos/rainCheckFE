import { Platform, View, Text, TouchableOpacity } from "react-native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.19)", }}>

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
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp("1%"),
    justifyContent: "space-between",
    paddingHorizontal: wp("2%"),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    height: hp("7%"),
    backgroundColor: "#fff",
  },
};
