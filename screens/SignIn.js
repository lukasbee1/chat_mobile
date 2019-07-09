import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { LAN } from 'react-native-dotenv';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../constants/Styles';
import {
  postLogin,
  initSocketConnection,
  clientsUpdated,
  chatsUpdated,
  sendMessage,
} from '../Redux/actions';

// const appId = '1047121222092614';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidUpdate() {
    if (this.props.user.uniqueId) {
      this.props.navigation.navigate('SignedIn');
    }
  }

  render() {
    return (
      <View style={styles.loginFormView}>
        <KeyboardAvoidingView
          style={styles.containerView}
          behavior="height"
          enabled
        >
          <Text style={styles.logoText}>Luxas Chat</Text>
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
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Login with Facebook"
              color="#3897f1"
            />
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
    if (obj.email) {
      const client = io(`http://${LAN}:8080`);
      client.on('connect', () => {
        console.log('client connected, listening...');
      });
      client.on('clientsUpdated', usersInfo => {
        console.log('clients updated');
        this.props.clientsUpdated(usersInfo);
      });
      client.on('chatsUpdated', chatsInfo => {
        console.log('chats updated');
        this.props.chatsUpdated(chatsInfo);
      });
      client.on('reply', (data, sender, roomId) => {
        console.log('reply emited');
        this.props.sendMessage({ tweet: data, id: roomId, Sender: sender });
      });
      client.on('disconnect', () => {
        console.log('Client socket disconnect. ');
        // cl.splice(this.props.client.id, 1);
        // this.props.client.close();
      });
      client.on('error', err => {
        console.error(JSON.stringify(err));
      });
      this.props.initSocketConnection(client);
      this.props.postLogin(obj);
    }
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
  {
    postLogin,
    initSocketConnection,
    clientsUpdated,
    chatsUpdated,
    sendMessage,
  }
)(SignIn);
