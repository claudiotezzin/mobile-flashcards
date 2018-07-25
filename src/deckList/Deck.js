import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { white, primary, primary_dark, red } from "../util/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class Deck extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.item}
        // onPress={() => this.props.navigation.navigate("DeckDatail")}
      >
        <Text style={styles.title}>Title</Text>
        <View
          style={[
            styles.cornerPosition,
            { flexDirection: "row", alignItems: "center" }
          ]}
        >
          <MaterialCommunityIcons
            style={{ marginRight: 3 }}
            name="cards"
            size={20}
            color={red}
          />
          <Text style={styles.subTitle}>12 cards</Text>
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
  },
  cornerPosition: {
    position: "absolute",
    right: 10,
    bottom: 10
  }
});

export default Deck;
