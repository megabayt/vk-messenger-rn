import * as React from 'react';
import { path } from 'ramda';
import { Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { IChatItem, IChatMergedProfiles } from '@/store/actions/chat.actions';
import { IStateUnion } from '@/store/reducers';
import { getChatProfilesSelector } from '@/store/selectors/chat.selectors';
import { ITestProps } from '@/utils/tests';

export interface IProps extends ITestProps {
  chat: IChatItem;
  profiles: IChatMergedProfiles;
}

export const ChatItemComponent: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const activeIds: ReadonlyArray<number> =
    path(['chatItem', 'conversation', 'chat_settings', 'active_ids'], props) || [];

  const renderAvatar = React.useCallback((item = null, i = 0) => {
    if (!item) {
      return (<Image source={{ uri: 'https://unsplash.it/150/200?random' }} />);
    }
    if (i <= 3) {
      return (<Image key={item} source={{ uri: 'https://unsplash.it/150/200?random' }} />);
    }
  }, []);

  return (<>
    {activeIds.length
      ? activeIds.map(renderAvatar)
      : renderAvatar()}
    <Text testID="fullname">asd</Text>
    <Text testID="date">11.11.2000</Text>
    <Text testID="unread">1</Text>
  </>);
};

export const ChatItemContainer = connect(
  (state: IStateUnion) => ({
    profiles: getChatProfilesSelector(state),
  }),
  {},
)(ChatItemComponent);

ChatItemContainer.displayName = 'ChatItemContainer';
