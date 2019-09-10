import * as React from 'react';
import { useMemo } from 'react';
import { Thumbnail } from 'native-base';
import styled from 'styled-components';

interface IProps {
  url: string;
}

export function ChatMessageSticker({ url }: IProps) {
  const source = useMemo(() => ({
    uri: url,
  }), [url]);
  return (
    <Sticker source={source} square large />
  );
}

const Sticker = styled(Thumbnail)`
  background: #fff;
`;
