import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";
import { white, primary_dark, green, primary } from "../util/colors";
import { addDeck } from "../actions";
import { saveDeck } from "../api";

class CreateDeck extends Component {
  state = {
    deckName: ""
  };

  _createDeck = () => {
    const { dispatch, navigation } = this.props;
    const { deckName } = this.state;

    if (deckName !== "") {
      dispatch(addDeck(deckName));

      saveDeck(deckName)
        .then(() => {
          console.log("DeckList", "Deck cretaed!");
        })
        .catch(err => {
          console.log(
            "DeckList",
            "Deck creation error: " + JSON.stringify(err)
          );
        });

      navigation.goBack();
    } else {
      Alert.alert("Ops!!!", "You need to type a deck name!", [{ text: "OK" }], {
        cancelable: true
      });
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
            placeholder="What's your deck name?"
            placeholderTextColor={primary}
            underlineColorAndroid={primary}
            selectionColor={primary}
            multiline={false}
            onChangeText={deckName => this.setState({ deckName })}
            value={this.state.deckName}
            returnKeyType={"next"}
            autoFocus={true}
            onSubmitEditing={this._createDeck}
            style={styles.modalTextInput}
          />
        </View>
        <TouchableOpacity onPress={this._createDeck}>
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
  submitButton: {
    fontSize: 24,
    color: green,
    padding: 30,
    fontWeight: "bold"
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: Object.keys(decks).map(key => {
      return decks[key];
    })
  };
}

export default connect(mapStateToProps)(CreateDeck);
