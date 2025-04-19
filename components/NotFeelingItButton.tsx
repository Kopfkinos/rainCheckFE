import { addFlake } from "@/utils/api-funcs"
import React, { useState } from "react"
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from "react-native"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"

export default function NotFeelingItButton({
  confirmedFlake,
  setConfirmedFlake,
  event_id,
  role,
  invited,
  otherHasFlaked,
  setBothFlaked,
}) {
  const [modalVisible, setModalVisible] = useState(false)
  // const [confirmedFlake, setconfirmedFlake] = useState(false)

  // Pass in a piece of state you can update when the button is confirmed to be pressed e.g. flakedConfirmed

  const confirmClick = () => {
    if (otherHasFlaked) {
      setBothFlaked(true)
    }
    setConfirmedFlake(!confirmedFlake)
    addFlake(event_id, role)
    // func to update the event with the {invitee/host flaked}
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.")
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {confirmedFlake ? (
                <View>
                  <Text style={styles.modalText}>{`Your secret is safe with us girly pop!`}</Text>
                  <Image source={require("../assets/images/shhh.gif")} style={styles.shhgif} />
                  <Pressable
                    style={[styles.button, styles.dismiss]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.flakeButtonText}>Phew, thanks! </Text>
                  </Pressable>
                </View>
              ) : (
                <View>
                  <Text style={styles.modalHeader}>You sure, girl? </Text>
                  <Text style={styles.modalText}>
                    (Don't worry, we won’t notify your friend unless they also hit the button!)
                  </Text>
                  <Pressable style={[styles.button, styles.confirm]} onPress={confirmClick}>
                    <Text style={styles.modalButtonsText}>Yes!! Diva needs a lie down!!!</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.dismiss]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.modalButtonsText}>
                      Uhh, wait, I'm not sure! Take me back!
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button]}
          disabled={confirmedFlake}
          onPress={() => setModalVisible(true)}
        >
          {confirmedFlake ? (
            <View>
              {" "}
              <Text style={styles.flakeButtonText}>You're Not Feeling It!</Text>
              <Text style={[styles.flakeButtonText, { fontSize: 12, color: "gray" }]}>
                {" "}
                (We'll let you know if you're friend feels the same...)
              </Text>
            </View>
          ) : (
            <Text style={styles.flakeButtonText}>I'm Not Feelin' It</Text>
          )}
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  postClickButton: {
    backgroundColor: "#7756FF",
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
  confirm: {
    backgroundColor: "green",
  },
  dismiss: {
    backgroundColor: "red",
  },
  flakeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  modalButtonsText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalHeader: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  shhgif: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
})
