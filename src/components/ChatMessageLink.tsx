import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { Thumbnail } from 'native-base';
import styled from 'styled-components';
import { Linking, TouchableOpacity } from 'react-native';
import { ChatMessageText } from '@/components/ChatMessageText';

interface IProps {
  preview: string;
  url: string;
  me: boolean;
}

export function ChatMessageLink({ preview, url, me }: IProps) {
  const source = useMemo(() => ({
    uri: preview,
  }), [preview]);

  const handlePress = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <Wrapper onPress={handlePress}>
      <LinkPreview source={source} square large />
      <ChatMessageText underline me={me}>{url}</ChatMessageText>
    </Wrapper>
  );
}

const Wrapper = styled(TouchableOpacity)`
  align-items: center;
`;

const LinkPreview = styled(Thumbnail)`
  background: #fff;
  margin-vertical: 5;
`;
