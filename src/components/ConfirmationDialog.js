import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { white, black, primary, red, green } from "../util/colors";

class ConfirmamtionDialog extends Component {
  render() {
    const { question, isVisible, onToggle, onActionConfirmation } = this.props;

    return (
      <View>
        <Modal
          isVisible={isVisible}
          onBackButtonPress={onToggle}
          onBackdropPress={onToggle}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{question}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={onActionConfirmation}
              >
                <Text style={[styles.buttonText, { color: green }]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onToggle}>
                <Text style={[styles.buttonText, { color: red }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 12,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalTitle: {
    fontSize: 22,
    padding: 10,
    color: black,
    fontWeight: "bold"
  },
  modalMessage: {
    color: primary,
    margin: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: white,
    marginTop: 10,
    alignItems: "center",
    width: "100%"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginRight: 10,
    width: "50%"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

ConfirmamtionDialog.propTypes = {
  question: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onActionConfirmation: PropTypes.func.isRequired
};

export default ConfirmamtionDialog;
