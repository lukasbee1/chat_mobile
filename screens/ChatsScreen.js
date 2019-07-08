import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import io from 'socket.io-client';
import {
  getChats,
  initSocketConnection,
  clientsUpdated,
  chatsUpdated,
  getChat,
  sendMessage,
} from '../Redux/actions';

class ChatsScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  componentDidMount() {
    const client = io('http://localhost:8080');
    this.props.initSocketConnection(client);
    client.on('connect', () => {
      console.log('client connected, listening...');
    });
    client.on('clientsUpdated', usersInfo => {
      this.props.clientsUpdated(usersInfo);
    });
    client.on('chatsUpdated', chatsInfo => {
      this.props.chatsUpdated(chatsInfo);
    });
    client.on('reply', (data, sender, roomId) => {
      this.props.sendMessage({ tweet: data, id: roomId, Sender: sender });
      // this.getMess();
    });
    client.on('disconnect', () => {
      console.log('Client socket disconnect. ');
      // cl.splice(this.props.client.id, 1);
      // this.props.client.close();
    });
    client.on('error', err => {
      console.error(JSON.stringify(err));
    });
  }

  render() {
    return (
      <View>
        <Text>chats</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getChats, initSocketConnection, clientsUpdated, chatsUpdated, getChat, sendMessage }
)(ChatsScreen);
