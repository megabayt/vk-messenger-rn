import * as React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useEffect } from 'react';
import { IStateUnion } from '@/store/reducers';
import {
  getConversationsSelector,
} from '@/store/selectors/chat.selectors';
import {
  chatsFetch as chatsFetchAction,
  IChatItem,
} from '@/store/actions/chat.actions';
import { ChatItemContainer } from '@/components/ChatItem';

export interface IProps {
  fetching: boolean;
  error: boolean;
  chats: ReadonlyArray<IChatItem>;

  chatsFetch: () => void;
}

export const ChatsPageComponent = ({
  fetching,
  error,
  chats,
  chatsFetch,
}: IProps): React.ReactElement => {
  useEffect(() => {
    chatsFetch();
  }, []);
  if (fetching) {
    return (<Text testID="fetching">Загрузка</Text>);
  }
  if (error) {
    return (<Text testID="error">Ошибка</Text>);
  }
  return (
    <SafeAreaView>
      {chats.map((chat, i) => (
        <ChatItemContainer testID="item" key={i} chat={chat}  />
      ))}
    </SafeAreaView>
  );
};

export const ChatsPageContainer = connect(
  (state: IStateUnion) => ({
    fetching: state.chat.chats.fetching,
    error: state.chat.chats.error,
    chats: getConversationsSelector(state),
  }),
  {
    chatsFetch: chatsFetchAction,
  }
)(withNavigation(ChatsPageComponent));
