import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { useEffect } from 'react';
import { IStateUnion } from '@/store/reducers';
import {
  getChatProfilesSelector,
  getConversationsSelector,
} from '@/store/selectors/chat.selectors';
import {
  chatsFetch as chatsFetchAction,
  IChatItem,
  IChatMergedProfiles,
} from '@/store/actions/chat.actions';

export interface IProps {
  profiles: IChatMergedProfiles;
  chats: ReadonlyArray<IChatItem>;

  chatsFetch: () => void;
}

export const ChatsPageComponent = ({
  chatsFetch,
}: IProps): React.ReactElement => {
  useEffect(() => {
    chatsFetch();
  }, []);
  return (
    <View />
  );
};

export const ChatsPageContainer = connect(
  (state: IStateUnion) => ({
    profiles: getChatProfilesSelector(state),
    chats: getConversationsSelector(state),
  }),
  {
    chatsFetch: chatsFetchAction,
  }
)(withNavigation(ChatsPageComponent));
