import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { View, Text } from "react-native";

import firebase from "firebase";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import LottieView from "lottie-react-native";
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyCNxZIylZ7Y9EIobtkF_EvzZaPPOSwkIWA",
  authDomain: "instagram-demo-57299.firebaseapp.com",
  projectId: "instagram-demo-57299",
  storageBucket: "instagram-demo-57299.appspot.com",
  messagingSenderId: "408340343980",
  appId: "1:408340343980:web:18edcf30292a7d37954309",
  measurementId: "G-ZJFKPM5CLB",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/Landing";
import RegisterScreen from "./components/Register";
import LoginScreen from "./components/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/Main/Add";
import SaveScreen from "./components/Main/Save";
import CommentScreen from "./components/Main/Comment";
import HomeScreen from "./components/Home";
import CardListScreen from "./components/CardListScreen";
import CardItemDetails from "./components/Main/CardItemDetails";
//import FeedScreen from "./components/Main/Feed";

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <LottieView
            source={require("./assets/banners/10932-preparing-food.json")}
            autoPlay
            loop
          />
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={({ route }) => ({
                headerBackTitleVisible: false,
                headerTitle: false,
                headerTransparent: true,
                headerTintColor: "#fff",
              })}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={({ route }) => ({
                headerBackTitleVisible: false,
                headerTitle: false,
                headerTransparent: true,
                headerTintColor: "#fff",
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={({ route }) => ({
                headerShown: false,
              })}
            />

            <Stack.Screen
              name="Add"
              component={AddScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Comment"
              component={CommentScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="CardListScreen"
              component={CardListScreen}
              options={({ route }) => ({ title: route.params.title })}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="CardItemDetails"
              component={CardItemDetails}
              options={({ route }) => ({
                headerBackTitleVisible: false,
                headerTitle: false,
                headerTransparent: true,
                headerTintColor: "#fff",
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
