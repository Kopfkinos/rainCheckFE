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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"

export default function NotFeelingItButton({
  userFlaked,
  setUserFlaked,
  event_id,
  role,
  otherUserFlaked,
  setBothFlaked,
}) {
  const [modalVisible, setModalVisible] = useState(false)

  const confirmClick = () => {
    if (otherUserFlaked) {
      setBothFlaked(true)
    }
    setUserFlaked(!userFlaked)
    addFlake(event_id, role)
    // func to update the event with the {invitee/host flaked}
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {userFlaked ? (
                <View style={styles.modalButtonsWrapper}>
                  <Text style={styles.modalText}>{`Your secret is safe with us girly pop!`}</Text>
                  <Image source={require("../assets/images/shhh.gif")} style={styles.shhgif} />
                  <Pressable
                    style={[styles.modalButtons, styles.dismiss]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.modalButtonsText}>Phew, thanks! </Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.modalButtonsWrapper}>
                  <Text style={styles.modalHeader}>You sure, girl? </Text>
                  <Text style={styles.modalText}>
                    (Don't worry, we won’t notify your friend unless they also hit the button!)
                  </Text>
                  <Pressable style={[styles.modalButtons, styles.confirm]} onPress={confirmClick}>
                    <Text style={styles.modalButtonsText}>{`Yes!
This diva needs a lie down!`}</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.modalButtons, styles.dismiss]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.modalButtonsText}>
                      {`Uhhh, wait, I'm not sure! 
Take me back!`}
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.button, userFlaked && { backgroundColor: "#6675D7", borderRadius: 25 }]}
          disabled={userFlaked}
          onPress={() => setModalVisible(true)}
        >
          {userFlaked ? (
            <View>
              <Text style={styles.flakeButtonText}>You're Not Feeling It!</Text>
              <Text style={[styles.flakeButtonTextSub]}>
                (We'll let you know if you're friend feels the same...)
              </Text>
            </View>
          ) : (
            <Text style={styles.flakeButtonText}>{` NOT 
Feelin' It`}</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 5,
    backgroundColor: "red",
    borderRadius: 1000,
    elevation: 5,
    height: hp("29%"),
    width: wp("64%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "black",
  },
  flakeButtonText: {
    fontSize: 35,
    padding: 5,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  flakeButtonTextSub: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  modalButtonsWrapper: {
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    width: wp("70%"),
  },
  confirm: {
    backgroundColor: "green",
  },
  dismiss: {
    backgroundColor: "red",
  },
  modalButtonsText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17,
  },
  modalButtons: {
    borderRadius: 20,
    elevation: 2,
    height: hp("10%"),
    marginBottom: 10,
    width: wp("60%"),
    justifyContent: "center",
    alignItems: "center",
  },
  shhgif: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
})
