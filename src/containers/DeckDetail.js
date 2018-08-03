import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import ActionButton from "react-native-action-button";
import { white, red, green, yellow, primary } from "../util/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { receiveSingleDeck } from "../actions";
import { getDeck } from "../api";

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
    ready: false
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

  _createCard = () => {
    const { navigation, deck } = this.props;

    navigation.navigate("CreateCard", { deckTitle: deck.title });
  };

  _startQuiz = () => {
    const { navigation, deck } = this.props;

    navigation.navigate("Quiz", { deckTitle: deck.title });
  };

  render() {
    const { deck } = this.props;

    if (!this.state.ready) {
      return <ActivityIndicator style={{ marginTop: 30 }} />;
    }

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
              <Ionicons name="md-play" />
            </ActionButton.Item>
          )}
          <ActionButton.Item
            buttonColor={yellow}
            title="Add Card"
            onPress={this._createCard}
          >
            <Ionicons name="md-add" />
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
  }
});

function mapStateToProps({ decks }, ownProps) {
  const { navigation } = ownProps;

  return {
    deck: decks[navigation.state.params.deckTitle]
  };
}

export default connect(mapStateToProps)(DeckDetail);
