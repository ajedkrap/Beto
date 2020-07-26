import React, { Component } from 'react';
import {
  Text
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import getStore from './src/redux/store';

import Stack from './src/screens/components/stack'

class App extends Component {

  render() {
    return (
      <Provider store={getStore.store}>
        <NavigationContainer>
          <PersistGate loading={<Text>Loading...</Text>} persistor={getStore.persistor} >
            <Stack />
          </PersistGate>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

