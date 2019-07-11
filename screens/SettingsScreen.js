import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { logOutAction } from '../Redux/actions';

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
          this.props.logOutAction();
        }}
      />
    );
  }
}

export default connect(
  null,
  { logOutAction }
)(SettingsScreen);
