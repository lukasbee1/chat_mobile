import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import SettingsScreen from '../screens/SettingsScreen';
import ChatsScreen from '../screens/ChatsScreen';
import UsersScreen from '../screens/UsersScreen';
import DialogScreen from '../screens/DialogScreen';
import CreateDialogScreen from '../screens/CreateDialogScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ChatsStack = createStackNavigator(
  {
    Chats: ChatsScreen,
    Dialog: DialogScreen,
    CreateDialog: CreateDialogScreen,
  },
  config
);

ChatsStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Chats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
  tabBarVisible:
    navigation.state.routes[navigation.state.index].routeName === 'Dialog'
      ? false
      : true,
});

ChatsStack.path = '';

const UsersStack = createStackNavigator(
  {
    Users: UsersScreen,
    Dialog: DialogScreen,
  },
  config
);

UsersStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Users',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
  tabBarVisible:
    navigation.state.routes[navigation.state.index].routeName === 'Dialog'
      ? false
      : true,
});

UsersStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

SettingsStack.path = '';

const SignedInNavigator = createBottomTabNavigator({
  UsersStack,
  ChatsStack,
  SettingsStack,
});
SignedInNavigator.path = '';

export default SignedInNavigator;
