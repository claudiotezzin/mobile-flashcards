import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { primary, white, primary_dark, green } from "../util/colors";
import { saveCard } from "../actions";
import { saveCardToDeck } from "../api";

class CreateCard extends Component {
  state = {
    card: {
      question: "",
      answer: ""
    }
  };

  _createCard = () => {
    const { dispatch, navigation } = this.props;
    const deckTitle = navigation.state.params.deckTitle;
    const { card } = this.state;

    if (card.question !== "" && card.answer !== "") {
      dispatch(saveCard(deckTitle, card));

      saveCardToDeck(deckTitle, card);

      navigation.goBack();
    } else {
      Alert.alert(
        "Ops!!!",
        "You need to type the card question and answer!",
        [{ text: "OK" }],
        { cancelable: true }
      );
    }
  };

  render() {
    return (
      <View style={styles.modalContent}>
        <View
          style={{
            alignItems: "center"
          }}
        >
          <TextInput
            placeholder="What's the question?"
            placeholderTextColor={primary}
            underlineColorAndroid={primary}
            selectionColor={primary}
            multiline={false}
            onChangeText={text =>
              this.setState(prevState => {
                prevState.card.question = text;
                return prevState;
              })
            }
            value={this.state.card.question}
            returnKeyType={"next"}
            autoFocus={true}
            style={styles.modalTextInput}
          />

          <TextInput
            placeholder="Answer"
            placeholderTextColor={primary}
            underlineColorAndroid={primary}
            selectionColor={primary}
            multiline={false}
            onChangeText={text =>
              this.setState(prevState => {
                prevState.card.answer = text;
                return prevState;
              })
            }
            value={this.state.card.answer}
            returnKeyType={"next"}
            onSubmitEditing={this._createCard}
            style={styles.modalTextInput}
          />
        </View>
        <TouchableOpacity onPress={this._createCard}>
          <Text style={styles.submitButton}>CREATE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: white,
    padding: 22,
    paddingBottom: 12,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalTextInput: {
    padding: 10,
    height: 50,
    color: primary_dark,
    fontSize: 18,
    width: 300
  },
  modalTitle: {
    fontSize: 22,
    color: primary,
    padding: 10,
    fontWeight: "bold"
  },
  submitButton: {
    fontSize: 24,
    color: green,
    padding: 30,
    fontWeight: "bold"
  }
});

export default connect()(CreateCard);
