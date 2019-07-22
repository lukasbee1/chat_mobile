import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { postRegister } from '../Redux/queries';
import styles from '../constants/Styles';

class SignUp extends Component {
  state = {
    login: null,
    email: '',
    password: '',
    oPassword: '',
  };

  onRegisterPress = () => {
    if (this.state.login && this.state.password === this.state.oPassword) {
      const obj = {
        type: 'profile',
        email: this.state.email,
        login: this.state.login,
        name: this.state.login,
        password: this.state.password,
      };
      this.props.postRegister(obj);
      this.setState({
        email: '',
        login: '',
        password: '',
        oPassword: '',
      });
    } else {
      alert('invalid data');
      console.log('invalid data');
    }
  };

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
                placeholder="Email"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                placeholder="Login"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={login => this.setState({ login })}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={password => this.setState({ password })}
                secureTextEntry
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={oPassword => this.setState({ oPassword })}
                secureTextEntry
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={this.onRegisterPress}
                title="Register"
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.props.navigation.push('SignIn')}
                title="Sign In"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { postRegister }
)(SignUp);
