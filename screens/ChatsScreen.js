import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { getChats } from '../Redux/actions';

export class ChatsScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };
  componentDidMount() {
    this.props.getChats();
  }
  render() {
    return (
      <View>
        <Text>chats</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { getChats }
)(ChatsScreen);
