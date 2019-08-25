import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  SafeAreaView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { ProgressBar } from 'material-bread';

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
  }, [chatsFetch]);
  const keyExtractor = useCallback((chat: IChatItem) => String(chat.conversation.peer.id), []);
  const renderItem = useCallback((info: ListRenderItemInfo<IChatItem>) => (
    <ChatItemContainer
      testID="item"
      chat={info.item}
    />
  ), []);

  return (
    <SafeAreaView>
      <ProgressBar
        testID="fetching"
        visible={fetching}
      />
      {!error
        ? (
          <FlatList
            data={chats}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={chatsFetch}
              />
            }
          />
        )
        : (
          <Text testID="error">An error has occurred</Text>
        )}
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
