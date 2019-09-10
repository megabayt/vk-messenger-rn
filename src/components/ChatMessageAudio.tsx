import * as React from 'react';
import { useCallback } from 'react';
import { Linking } from 'react-native';

import { ChatMessageText } from '@/components/ChatMessageText';

interface IProps {
  title: string;
  url: string;
  me: boolean;
}

export function ChatMessageAudio({
  title,
  url,
  me,
}: IProps) {
  const handlePress = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <ChatMessageText underline me={me} onPress={handlePress}>
      {title}
    </ChatMessageText>
  );
}
