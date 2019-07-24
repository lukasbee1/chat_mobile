import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeToStaticData } from 'react-native-dotenv';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ListItem, Divider, Button, Icon } from 'react-native-elements';
import { getUsers, postCreateChat } from '../Redux/queries';
import { resetToDialogAction } from '../utils/actions';
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

  handleCreatePress = () => {
    const { name, selectedUsers } = this.state;
    this.props
      .postCreateChat({ name, users: [this.props.user, ...selectedUsers] })
      .then(() => {
        this.props.navigation.dispatch(resetToDialogAction);
      });
  };

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
          leftAvatar={{
            source: { uri: `${routeToStaticData}${item.avatar}` },
          }}
          rightIcon={
            <Icon
              name="check_box"
              color="black"
              size={30}
              onPress={() => console.log('pressed')}
            />
          }
        />
        <Divider />
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.usersList.filter(
      user => user.uniqueId !== this.props.user.uniqueId
    );
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
          data={list}
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
