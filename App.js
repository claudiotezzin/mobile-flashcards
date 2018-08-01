import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { View, Platform, StatusBar } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Constants } from "expo";
import { white, primary_dark, primary, black } from "./src/util/colors";
import DeckDetail from "./src/containers/DeckDetail";
import Profile from "./src/profile/Profile";
import DeckList from "./src/containers/DeckList";
import rootReducer from "./src/reducers";

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
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      // title: "Deck One",
      headerStyle: {
        backgroundColor: primary
      }
    }
  }
});

// const store = createStore(rootReducer, applyMiddleware(logger));
const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={black} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
