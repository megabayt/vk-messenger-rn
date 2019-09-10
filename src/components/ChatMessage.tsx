import React  from 'react';
import { path } from 'ramda';
import { MessageText } from 'react-native-gifted-chat';
import { ChatMessageWall } from '@/components/ChatMessageWall';
import { ChatMessageSticker } from '@/components/ChatMessageSticker';
import { ChatMessageLink } from '@/components/ChatMessageLink';
import { ChatMessageAudio } from '@/components/ChatMessageAudio';
import { ChatMessageText } from '@/components/ChatMessageText';

export function ChatMessage(props: MessageText['props']) {
  const text: string = path(['currentMessage', 'text'], props) || '';
  const splittedText = text.split('|') || [];

  const currentUserId = path(['user', '_id'], props);
  const currentMessageUserId = path(['currentMessage', 'user', '_id'], props);

  const me = currentUserId === currentMessageUserId || currentUserId === undefined;

  switch (true) {
    case text.indexOf('wall|') !== -1:
      return (
        <ChatMessageWall
          me={me}
          text={text}
        />
      );
    case text.indexOf('sticker|') !== -1:
      return (
        <ChatMessageSticker
          url={splittedText[1]}
        />
      );
    case text.indexOf('link|') !== -1:
      return (
        <ChatMessageLink
          me={me}
          preview={splittedText[1]}
          url={splittedText[2]}
        />
      );
    case text.indexOf('audio|') !== -1:
      return (
        <ChatMessageAudio
          me={me}
          title={splittedText[1]}
          url={splittedText[2]}
        />
      );
    default:
      return (
        <ChatMessageText me={me}>
          {text}
        </ChatMessageText>
      );
  }
}

