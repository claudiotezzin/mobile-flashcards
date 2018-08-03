import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
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
import Settings from "./src/containers/Settings";
import DeckList from "./src/containers/DeckList";
import Quiz from "./src/containers/Quiz";
import CreateDeck from "./src/containers/CreateDeck";
import CreateCard from "./src/containers/CreateCard";
import rootReducer from "./src/reducers";
import { setLocalNotification } from "./src/util/helper";

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
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="settings" size={25} color={tintColor} />
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
      headerStyle: {
        backgroundColor: primary
      }
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      headerTitle: "Create Deck",
      headerTitleStyle: {
        marginLeft: Platform.OS === "ios" ? 0 : 60
      },
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      }
    }
  },
  CreateCard: {
    screen: CreateCard,
    navigationOptions: {
      headerTitle: "Create Card",
      headerTitleStyle: {
        marginLeft: Platform.OS === "ios" ? 0 : 60
      },
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTitle: "Quiz",
      headerTitleStyle: {
        marginLeft: Platform.OS === "ios" ? 0 : 60
      },
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      }
    }
  }
});

const store = createStore(rootReducer);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

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
