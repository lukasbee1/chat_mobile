import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../constants/Styles';
import { postLogin } from '../Redux/queries';

// const appId = '';

class SignIn extends Component {
  state = {
    login: '',
    password: '',
  };

  componentDidUpdate() {
    if (this.props.user.uniqueId) {
      this.props.navigation.navigate('SignedIn');
    }
  }

  onLoginPress() {
    const obj = {
      login: this.state.login,
      password: this.state.password,
    };
    console.log(this.state.login);
    this.props.postLogin(obj);
  }

  render() {
    return (
      <View style={styles.loginFormView}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View style={{ flex: 1 }}>
            <Text style={styles.logoText}>Auth</Text>
            <View style={styles.loginScreenContainer}>
              <TextInput
                placeholder="Username"
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
              {/* <Button
                buttonStyle={styles.fbLoginButton}
                onPress={() => this.onFbLoginPress()}
                title="Login with Facebook"
                color="#3897f1"
              /> */}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  // async onFbLoginPress() {
  //   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
  //     appId,
  //     {
  //       permissions: ['public_profile', 'email'],
  //     }
  //   );
  //   if (type === 'success') {
  //     const response = await fetch(
  //       `https://graph.facebook.com/me?access_token=${token}`
  //     );
  //     Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
  //   }
  // }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { postLogin }
)(SignIn);
