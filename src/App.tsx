import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store/index';
import { AppContainer } from '@/routes';

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);
