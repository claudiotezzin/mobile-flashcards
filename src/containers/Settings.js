import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import PageTitle from "../components/PageTitle";
import { black, white } from "../util/colors";
import { resetDecks } from "../api";
import { receiveDecks } from "../actions";

class Settings extends Component {
  _onClearData = () => {
    Alert.alert(
      "Reset Data",
      "Are you sure you want to reset deck data???",
      [{ text: "No" }, { text: "Yes", onPress: this._clearData }],
      { cancelable: true }
    );
  };

  _clearData = () => {
    const { dispatch } = this.props;

    resetDecks().then(decks => {
      return dispatch(receiveDecks(decks));
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PageTitle title={"Settings"} />

        <TouchableOpacity
          style={{
            backgroundColor: black,
            padding: 30,
            margin: 40,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this._onClearData}
        >
          <Text style={{ color: white, fontSize: 20 }}>Reset Decks Data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect()(Settings);
