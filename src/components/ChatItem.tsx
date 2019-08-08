import * as React from 'react';
import { path } from 'ramda';
import { Image, Text } from 'react-native';
import { IChatItem, IChatMergedProfiles } from '@/store/actions/chat.actions';

export interface IProps {
  chatItem: IChatItem;
  chatProfiles: IChatMergedProfiles;
}

export const ChatItemComponent: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const activeIds: ReadonlyArray<number> =
    path(['chatItem', 'conversation', 'chat_settings', 'active_ids'], props) || [];
  return (<>
    {activeIds.length
      ? activeIds.map((item) => (
        <Image key={item} source={{ uri: `https://unsplash.it/150/200?random${item}` }} />
      ))
      : (
        <Image source={{ uri: 'https://unsplash.it/150/200?random' }} />
      )}
    <Text testID="fullname">asd</Text>
    <Text testID="date">11.11.2000</Text>
    <Text testID="unread">1</Text>
  </>);
};

