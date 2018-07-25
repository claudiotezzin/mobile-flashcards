import React, { Component } from "react";
import { StyleSheet, Platform, View } from "react-native";
import { yellow } from "../util/colors";
import PageTitle from "../common/components/PageTitle";
import ActionButton from "react-native-action-button";
import Deck from "./Deck";

class DeckList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <PageTitle title={"Decks"} />

        <Deck />
        <Deck />
        <Deck />
        <Deck />

        <ActionButton
          buttonColor={yellow}
          elevation={8}
          fixNativeFeedbackRadius={true}
          onPress={() => {
            console.log("hi");
          }}
          size={Platform.OS === "ios" ? 46 : 56}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default DeckList;
