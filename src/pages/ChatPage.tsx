import React, { useCallback, useEffect, useMemo } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import styled from 'styled-components';
import { Thumbnail, View, Text } from 'native-base';
import { Linking } from 'react-native';
import { IStateUnion } from '@/store/reducers';
import {
  chatMessagesFetch as chatMessagesFetchAction,
  chatMessagesAppendFetch as chatMessagesAppendFetchAction,
  chatSendFetch as chatSendFetchAction,
  IChatMessagesParams, IChatSendParams,
} from '@/store/actions/chat.actions';
import {
  getChatMessagesCountSelector,
  getChatMessagesTransformedSelector,
} from '@/store/selectors/chat.selectors';
import { IMyProfile } from '@/store/actions/profile.actions';
import { getMyProfileSelector } from '@/store/selectors/profile.selectors';
import { ICommonErrorResponse } from '@/utils/apisauce';

interface IProps {
  chatMessagesFetch: (params: Partial<IChatMessagesParams>) => void;
  chatMessagesAppendFetch: (params: Partial<IChatMessagesParams>) => void;
  chatSendFetch: (params: Partial<IChatSendParams>) => void;
  fetching: boolean;
  error: ICommonErrorResponse<IChatMessagesParams> | null;
  messages: Array<IMessage>;
  messagesCount: number;
  myProfile: IMyProfile | null;
}

export function ChatPageComponent({
  fetching,
  messagesCount,
  myProfile,
  messages,
  chatMessagesFetch,
  chatMessagesAppendFetch,
  chatSendFetch,
  navigation,
}: IProps & NavigationInjectedProps) {
  const chatId = navigation.getParam('id');

  useEffect(() => {
    chatMessagesFetch({ peer_id: chatId });
  }, [chatId, chatMessagesFetch]);

  const handleLoadEarlier = useCallback(() => {
    if (!fetching && messages.length < messagesCount) {
      chatMessagesAppendFetch({
        peer_id: chatId,
        count: 20,
        offset: messages.length,
      });
    }
  }, [
    chatId,
    fetching,
    messages,
    messagesCount,
    chatMessagesAppendFetch,
  ]);

  const handleSend = useCallback(async (messages = []) => {
    const [message] = messages;
    chatSendFetch({
      peer_id: chatId,
      random_id: Math.random(),
      message: message.text,
    });
  }, [
    chatId,
    chatSendFetch,
  ]);

  const user = useMemo(() => ({
    _id: myProfile ? myProfile.id : '',
    name: myProfile ? myProfile.first_name : '',
    avatar: myProfile ? myProfile.photo_50 : '',
  }), [myProfile]);

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      loadEarlier={messages.length !== messagesCount}
      onLoadEarlier={handleLoadEarlier}
      parsePatterns={parsePatterns}
      user={user}
    />
  );
}

const parsePatterns = () => [
  {
    pattern: /wall\|.*/,
    renderText: (text: string): React.ReactElement => <StyledWallLink text={text} />,
  },
  {
    pattern: /link\|.*/,
    renderText: (text: string) => <ExternalLink text={text} />,
  },
  // {
  //   pattern: /sticker\|.*/,
  //   renderText: () => <Text>Запись со стены</Text>,
  //   // onPress: (text) => navigation.push('Wall', { text }),
  // },
];

const WallLink = withNavigation(({
  navigation,
  text,
  ...props
}: NavigationInjectedProps & { text: string }) => {
  const handlePress = useCallback(() => {
    const [
      ,
      ownerId = null,
      wallId = null,
    ] = /https:\/\/vk.com\/wall-(\d+)_(\d+)/g.exec(text) || [];
    navigation.push('Wall', { ownerId, wallId });
  }, [navigation, text]);
  return <Text {...props} onPress={handlePress}>Запись со стены</Text>;
});

const StyledWallLink = styled(WallLink)`
  color: #017afb;
`;

const ExternalLink = ({ text, ...props }: { text: string }) => {
  const [, preview, url] = text.split('|');

  const source = useMemo(() => ({ uri: preview }), [preview]);

  const handlePress = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <>
      <Thumbnail square large source={source} />
      <StyledExternalLinkText
        onPress={handlePress}
      >
        {url}
      </StyledExternalLinkText>
    </>
  );
};

const StyledExternalLinkText = styled(Text)`
  color: #017afb;
`;

export const ChatPageContainer = connect(
  (state: IStateUnion) => ({
    fetching: state.chat.messages.fetching,
    error: state.chat.messages.error,
    messages: getChatMessagesTransformedSelector(state),
    messagesCount: getChatMessagesCountSelector(state),
    myProfile: getMyProfileSelector(state),
  }),
  {
    chatMessagesFetch: chatMessagesFetchAction,
    chatMessagesAppendFetch: chatMessagesAppendFetchAction,
    chatSendFetch: chatSendFetchAction,
  }
)(withNavigation(ChatPageComponent));
