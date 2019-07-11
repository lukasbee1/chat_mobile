import React, { Component } from 'react';
import io from 'socket.io-client';
import { LAN } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { getUsers } from '../Redux/queries';
import {
  initSocketConnection,
  sendMessage,
  clientsUpdated,
  chatsUpdated,
} from '../Redux/actions';
// import styles from '../constants/Styles';

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  componentDidMount() {
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

    this.props.getUsers();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return (
      <TouchableWithoutFeedback>
        <View>
          <ListItem
            title={item.name}
            subtitle={item.email}
            leftAvatar={{ uri: item.avatar }}
          />
          <Divider />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.usersList}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapStateToProps = state => ({
  usersList: state.usersList,
});

export default connect(
  mapStateToProps,
  { getUsers, initSocketConnection, clientsUpdated, chatsUpdated, sendMessage }
)(UsersScreen);
