import React, { Component } from "react";
import { StyleSheet, Platform, View, Text } from "react-native";
import { white, primary_dark } from "../util/colors";
import PageTitle from "../components/PageTitle";

class DeckDetail extends Component {
  render() {
    return (
      <View style={{}}>
        <View style={styles.item}>
          <Text>DeckDetail</Text>
        </View>
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
  }
});

export default DeckDetail;
