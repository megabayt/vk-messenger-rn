import { createBottomTabNavigator } from 'react-navigation';

import { ChatsPageContainer } from '@/pages/ChatsPage/ChatsPage';
import { ProfilePageContainer } from '@/pages/ProfilePage';

export const MainTabNavigator = createBottomTabNavigator(
  {
    Chats: ChatsPageContainer,
    Profile: ProfilePageContainer,
  },
  {
    initialRouteName: 'Chats',
    resetOnBlur: true,
  });

