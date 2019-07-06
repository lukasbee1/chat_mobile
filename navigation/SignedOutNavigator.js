import { createStackNavigator } from 'react-navigation';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });

const SignedOutNavigator = createStackNavigator({
  SignIn,
  SignUp,
});

SignedOutNavigator.path = '';

export default SignedOutNavigator;
