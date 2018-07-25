import React, { Component } from "react";
import { StyleSheet, Platform, View } from "react-native";
import { black, secondary, yellow } from "../util/colors";
import PageTitle from "../common/components/PageTitle";
import ActionButton from "react-native-action-button";
import Deck from "./Deck";

class DeckList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <PageTitle title={"Decks"} />

        <Deck />

        <ActionButton
          buttonColor={yellow}
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
