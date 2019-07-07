import React from 'react';
import { Text, View, Button } from 'react-native';

export class HomeScreen extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
        <Button
          title="Sign Out"
          onPress={() => this.props.navigation.navigate('SignIn')}
        />
      </View>
    );
  }
}
export default HomeScreen;
