import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View } from 'react-native';

import { store, persistor } from '@/store';

export const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <View />
    </PersistGate>
  </Provider>
);
