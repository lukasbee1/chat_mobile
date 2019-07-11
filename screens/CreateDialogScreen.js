import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ListItem, Divider, Button } from 'react-native-elements';
import { getUsers, postCreateChat } from '../Redux/queries';
// import styles from '../constants/Styles';

class CreateDialogScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create Dialog',
    headerRight: (
      <Button title="Create" onPress={navigation.getParam('createChat')} />
    ),
  });
  state = {
    name: '',
    selectedUsers: [],
  };

  componentDidMount() {
    this.props.navigation.setParams({ createChat: this.handleCreatePress });
    this.props.getUsers();
  }

  handleUserPress = user => {
    const { selectedUsers } = this.state;
    if (selectedUsers.includes(user)) {
      this.setState({
        selectedUsers: selectedUsers.filter(
          item => item.uniqueId !== user.uniqueId
        ),
      });
    } else {
      const newArray = selectedUsers;
      newArray.push(user);
      this.setState({ selectedUsers: newArray });
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.handleUserPress(item)}>
        <ListItem
          title={item.name}
          subtitle={item.email}
          leftAvatar={{ uri: item.avatar }}
        />
        <Divider />
      </TouchableOpacity>
    );
  };
  handleCreatePress = () => {
    const { name, selectedUsers } = this.state;
    this.props.postCreateChat({ name, users: selectedUsers }).then(() => {
      this.props.navigation.navigate('Dialog');
    });
  };
  render() {
    return (
      <View>
        <Text>Users Selected: {this.state.selectedUsers.length}</Text>
        <TextInput
          placeholder="enter chat name"
          placeholderColor="#c4c3cb"
          onChangeText={name => this.setState({ name })}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.usersList}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  usersList: state.usersList,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getUsers, postCreateChat }
)(CreateDialogScreen);
