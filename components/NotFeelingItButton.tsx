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

export default function NotFeelingItButton() {
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmedFlake, setconfirmedFlake] = useState(false)

  // Pass in a piece of state you can update when the button is confirmed to be pressed e.g. flakedConfirmed

  const confirmClick = () => {
    setconfirmedFlake(!confirmedFlake)
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
                  <Image source={require("../assets/images/shhh.gif")} />
                  <Pressable
                    style={[styles.button, styles.dismiss]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Okay cool thanks </Text>
                  </Pressable>
                </View>
              ) : (
                <View>
                  <Text style={styles.modalText}>
                    {`You sure, girl? 
                Don't worry, we won’t notify your friend unless they also hit the button.`}
                  </Text>
                  <Pressable style={[styles.button, styles.confirm]} onPress={confirmClick}>
                    <Text style={styles.textStyle}>Yes diva needs a lie down!!!</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.dismiss]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>I'm not sure! Take me back</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          disabled={confirmedFlake}
          onPress={() => setModalVisible(true)}
        >
          {confirmedFlake ? (
            <Text style={styles.textStyle}>You're not feeling it!</Text>
          ) : (
            <Text style={styles.textStyle}>Not Feelin' It</Text>
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
  buttonOpen: {
    backgroundColor: "red",
  },
  confirm: {
    backgroundColor: "green",
  },
  dismiss: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
})
