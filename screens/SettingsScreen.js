import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { closeSocket } from '../Redux/actions';

class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return (
      <Button
        title="Sign Out"
        onPress={() => {
          this.props.navigation.navigate('SignIn');
          this.props.closeSocket();
        }}
      />
    );
  }
}

export default connect(
  null,
  { closeSocket }
)(SettingsScreen);
