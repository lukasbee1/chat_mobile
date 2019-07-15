import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { routeToStaticData } from 'react-native-dotenv';

class Message extends PureComponent {
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'row', marginBottom: 15, margin: 10 }}
      >
        <Avatar
          rounded
          source={{ uri: `${routeToStaticData}${this.props.sender.avatar}` }}
          style={{ width: 25, height: 25 }}
        />
        <View
          style={{
            maxWidth: 315,
            borderRadius: 45,
            marginHorizontal: 10,
            paddingHorizontal: 20,
            paddingVertical: 7,
            backgroundColor: 'grey',
          }}
        >
          <Text>{this.props.details}</Text>
        </View>
      </View>
    );
  }
}

export default Message;
