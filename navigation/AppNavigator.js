import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';
import SignedOutNavigator from './SignedOutNavigator';
import SignedInNavigator from './SignedInNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      SignIn: SignedOutNavigator,
      SignedIn: SignedInNavigator,
    },
    {
      initialRouteName: 'SignIn',
    }
  )
);
