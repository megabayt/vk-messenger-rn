import styled from 'styled-components';
import * as React from 'react';
import { NativeBase, Text, View } from 'native-base';

interface IProps extends NativeBase.Text {
  children: string;
  me?: boolean;
  underline?: boolean;
}

export function ChatMessageText({
  me,
  children,
  underline,
  ...props
}: IProps) {
  return (
    <Wrapper>
      <Message me={Boolean(me)} {...props}>{children}</Message>
      {underline && <Line me={Boolean(me)} />}
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  padding-horizontal: 10;
  padding-vertical: 10;
`;
const Message = styled(Text)`
  color: ${({ me }: { me: boolean }) => me ? '#fff' : '#000'};
`;
const Line = styled(View)`
  width: 100%;
  height: 1;
  margin-top: -2;
  background-color: ${({ me }: { me: boolean }) => me ? '#fff' : '#000'};
`;
