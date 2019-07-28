import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { SafeAreaView, Text } from 'react-native';
import { LoginPageContainer } from '@/pages/LoginPage';

const appNavigator = createSwitchNavigator(
  {
    AuthSwitch: LoginPageContainer,
    MainSwitch: () => (<SafeAreaView><Text>Main Switch</Text></SafeAreaView>),
  },
  {
    initialRouteName: 'AuthSwitch',
    resetOnBlur: true,
  });

export const AppContainer = createAppContainer(
  appNavigator,
);
