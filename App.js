import React from "react";
import { View, Platform, StatusBar } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Constants } from "expo";
import { white, primary_dark, primary, black } from "./src/util/colors";
import DeckList from "./src/deckList/DeckList";
import DeckDatail from "./src/deckDetail/DeckDatail";
import Profile from "./src/profile/Profile";

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const tabsConfig = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
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

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(tabsConfig, {
        tabBarOptions: {
          activeTintColor: primary,
          style: {
            height: 56,
            backgroundColor: white,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            elevation: 6,
            shadowOpacity: 1
          }
        }
      })
    : createMaterialBottomTabNavigator(tabsConfig, {
        initialRouteName: "DeckList",
        activeTintColor: white,
        inactiveTintColor: primary,
        barStyle: { backgroundColor: primary_dark }
      });

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDatail: {
    screen: DeckDatail,
    navigationOptions: {
      headerTintColor: white,
      title: "Deck One",
      headerStyle: {
        backgroundColor: primary_dark
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar backgroundColor={black} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
