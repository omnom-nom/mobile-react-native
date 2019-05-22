import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AsyncStorage, Platform } from 'react-native';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import AppNavigator from './AppNavigator';
import Reactotron from 'reactotron-react-native'

Amplify.configure(aws_exports);

export default class App extends React.Component {
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }
  render() {
    Reactotron.configure({ host: '192.168.1.92' }).useReactNative().connect()
    return (
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

