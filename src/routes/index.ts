import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { MainTabNavigator } from './MainTabNavigator';
import { LoginPageContainer } from '@/pages/LoginPage';

const appNavigator = createSwitchNavigator(
  {
    Auth: LoginPageContainer,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'Auth',
    resetOnBlur: true,
  });

export const AppContainer = createAppContainer(
  appNavigator,
);
