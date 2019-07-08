import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, List, FlatList, ListItem } from 'react-native';
import { getChats, getUsers } from '../Redux/actions';

class ChatsScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  componentDidMount() {
    this.props.getChats(this.props.user.id);
  }

  componentDidUpdate() {}

  render() {
    return (
      <View>
        <FlatList
          data={this.props.chatsList}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  user: state.user,
  chatsList: state.chatsList,
  usersList: state.usersList,
});

export default connect(
  mapStateToProps,
  {
    getChats,
    getUsers,
  }
)(ChatsScreen);
