import { createBottomTabNavigator } from 'react-navigation';

import { ChatStackNavigator } from './ChatStackNavigator';
import { ProfilePageContainer } from '@/pages/ProfilePage';
import { BottomTabBar } from '@/components/BottomTabBar';

export const MainTabNavigator = createBottomTabNavigator(
  {
    Chats: ChatStackNavigator,
    Profile: ProfilePageContainer,
  },
  {
    initialRouteName: 'Chats',
    resetOnBlur: true,
    tabBarComponent: BottomTabBar,
  });

