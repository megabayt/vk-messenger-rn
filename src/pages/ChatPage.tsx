import React, { useCallback, useEffect, useMemo } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
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
import { IMyProfileResponse } from '@/store/actions/profile.actions';
import { ICommonErrorResponse } from '@/utils/apisauce';

interface IProps {
  chatMessagesFetch: (params: Partial<IChatMessagesParams>) => void;
  chatMessagesAppendFetch: (params: Partial<IChatMessagesParams>) => void;
  chatSendFetch: (params: Partial<IChatSendParams>) => void;
  fetching: boolean;
  error: ICommonErrorResponse<IChatMessagesParams> | null;
  messages: Array<IMessage>;
  messagesCount: number;
  myProfile: IMyProfileResponse | null;
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
      user={user}
    />
  );
}

export const ChatPageContainer = connect(
  (state: IStateUnion) => ({
    fetching: state.chat.messages.fetching,
    error: state.chat.messages.error,
    messages: getChatMessagesTransformedSelector(state),
    messagesCount: getChatMessagesCountSelector(state),
    myProfile: state.profile.myProfile.data
      && state.profile.myProfile.data.response,
  }),
  {
    chatMessagesFetch: chatMessagesFetchAction,
    chatMessagesAppendFetch: chatMessagesAppendFetchAction,
    chatSendFetch: chatSendFetchAction,
  }
)(withNavigation(ChatPageComponent));
