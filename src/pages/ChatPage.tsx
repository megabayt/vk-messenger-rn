import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { path } from 'ramda';
import { ActionsProps, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Text, View } from 'native-base';
import styled from 'styled-components';
import { ScrollView, TouchableOpacity } from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
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
import { ChatMessage } from '@/components/ChatMessage';
import { deviceHeight } from '@/constants/device';

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

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const toggleEmojiSelector =
    useCallback(() => setShowEmojiSelector(v => !v), [setShowEmojiSelector]);

  const [inputText, setInputText] = useState('');

  const handleEmojiSelector = useCallback((emoji) => {
    setInputText(inputText + emoji);
    setShowEmojiSelector(false);
  }, [inputText, setInputText, setShowEmojiSelector]);

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
    <>
      <GiftedChat
        text={inputText}
        onInputTextChanged={setInputText}
        messages={messages}
        onSend={handleSend}
        loadEarlier={messages.length !== messagesCount}
        onLoadEarlier={handleLoadEarlier}
        renderMessageText={ChatMessage}
        renderActions={InputToolbarActions}
        onPressActionButton={toggleEmojiSelector}
        user={user}
      />
      {showEmojiSelector && (
        <EmojiSelectorWrapper>
          <EmojiSelector
            category={Categories.All}
            onEmojiSelected={handleEmojiSelector}
          />
        </EmojiSelectorWrapper>
      )}
    </>
  );
}

const InputToolbarActions = ({ onPressActionButton }: ActionsProps): React.ReactElement => (
  <ActionsWrapper onPress={onPressActionButton} hitSlop={hitSlop}>
    <Text>😊</Text>
  </ActionsWrapper>
);

const hitSlop = { top: 8, right: 8, bottom: 8, left: 8 };

const ActionsWrapper = styled(TouchableOpacity)`
  align-self: center;
`;
const EmojiSelectorWrapper = styled(ScrollView)`
  height: ${deviceHeight / 6};
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
