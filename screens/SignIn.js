import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../constants/Styles';
import { postLogin } from '../Redux/queries';

// const appId = '';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidUpdate() {
    console.log('did');

    if (this.props.user.uniqueId) {
      console.log('login');

      this.props.navigation.navigate('SignedIn');
    }
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
                onChangeText={email => this.setState({ email })}
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

  onLoginPress() {
    const obj = {
      type: 'profile',
      email: this.state.email,
      login: this.state.email,
      name: this.state.email,
    };
    this.props.postLogin(obj);
    this.setState({ email: '', password: '' });
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
