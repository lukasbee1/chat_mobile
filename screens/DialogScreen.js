import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Message from '../components/Message';
import { setEmit } from '../Redux/actions';
// import styles from '../constants/Styles';

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
        style={{ flex: 1, backgroundColor: 'gray' }}
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
              style={{
                height: 40,
                width: '95%',
                fontSize: 20,
                paddingLeft: 10,
                paddingBottom: 15,
              }}
            />
            <Icon
              reverse
              name="sc-telegram"
              type="evilicon"
              color="#517fa4"
              onPress={() => this.sendMessage()}
              size="20"
              style={{}}
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
