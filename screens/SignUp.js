import React, { PureComponent } from 'react';

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
import styles from '../constants/Styles';

export class SignUp extends PureComponent {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.containerView}
        behavior="padding"
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <Text style={styles.logoText}>Sign Up</Text>
            <View style={styles.loginFormView}>
              <TextInput
                placeholder="Username"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Login"
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.props.navigation.push('SignIp')}
                title="Sign Up"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUp;
