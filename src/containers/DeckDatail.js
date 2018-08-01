import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import ActionButton from "react-native-action-button";
import {
  white,
  red,
  green,
  yellow,
  primary_dark,
  primary
} from "../util/colors";
import { Ionicons } from "@expo/vector-icons";
import { receiveCards, addCard } from "../actions";
import { getDeck, saveCardToDeck } from "../api";

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("deckTitle", "Selected deck title"),
      headerTitleStyle: {
        marginLeft: 60
      }
    };
  };

  state = {
    isCreateCardModalVisible: false,
    ready: false,
    card: {
      question: "",
      answer: ""
    }
  };

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    const title = navigation.state.params.deckTitle;

    getDeck(title)
      .then(deck => {
        const { questions } = deck;
        return dispatch(receiveCards(questions));
      })
      .then(() => this.setState({ ready: true }));
  }

  _toggleModal = () =>
    this.setState({
      isCreateCardModalVisible: !this.state.isCreateCardModalVisible,
      card: {
        question: "",
        answer: ""
      }
    });

  _createCard = () => {
    const { dispatch, navigation } = this.props;
    const deckTitle = navigation.state.params.deckTitle;
    const { card } = this.state;

    if (card.question !== "" && card.answer !== "") {
      dispatch(addCard(card));
      saveCardToDeck(deckTitle, card);
    }

    this._toggleModal();
  };

  render() {
    const { cards } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={cards}
          renderItem={({ item }) => <Text>{item.question}</Text>}
          keyExtractor={(_, index) => index.toString()}
        />

        <Modal
          isVisible={this.state.isCreateCardModalVisible}
          onBackButtonPress={this._toggleModal}
          onBackdropPress={this._toggleModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Card</Text>
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
                value={this.state.deckName}
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
                value={this.state.deckName}
                returnKeyType={"next"}
                onSubmitEditing={this._createCard}
                style={styles.modalTextInput}
              />
            </View>
            <TouchableOpacity onPress={this._createCard}>
              <Text style={styles.submitButton}>CREATE</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <ActionButton buttonColor={red}>
          <ActionButton.Item
            buttonColor={green}
            title="Start Quiz"
            onPress={() => console.log("Start Quiz tapped!")}
          >
            <Ionicons name="md-play" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={yellow}
            title="Add Card"
            onPress={this._toggleModal}
          >
            <Ionicons name="md-add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 8,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    elevation: 6,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
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

function mapStateToProps({ cards }) {
  // console.log("DEBUG", "cards: " + JSON.stringify(cards));

  return {
    cards: cards
  };
}

export default connect(mapStateToProps)(DeckDetail);
