import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { getUsers } from '../Redux/actions';
// import styles from '../constants/Styles';

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate() {
    console.log(this.props.usersList);
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
  { getUsers }
)(UsersScreen);
