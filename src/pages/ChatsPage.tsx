import React, { useCallback, useEffect } from 'react';
import { path } from 'ramda';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  SafeAreaView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Spinner } from 'native-base';

import { IStateUnion } from '@/store/reducers';
import {
  getChatsCountSelector,
  getConversationsSelector,
} from '@/store/selectors/chat.selectors';
import {
  chatsFetch as chatsFetchAction,
  chatsAppendFetch as chatsAppendFetchAction,
  IChatItem, IChatsParams,
} from '@/store/actions/chat.actions';
import { ChatItemContainer } from '@/components/ChatItem';
import { ICommonErrorResponse } from '@/utils/apisauce';

export interface IProps {
  fetching: boolean;
  error: ICommonErrorResponse<IChatsParams> | null;
  chats: ReadonlyArray<IChatItem>;
  chatsCount: number;

  chatsFetch: (params?: Partial<IChatsParams>) => void;
  chatsAppendFetch: (params?: Partial<IChatsParams>) => void;
}

export const ChatsPageComponent = ({
  fetching,
  error,
  chats,
  chatsCount,
  chatsFetch,
  chatsAppendFetch,
  navigation,
}: IProps & NavigationInjectedProps): React.ReactElement => {
  useEffect(() => {
    chatsFetch();
  }, [chatsFetch]);
  const handleLoadMore = useCallback(() => {
    if (!fetching && chats.length < chatsCount) {
      chatsAppendFetch({
        count: 20,
        offset: chats.length,
      });
    }
  }, [fetching, chats, chatsCount, chatsAppendFetch]);

  const handlePress = useCallback((id: number) => () => {
    navigation.push('Chat', { id });
  }, [navigation]);

  const keyExtractor =
    useCallback((chat: IChatItem) => String(path(['conversation', 'peer', 'id'], chat)), []);
  const renderItem = useCallback((info: ListRenderItemInfo<IChatItem>) => (
    <ChatItemContainer
      testID="item"
      chat={info.item}
      onPress={handlePress(info.item.conversation.peer.id)}
    />
  ), [handlePress]);
  const renderFooter = useCallback(() => fetching ? (
    <Spinner color="gray" />
  ) : null, [fetching]);

  return (
    <SafeAreaView>
      {!error
        ? (
          <FlatList
            data={chats}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={fetching}
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
    chatsCount: getChatsCountSelector(state),
  }),
  {
    chatsFetch: chatsFetchAction,
    chatsAppendFetch: chatsAppendFetchAction,
  }
)(withNavigation(ChatsPageComponent));
