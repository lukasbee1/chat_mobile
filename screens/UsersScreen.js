import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { routeToStaticData } from 'react-native-dotenv';
import { getUsers } from '../Redux/queries';
import { createSocket } from '../Redux/actions';
// import styles from '../constants/Styles';

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  componentDidMount() {
    this.props.createSocket(this.props.user.uniqueId);
    this.props.getUsers();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <View>
          <ListItem
            title={item.name}
            subtitle={`email: ${item.email}`}
            leftAvatar={{
              source: { uri: `${routeToStaticData}${item.avatar}` },
            }}
          />
          <Divider />
        </View>
      </TouchableWithoutFeedback>
    );
  };

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
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getUsers, createSocket }
)(UsersScreen);
