import React, { useMemo } from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import { Badge } from 'native-base';
import { Text, View } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';

import styled from 'styled-components';
import { IChatItem, IChatMergedProfiles, IChatProfile } from '@/store/actions/chat.actions';
import { IStateUnion } from '@/store/reducers';
import { getChatProfilesSelector } from '@/store/selectors/chat.selectors';
import { ITestProps } from '@/utils/tests';
import { dateFormatter, getAttachmentReplacer } from '@/utils/helpers';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { ChatAvatar } from '@/components/ChatAvatar';

export interface IProps extends ITestProps {
  chat: IChatItem;
  profiles: IChatMergedProfiles;
  onPress: () => void;
}

export const ChatItemComponent: React.FC<IProps> = ({
  profiles,
  chat,
  onPress,
}: IProps): React.ReactElement => {
  const avatars = useMemo(() => {
    const activeIds: ReadonlyArray<number> =
      path(['conversation', 'chat_settings', 'active_ids'], chat) || [];
    if (activeIds.length) {
      return activeIds.map(activeId => path([activeId, 'photo_50'], profiles) as string);
    }
    return [];
  }, [chat, profiles]);
  const lastMessage = useMemo(() => {
    return {
      date: dateFormatter(Number(path(['last_message', 'date'], chat))) as string,
      text: (path(['last_message', 'text'], chat)
        || getAttachmentReplacer(chat)) as string,
    };
  }, [chat]);
  const unreadCount = useMemo(() => {
    return (path(['conversation', 'unread_count'], chat) || 0) as number;
  }, [chat]);
  const peerId = useMemo(() => {
    return (path(['conversation', 'peer', 'id'], chat) || -1) as number;
  }, [chat]);
  const profile = useMemo(() => {
    return (path([peerId], profiles) || {}) as IChatProfile;
  }, [peerId, profiles]);
  const fullName = useMemo(() => {
    const name = path(['name'], profile);
    if (name) {
      return name as string;
    }
    const firstName = path(['first_name'], profile);
    const lastName = path(['last_name'], profile);
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    const title = path(['conversation', 'chat_settings', 'title'], chat);
    if (title) {
      return title as string;
    }
    return 'Неизвестно';
  }, [profile, chat]);
  const avatar = useMemo(() => {
    return path(['photo_50'], profile) as string;
  }, [profile]);

  return (
    <Wrapper>
      <Row onPress={onPress}>
        {avatar
          ? (
            <AsideProfileAvatar uri={avatar} />
          ) : (
            <AsideChatAvatar avatars={avatars} />
          )}
        <Col>
          <ListItemText numberOfLines={2}>{fullName}</ListItemText>
          <ListItemSecondaryText numberOfLines={2}>{lastMessage.text}</ListItemSecondaryText>
        </Col>
        <AsideRight>
          {unreadCount ? (
            <Row>
              <Col>
                <AlignerEnd>
                  <Badge>
                    {unreadCount}
                  </Badge>
                </AlignerEnd>
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col>
              <AlignerEnd>
                <Text>{lastMessage.date}</Text>
              </AlignerEnd>
            </Col>
          </Row>
        </AsideRight>
      </Row>
    </Wrapper>
  );
};

export const ChatItemContainer = connect(
  (state: IStateUnion) => ({
    profiles: getChatProfilesSelector(state),
  }),
  {},
)(ChatItemComponent);

const AlignerEnd = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
`;
const Wrapper = styled(Grid)`
  margin-vertical: 10;
`;
const ListItemText = styled(Text)`
  font-size: 16;
  line-height: 16;
`;
const ListItemSecondaryText = styled(Text)`
  font-size: 14;
  line-height: 14;
  margin-top: 4;
`;
const aside = `
  flex: 0;
  flex-shrink: 0;
  flex-basis: 48;
  width: 48;
  margin-horizontal: 10;
`;
const AsideProfileAvatar = styled(ProfileAvatar)`${aside}`;
const AsideChatAvatar = styled(ChatAvatar)`${aside}`;
const AsideRight = styled(Grid)`${aside}`;
