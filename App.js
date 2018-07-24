import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Constants } from "expo";
import { white, primary_dark, primary } from "./src/util/colors";
import Decks from "./src/decks/Decks";
import Profile from "./src/profile/Profile";

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const tabsConfig = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Deks",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="account-settings-variant"
          size={30}
          color={tintColor}
        />
      )
    }
  }
};

const tabBarOptions = {
  activeTintColor: Platform.OS === "ios" ? primary_dark : white,
  style: {
    height: 56,
    backgroundColor: Platform.OS === "ios" ? white : primary_dark,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
};

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(
        tabsConfig,
        {
          navigationOptions: {
            header: null
          }
        },
        {
          tabBarOptions
        }
      )
    : createMaterialBottomTabNavigator(tabsConfig, {
        initialRouteName: "Decks",
        activeTintColor: white,
        inactiveTintColor: primary,
        barStyle: { backgroundColor: primary_dark },
        navigationOptions: {
          header: null
        }
      });

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar backgroundColor={primary_dark} barStyle="light-content" />
        <Tabs />
      </View>
    );
  }
}
