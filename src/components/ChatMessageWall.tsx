import * as React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useCallback } from 'react';
import { ChatMessageText } from '@/components/ChatMessageText';

interface IProps {
  text: string;
  me: boolean;
}

export const ChatMessageWall = withNavigation(({
  navigation,
  text,
  me,
}: NavigationInjectedProps & IProps) => {
  const handlePress = useCallback(() => {
    const [
      ,
      ownerId = null,
      wallId = null,
    ] = /https:\/\/vk.com\/wall-(\d+)_(\d+)/g.exec(text) || [];
    navigation.push('Wall', { ownerId, wallId });
  }, [navigation, text]);
  return (
    <ChatMessageText
      onPress={handlePress}
      me={me}
      underline
    >
      Запись со стены
    </ChatMessageText>
  );
});
