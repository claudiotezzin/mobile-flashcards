import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert
} from "react-native";
import { white, primary, primary_dark, red, black } from "../util/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteDeck } from "../actions";
import { deleteDeck as APIDeleteDeck } from "../api";

class Deck extends Component {
  deleteDeck = () => {
    const { title, dispatch } = this.props;

    dispatch(deleteDeck(title));

    APIDeleteDeck(title);
  };

  onDeleteDeck = () => {
    Alert.alert(
      "Delete Deck",
      "Are you sure you want to delete this Deck???",
      [{ text: "Delete", onPress: this.deleteDeck }, { text: "Cancel" }],
      { cancelable: true }
    );
  };

  render() {
    const { title, numOfQuestions, navigation } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.item}
        onPress={() => navigation.navigate("DeckDetail", { deckTitle: title })}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.cornerUpPosition}
          onPress={this.onDeleteDeck}
        >
          <MaterialCommunityIcons name="close" size={25} color={black} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.cornerBottomPosition}>
          <MaterialCommunityIcons
            style={{ marginRight: 3 }}
            name="cards"
            size={20}
            color={red}
          />
          <Text style={styles.subTitle}>{numOfQuestions} cards</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 8,
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
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
  },
  cornerBottomPosition: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    right: 10,
    bottom: 10
  },
  cornerUpPosition: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    right: 2,
    top: 2,
    padding: 10
  }
});

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  numOfQuestions: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired
};

export default connect()(Deck);
