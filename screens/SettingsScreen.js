import React from 'react';
import { Button } from 'react-native';

export default class SettingsScreen extends React.PureComponent {
  render() {
    return (
      <Button
        title="Sign Out"
        onPress={() => this.props.navigation.navigate('SignIn')}
      />
    );
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
