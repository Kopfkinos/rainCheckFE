import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "@/utils/api-funcs";
import { addInvitee } from "@/utils/api-funcs";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function EventDetails({ event_id, setEvent }) {
	const { user } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);

	const [invitee, setInvitee] = useState("");
	const [inviteButtonMsg, setInviteButtonMsg] = useState("");
	const [showInviteButtonMsg, setShowInviteButtonMsg] = useState(false);

	const handleSubmit = () => {
		if (invitee === user) {
			setInviteButtonMsg("We're all for self-love, but come on now...");
			setShowInviteButtonMsg(true);
			return;
		}
		setIsLoading(true);
		getUsers().then((users) => {
			// use a .find instead?
			const userFound = users.some((user) => {
				return user.username === invitee;
			});
			if (userFound) {
				addInvitee(event_id, invitee)
					.then((updatedEvent) => {
						setEvent(updatedEvent);
						setInviteButtonMsg(`${invitee} has been invited to the event!`);
						setShowInviteButtonMsg(true);
					})
					.catch((err) => {
						setInviteButtonMsg("There was an error inviting your friend.");
						setShowInviteButtonMsg(true);
					});
			} else {
				setInviteButtonMsg(`That user doesn't exist...`);
				setShowInviteButtonMsg(true);
			}
			setIsLoading(false);
		});
	};

	return (
		<View style={styles.inviteSection}>
			<Text style={styles.question}> So, who're you inviting...?</Text>
			<TextInput
				style={styles.input}
				placeholder="Your friend's name"
				value={invitee}
				onChangeText={setInvitee}
				autoCapitalize="none"
			/>
			<TouchableOpacity
				style={styles.submitButton}
				onPress={handleSubmit}
				disabled={invitee.length === 0}
			>
				<Text style={styles.submitButtonText}>Invite Friend</Text>
			</TouchableOpacity>
			{showInviteButtonMsg ? <Text> {inviteButtonMsg} </Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	inviteSection: {
		margin: "5%",
	},
	question: {
		fontWeight: "bold",
		textAlign: "center",
	},
	italic: { fontStyle: "italic" },
	underline: { textDecorationLine: "underline" },
	input: {
		height: hp("4%"),
		width: wp("70%"),
		marginVertical: hp("1%"),
		borderWidth: 1,
		padding: wp("1%"),
		borderRadius: 5,
		borderColor: "#ddd",
		color: "black",
	},
	submitButton: {
		backgroundColor: "#623dff",
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: "center",
		width: wp("70%"),
	},
	submitButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});
