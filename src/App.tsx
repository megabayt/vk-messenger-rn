import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View } from 'react-native';

import { store, persistor } from '@/store/index';

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <View />
    </PersistGate>
  </Provider>
);
