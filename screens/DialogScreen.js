import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Message from '../components/Message';
import { setEmit } from '../Redux/actions';
import styles from '../constants/Styles';

class DialogScreen extends Component {
  state = {
    inpData: '',
  };

  sendMessage = () => {
    const { inpData } = this.state;
    const { activeId, user } = this.props;
    if (inpData !== '') {
      this.props.setEmit('reply', inpData, user, activeId);
      this.setState({ inpData: '' });
    }
  };

  render() {
    const { activeId, chats, user } = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'height' : null}
        keyboardVerticalOffset={64}
      >
        <View style={styles.dialogScreen}>
          <ScrollView
            style={{}}
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: false });
            }}
          >
            <View style={{ flex: 1, flexDirection: 'column' }}>
              {chats[activeId]
                ? chats[activeId].map(message => (
                    <Message
                      key={message.id}
                      details={message.tweet}
                      sender={message.Sender}
                      uniqueId={user.uniqueId}
                    />
                  ))
                : null}
            </View>
          </ScrollView>
          <View style={styles.bottomSide}>
            <TextInput
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Message"
              value={this.state.inpData}
              placeholderColor="#c4c3cb"
              onChangeText={inpData => this.setState({ inpData })}
              style={styles.bottomSideInput}
            />
            <Icon
              reverse
              name="keyboard_arrow_up"
              type="evilicon"
              color="#517fa4"
              onPress={() => this.sendMessage()}
              size="13"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  chats: state.chats,
  activeId: state.activeId,
});

export default connect(
  mapStateToProps,
  { setEmit }
)(DialogScreen);
