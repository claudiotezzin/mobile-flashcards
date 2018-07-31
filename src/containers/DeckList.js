import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Platform,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { yellow, white, primary_dark, primary, green } from "../util/colors";
import PageTitle from "../components/PageTitle";
import ActionButton from "react-native-action-button";
import Deck from "../components/Deck";
import Modal from "react-native-modal";
import { getDecks, saveDeck } from "../api";
import { addDeck, receiveDecks } from "../actions";

class DeckList extends Component {
  state = {
    isCreateDeckModalVisible: false,
    ready: false,
    deckName: ""
  };

  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => {
        return dispatch(receiveDecks(decks));
      })
      .then(() => this.setState({ ready: true }))
      .catch(() => {});
  }

  _toggleModal = () =>
    this.setState({
      isCreateDeckModalVisible: !this.state.isCreateDeckModalVisible,
      deckName: ""
    });

  _createDeck = () => {
    const { dispatch } = this.props;
    const { deckName } = this.state;

    if (deckName !== "") {
      dispatch(addDeck(deckName));

      saveDeck(deckName)
        .then(result => {
          console.log("DeckList", "Deck cretaed!");
        })
        .catch(err => {
          console.log(
            "DeckList",
            "Deck creation error: " + JSON.stringify(err)
          );
        });
    }

    this._toggleModal();
  };

  render() {
    const { decks } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <PageTitle title={"Decks"} />

        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <Deck
              title={item.title}
              numOfQuestions={
                item.questions === undefined ? 0 : item.questions.length
              }
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        <Modal
          isVisible={this.state.isCreateDeckModalVisible}
          onBackButtonPress={this._toggleModal}
          onBackdropPress={this._toggleModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Deck</Text>
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
              <Text style={styles.submitButton}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <ActionButton
          buttonColor={yellow}
          elevation={8}
          fixNativeFeedbackRadius={true}
          onPress={this._toggleModal}
          size={Platform.OS === "ios" ? 46 : 56}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: white,
    padding: 22,
    paddingBottom: 12,
    justifyContent: "center",
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
    fontSize: 20,
    color: green,
    padding: 10,
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

export default connect(mapStateToProps)(DeckList);
