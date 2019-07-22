const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 60,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginHorizontal: 8,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },

  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  inputContainer: {
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
  },
  dialogScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomSide: {
    backgroundColor: '#b5b3ae',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#fff',
  },
  bottomSideInput: {
    marginLeft: 40,
    marginVertical: 4,
    width: 290,
    fontSize: 20,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
    margin: 10,
  },
  messageText: {
    maxWidth: 290,
    borderRadius: 10,
    marginHorizontal: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#b5b2b1',
  },
  messageIcon: {
    marginTop: 4,
    width: 25,
    height: 25,
  },
  senderMess: {
    flex: 1,
    marginBottom: 3,
    margin: 10,
    flexDirection: 'row-reverse',
  },
  defaultMess: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
    margin: 10,
  },
});
