import { StackActions, NavigationActions } from 'react-navigation';

export const resetToDialogAction = StackActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Chats' }),
    NavigationActions.navigate({ routeName: 'Dialog' }),
  ],
});
