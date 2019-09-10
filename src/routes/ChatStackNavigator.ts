import { createStackNavigator } from 'react-navigation';

import { ChatsPageContainer } from '@/pages/ChatsPage';
import { ChatPageContainer } from '@/pages/ChatPage';

export const ChatStackNavigator = createStackNavigator(
  {
    Chats: ChatsPageContainer,
    Chat: ChatPageContainer,
  },
  {
    initialRouteName: 'Chats',
    headerMode: 'none',
  });

