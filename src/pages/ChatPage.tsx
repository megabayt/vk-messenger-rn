import React, { useCallback, useEffect, useState } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { path } from 'ramda';
import { GiftedChat } from 'react-native-gifted-chat';
import { IStateUnion } from '@/store/reducers';
import {
  chatMessagesFetch as chatMessagesFetchAction, IChatMergedProfiles,
  IChatMessagesParams,
  IChatMessagesResponse,
} from '@/store/actions/chat.actions';
import { ICommonOkResponse } from '@/utils/apisauce';
import { getChatProfilesSelector } from '@/store/selectors/chat.selectors';

interface IProps {
  chatMessagesFetch: (params: Partial<IChatMessagesParams>) => void;
  profiles: IChatMergedProfiles;
  data: ICommonOkResponse<IChatMessagesResponse> | null;
}

export function ChatPageComponent({
  data,
  profiles,
  chatMessagesFetch,
  navigation,
}: IProps & NavigationInjectedProps) {
  const [messages, setMessages] = useState([] as Array<any>);
  const chatId = navigation.getParam('id');

  useEffect(() => {
    chatMessagesFetch({ peer_id: chatId });
  }, [chatId, chatMessagesFetch]);

  useEffect(() => {
    const newData = path(['response', 'items'], data) as IChatMessagesResponse['items'];
    if (newData) {
      setMessages(newData.map((item) => {
        const fromId = item.from_id || -1;
        const profile = profiles[fromId] || {};
        const fullName = (() => {
          const name = path(['name'], profile);
          if (name) {
            return name as string;
          }
          const firstName = path(['first_name'], profile);
          const lastName = path(['last_name'], profile);
          if (firstName && lastName) {
            return `${firstName} ${lastName}`;
          }
          const title = path(['conversation', 'chat_settings', 'title'], item);
          if (title) {
            return title as string;
          }
          return 'Неизвестно';
        })();
        return {
          _id: item.id,
          text: item.text,
          createdAt: item.date,
          user: {
            _id: fromId,
            name: fullName,
            avatar: profile.photo_50,
          },
        };
      }));
    }
  }, [data, profiles]);

  const handleSend = useCallback((messages = []) => {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }, []);

  return (
    <GiftedChat

      messages={messages}
      onSend={handleSend}
      user={{ _id: 1 }}
    />
  );
}

export const ChatPageContainer = connect(
  (state: IStateUnion) => ({
    fetching: state.chat.messages.fetching,
    error: state.chat.messages.error,
    data: state.chat.messages.data,
    profiles: getChatProfilesSelector(state),
  }),
  {
    chatMessagesFetch: chatMessagesFetchAction,
  }
)(withNavigation(ChatPageComponent));
