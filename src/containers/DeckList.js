import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, View, FlatList, DeviceEventEmitter } from "react-native";
import { yellow } from "../util/colors";
import PageTitle from "../components/PageTitle";
import ActionButton from "react-native-action-button";
import Deck from "../components/Deck";
import { getDecks } from "../api";
import { receiveDecks } from "../actions";

class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState({ ready: true }));
  }

  render() {
    const { decks, navigation } = this.props;

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
              navigation={navigation}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        <ActionButton
          buttonColor={yellow}
          elevation={8}
          fixNativeFeedbackRadius={true}
          onPress={() => navigation.navigate("CreateDeck", {})}
          size={Platform.OS === "ios" ? 46 : 56}
        />
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks: Object.keys(decks).map(key => {
      return decks[key];
    })
  };
}

export default connect(mapStateToProps)(DeckList);
