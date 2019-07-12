import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../components/Message';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { setEmit } from '../Redux/actions';
import { Icon } from 'react-native-elements';
import styles from '../constants/Styles';
import { ScrollView } from 'react-native-gesture-handler';

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
    const { activeId, chats } = this.props;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'height' : null}
        keyboardVerticalOffset={64}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <ScrollView
            style={{}}
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
          >
            {chats[activeId]
              ? chats[activeId].map(message => (
                  <Message
                    key={message.id}
                    details={message.tweet}
                    sender={message.Sender}
                  />
                ))
              : null}
          </ScrollView>
          <View
            style={{
              width: '85%',
              height: 30,
              backgroundColor: '#fff',
              flexDirection: 'row',
              color: '#fff',
              marginBottom: 20,
            }}
          >
            <TextInput
              placeholder="Message"
              value={this.state.inpData}
              placeholderColor="#c4c3cb"
              onChangeText={inpData => this.setState({ inpData })}
              style={{ height: 40, flex: 10, fontSize: 20, paddingLeft: 10 }}
            />
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center' }}
              onPress={() => this.sendMessage()}
            >
              <Icon
                name="sc-telegram"
                type="evilicon"
                color="#517fa4"
                style={{ flex: 1, size: 20 }}
              />
            </TouchableOpacity>
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
