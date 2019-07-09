import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { getChats, getChat } from '../Redux/actions';
// import styles from '../constants/Styles';

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  componentDidMount() {
    this.props.getChats(this.props.user.id);
  }

  handleDialogPress = id => {
    this.props.getChat(id).then(() => {
      this.props.navigation.navigate('Dialog');
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.handleDialogPress(item.id)}>
        <ListItem
          title={item.name}
          subtitle={item.email}
          leftAvatar={{ uri: item.avatar }}
        />
        <Divider />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.chatsList}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapStateToProps = state => ({
  chatsList: state.chatsList,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getChats, getChat }
)(UsersScreen);
