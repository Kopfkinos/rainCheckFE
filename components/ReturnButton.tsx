import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ReturnButton() {
	const router = useRouter();

	const handleSubmit = () => {
		router.push("/userProfilePage");
	};

	return (
		<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
			<Text style={styles.submitButtonText}>Return to User Page</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	submitButton: {
		backgroundColor: "#D97742",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignSelf: "center",
		height: 50,
		width: wp("70%"),
		marginTop: 50,
		marginBottom: 15,
	},
	submitButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
    alignSelf: "center",
	},
});
