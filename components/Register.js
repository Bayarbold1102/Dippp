import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { render } from "react-dom";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Тавтай морил</Text>
        </View>
        <Animatable.View style={[styles.footer]} animation="fadeInUpBig">
          <Text style={[styles.text_footer]}>Нэрээ оруулна уу</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              style={[styles.textInput]}
              underlineColorAndroid="transparent"
              placeholder="нэр"
              onChangeText={(name) => this.setState({ name })}
            />
          </View>
          <Text style={[styles.text_footer]}>Email оруулна уу</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              style={[styles.textInput]}
              underlineColorAndroid="transparent"
              placeholder="email"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>

          <Text style={[styles.text_footer]}>Нууц үгээ оруулна уу</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" size={20} />
            <TextInput
              style={[styles.textInput]}
              underlineColorAndroid="transparent"
              placeholder="Нууц үг"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => this.onSignUp()}
              style={[
                styles.signIn,
                {
                  borderColor: "#FF6347",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#FF6347",
                  },
                ]}
              >
                Бүртгүүлэх
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6347",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
