import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AsyncStorage, Platform } from 'react-native';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import AppNavigator from './AppNavigator';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
  }
};

setCustomText(customTextProps);
setCustomTextInput(customTextProps);

Amplify.configure(aws_exports);

export default class App extends React.Component {
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }
  render() {
    this.clearAsyncStorage()
    return (
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

