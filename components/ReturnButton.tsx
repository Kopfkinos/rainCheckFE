import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ReturnButton() {
	const router = useRouter();

	const handlePress = () => {
		router.push("/userProfilePage");
	};

	return (
		<TouchableOpacity style={styles.returnButton} onPress={handlePress}>
			<Text style={styles.returnButtonText}>🎉  Return to Your Events Page  🎉</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	returnButton: {
		backgroundColor: "#6675d7",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignSelf: "center",
		height: 50,
		width: wp("70%"),
		marginTop: 50,
		marginBottom: 15,
	},
	returnButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 13.5,
		textAlign: "center",
    margin:3,
	},
});
