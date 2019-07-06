import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';

export class SignIn extends PureComponent {
  render() {
    return (
      <View style={{ paddingVertical: 100 }}>
        <Input label="Email" placeholder="Email address..." />
        <Input label="Password" secureTextEntry placeholder="Password..." />

        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN IN"
          onPress={() => this.props.navigation.navigate('SignedIn')}
        />
      </View>
    );
  }
}

export default SignIn;
