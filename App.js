import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducers from './Redux/reducers';
import AppNavigator from './navigation/AppNavigator';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />;
      </Provider>
    );
  }
}
