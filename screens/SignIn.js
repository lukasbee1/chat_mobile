import React, { Component } from 'react';

import styles from '../constants/Styles';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';

const appId = '1047121222092614';

export default class SignIn extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.containerView}
        behavior="padding"
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormView}>
            <View style={styles.loginScreenContainer}>
              <Text style={styles.logoText}>Luxas Chat</Text>
              <TextInput
                placeholder="Username"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Login"
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.props.navigation.push('SignUp')}
                title="Sign Up"
              />
              <Button
                buttonStyle={styles.fbLoginButton}
                onPress={() => this.onFbLoginPress()}
                title="Login with Facebook"
                color="#3897f1"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  onLoginPress() {
    this.props.navigation.navigate('SignedIn');
  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      appId,
      {
        permissions: ['public_profile', 'email'],
      }
    );
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    }
  }
}
