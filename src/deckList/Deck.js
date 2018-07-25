import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import {
  white,
  black,
  primary,
  primary_light,
  secondary_dark,
  secondary,
  primary_dark,
  secondary_light,
  red
} from "../util/colors";

class Deck extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.item}
        // onPress={() => this.props.navigation.navigate("DeckDatail")}
      >
        <Text style={styles.title}>Title</Text>
        <Text style={styles.subTitle}>12 cards</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    elevation: 6,
    height: 180,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  title: {
    color: primary_dark,
    fontSize: 22,
    fontWeight: "bold"
  },
  subTitle: {
    color: primary,
    fontSize: 14
  }
});

export default Deck;
