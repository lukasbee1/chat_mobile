import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { routeToStaticData } from 'react-native-dotenv';
import styles from '../constants/Styles';

class Message extends PureComponent {
  render = () => {
    const whoSend =
      this.props.sender.uniqueId === this.props.uniqueId
        ? styles.senderMess
        : styles.defaultMess;
    return (
      <View style={whoSend}>
        <Avatar
          rounded
          source={{ uri: `${routeToStaticData}${this.props.sender.avatar}` }}
          style={styles.messageIcon}
        />
        <View style={styles.messageText}>
          <Text>{this.props.details}</Text>
        </View>
      </View>
    );
  };
}

export default Message;
