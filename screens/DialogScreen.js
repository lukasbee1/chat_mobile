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
  SafeAreaView,
} from 'react-native';
import { setEmit } from '../Redux/actions';
import { Icon } from 'react-native-elements';
import styles from '../constants/Styles';
import { ScrollView } from 'react-native-gesture-handler';

class DialogScreen extends Component {
  state = {
    currentMessages: [],
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

  componentDidMount() {
    this.getMess();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.chats !== this.props.chats) {
      this.getMess();
    }
  }
  getMess = () => {
    const { chats, activeId } = this.props;
    this.setState({ currentMessages: chats[activeId] });
  };
  render() {
    const { currentMessages } = this.state;
    const messageList = currentMessages.map(message => (
      <Message
        key={message.id}
        details={message.tweet}
        sender={message.Sender}
      />
    ));
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View>{messageList}</View>
          </View>
        </ScrollView>
        <View
          style={{
            height: 40,
            width: '85%',
            backgroundColor: '#fff',
            justifySelf: 'flex-end',
            flexDirection: 'row',
            color: '#fff',
          }}
        >
          <TextInput
            placeholder="type message..."
            value={this.state.inpData}
            placeholderColor="#c4c3cb"
            onChangeText={inpData => this.setState({ inpData })}
            style={{ flex: 10, fontSize: 20, paddingLeft: 10 }}
          />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.sendMessage()}
          >
            <Icon
              name="sc-telegram"
              type="evilicon"
              color="#517fa4"
              style={{ flex: 1 }}
            />
          </TouchableOpacity>
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
