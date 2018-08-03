import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { receiveSingleDeck, addCard } from "../actions";
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
        return dispatch(receiveSingleDeck(deck));
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
      saveCardToDeck(deckTitle, card).then(() => {
        DeviceEventEmitter.emit("state_listener", {});
      });
    }

    this._toggleModal();
  };

  _startQuiz = () => {
    const { navigation, deck } = this.props;

    navigation.navigate("Quiz", { deckTitle: deck.title });
  };

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text
            style={{
              color: primary,
              fontSize: 32,
              fontWeight: "bold"
            }}
          >
            {deck.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "80%"
            }}
          >
            <MaterialCommunityIcons
              style={{ marginRight: 8 }}
              name="cards"
              size={40}
              color={red}
            />
            <Text style={{ fontSize: 20, marginTop: 6 }}>
              {deck.questions.length} cards
            </Text>
          </View>
        </View>

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

        <ActionButton
          elevation={8}
          fixNativeFeedbackRadius={true}
          buttonColor={red}
          size={Platform.OS === "ios" ? 46 : 56}
        >
          {deck.questions.length > 0 && (
            <ActionButton.Item
              buttonColor={green}
              title="Start Quiz"
              onPress={this._startQuiz}
            >
              <Ionicons name="md-play" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          )}
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    backgroundColor: white,
    alignItems: "center",
    borderRadius: Platform.OS === "ios" ? 16 : 8,
    padding: 30,
    width: 340,
    height: 490,
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

function mapStateToProps({ decks }, ownProps) {
  const { navigation } = ownProps;

  return {
    deck: decks[navigation.state.params.deckTitle]
  };
}

export default connect(mapStateToProps)(DeckDetail);
